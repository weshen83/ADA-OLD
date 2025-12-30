import { NextRequest, NextResponse } from 'next/server';
import { scanRequestSchema } from '@/schemas';
import { generateDeterministicReport } from '@/lib/forensic-math';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the request
        const result = scanRequestSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid request',
                    details: result.error.flatten().fieldErrors,
                    code: 4001,
                },
                { status: 400 }
            );
        }

        const { domain } = result.data;

        // In production, this would:
        // 1. Queue the scan with n8n webhook
        // 2. Check Baserow cache for existing scan
        // 3. Trigger Playwright sniffer if not cached

        // For now, use deterministic fallback
        const report = generateDeterministicReport(domain);

        return NextResponse.json({
            success: true,
            data: report,
        });

    } catch (error) {
        console.error('Scan API Error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error',
                code: 5001,
            },
            { status: 500 }
        );
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({
        status: 'operational',
        service: 'forensic-scan',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
}
