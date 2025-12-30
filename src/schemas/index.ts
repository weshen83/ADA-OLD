import { z } from 'zod';

// ===========================================
// DOMAIN VALIDATION
// ===========================================

/**
 * Validates a domain input string.
 * Strips common prefixes and validates format.
 */
export const domainSchema = z
    .string()
    .min(1, 'Domain is required')
    .max(253, 'Domain is too long')
    .transform((val) => {
        // Strip common prefixes
        let cleaned = val.trim().toLowerCase();
        cleaned = cleaned.replace(/^https?:\/\//, '');
        cleaned = cleaned.replace(/^www\./, '');
        cleaned = cleaned.split('/')[0]; // Remove path
        cleaned = cleaned.split('?')[0]; // Remove query
        cleaned = cleaned.split('#')[0]; // Remove hash
        return cleaned;
    })
    .refine(
        (val) => /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(val),
        { message: 'Invalid domain format' }
    )
    .refine(
        (val) => !['localhost', '127.0.0.1', '0.0.0.0'].includes(val.split(':')[0]),
        { message: 'Reserved domains not allowed' }
    )
    .refine(
        (val) => !['.gov', '.edu', '.mil'].some((ext) => val.endsWith(ext)),
        { message: 'Government and educational domains are excluded' }
    );

// ===========================================
// SCAN REQUEST
// ===========================================

export const scanRequestSchema = z.object({
    domain: domainSchema,
    sessionToken: z.string().optional(),
    fingerprint: z.string().optional(),
});

export type ScanRequest = z.infer<typeof scanRequestSchema>;

// ===========================================
// AUDIT REPORT
// ===========================================

export const riskLevelSchema = z.enum(['CRITICAL', 'HIGH', 'MODERATE', 'LOW', 'SHIELDED']);

export const auditMetricsSchema = z.object({
    missing_alts: z.number().int().min(0),
    deceptive_alts: z.number().int().min(0),
    shadow_dom_violations: z.number().int().min(0),
    landmark_errors: z.number().int().min(0),
    form_label_missing: z.number().int().min(0),
});

export const auditSummarySchema = z.object({
    total_violations: z.number().int().min(0),
    top_threat: z.string(),
    irs_credit_value: z.number(),
});

export const publicAuditReportSchema = z.object({
    audit_id: z.string(),
    domain: z.string(),
    risk_score: z.number().min(0).max(10),
    summary: auditSummarySchema,
    metrics: auditMetricsSchema,
    timestamp: z.string().datetime(),
});

export type PublicAuditReport = z.infer<typeof publicAuditReportSchema>;

// ===========================================
// CONTACT FORM
// ===========================================

export const contactFormSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email address'),
    domain: domainSchema.optional(),
    message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// ===========================================
// CHECKOUT / PAYMENT
// ===========================================

export const checkoutSessionSchema = z.object({
    auditId: z.string(),
    productSku: z.enum(['SHIELD_PILOT_297', 'MANUAL_REMED_FIX']),
    email: z.string().email(),
    successUrl: z.string().url(),
    cancelUrl: z.string().url(),
});

export type CheckoutSession = z.infer<typeof checkoutSessionSchema>;

// ===========================================
// STRIPE WEBHOOK
// ===========================================

export const stripeWebhookPayloadSchema = z.object({
    type: z.string(),
    data: z.object({
        object: z.object({
            id: z.string(),
            customer_email: z.string().email().optional(),
            metadata: z.record(z.string()).optional(),
        }),
    }),
});

export type StripeWebhookPayload = z.infer<typeof stripeWebhookPayloadSchema>;
