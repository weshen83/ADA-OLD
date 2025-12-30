import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of blocked country codes (non-US)
// In production, expand this to all non-US codes
const BLOCKED_REGIONS = [
    // European countries
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'IS', 'LI',
    'NO', 'CH',
    // Other regions with strict privacy laws
    'CA', // Canada (PIPEDA) - Optional: remove if targeting North America
];

// Rate limit settings
const RATE_LIMIT = {
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    maxRequests: 3, // 3 audits per IP per day for anonymous users
};

// In-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    // Skip middleware for static assets and API routes we don't want to protect
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Get geo information from Vercel
    const country = request.geo?.country || 'US';
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    // ===========================================
    // GEO-FENCE: Block non-US traffic
    // ===========================================
    if (BLOCKED_REGIONS.includes(country)) {
        return new NextResponse(
            JSON.stringify({
                error: 'Access Restricted',
                message: 'Regional Compliance Protocol Active. This service is only available in the United States.',
                code: 'GEO_BLOCKED',
            }),
            {
                status: 403,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Geo-Block-Reason': 'GDPR_COMPLIANCE',
                },
            }
        );
    }

    // ===========================================
    // RATE LIMITING for audit endpoints
    // ===========================================
    if (pathname.startsWith('/api/scan') || pathname.startsWith('/audit/')) {
        const now = Date.now();
        const record = rateLimitStore.get(ip);

        if (record) {
            if (now > record.resetTime) {
                // Reset the counter
                rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
            } else if (record.count >= RATE_LIMIT.maxRequests) {
                // Rate limit exceeded
                const retryAfter = Math.ceil((record.resetTime - now) / 1000);
                return new NextResponse(
                    JSON.stringify({
                        error: 'Rate Limit Exceeded',
                        message: 'You have exceeded the maximum number of audits. Please try again later.',
                        code: 'RATE_LIMITED',
                        retryAfter,
                    }),
                    {
                        status: 429,
                        headers: {
                            'Content-Type': 'application/json',
                            'Retry-After': String(retryAfter),
                            'X-RateLimit-Limit': String(RATE_LIMIT.maxRequests),
                            'X-RateLimit-Remaining': '0',
                            'X-RateLimit-Reset': String(record.resetTime),
                        },
                    }
                );
            } else {
                // Increment counter
                rateLimitStore.set(ip, { count: record.count + 1, resetTime: record.resetTime });
            }
        } else {
            // First request from this IP
            rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
        }
    }

    // ===========================================
    // MAINTENANCE MODE
    // ===========================================
    if (process.env.MAINTENANCE_MODE === 'true') {
        // Allow access to admin routes
        if (!pathname.startsWith('/admin')) {
            return new NextResponse(
                `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>System Calibration | ADA Shield</title>
                    <style>
                        body { 
                            font-family: system-ui, sans-serif; 
                            background: #050505; 
                            color: white; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            min-height: 100vh; 
                            margin: 0;
                            text-align: center;
                        }
                        h1 { font-size: 24px; margin-bottom: 8px; }
                        p { color: #888; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div>
                        <h1>System Calibration in Progress</h1>
                        <p>The forensic engine is undergoing scheduled maintenance. Please return in 15 minutes.</p>
                    </div>
                </body>
                </html>
                `,
                {
                    status: 503,
                    headers: {
                        'Content-Type': 'text/html',
                        'Retry-After': '900',
                    },
                }
            );
        }
    }

    // ===========================================
    // SECURITY HEADERS
    // ===========================================
    const response = NextResponse.next();

    // Strict Content Security Policy
    response.headers.set(
        'Content-Security-Policy',
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https:",
            "connect-src 'self' https://api.stripe.com https://*.vercel.app",
            "frame-src https://js.stripe.com",
        ].join('; ')
    );

    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
