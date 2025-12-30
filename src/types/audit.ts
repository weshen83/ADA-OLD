export const RiskLevel = {
    CRITICAL: 'CRITICAL', // Immediate Litigation Risk
    HIGH: 'HIGH',
    MODERATE: 'MODERATE',
    LOW: 'LOW',
    SHIELDED: 'SHIELDED' // Compliance Active
} as const;

export type RiskLevel = typeof RiskLevel[keyof typeof RiskLevel];

export type AuditStatus =
    | 'QUEUED'
    | 'SCANNING'
    | 'COMPLETED'
    | 'FAILED_TIMEOUT'
    | 'FAILED_WAF'
    | 'ABORTED_GEOBLOCK';

export interface PublicAuditReport {
    readonly audit_id: string;
    readonly domain: string;
    readonly risk_score: number; // 0.0 - 10.0
    readonly summary: {
        total_violations: number;
        top_threat: string; // e.g., "Keyboard Trap in Checkout"
        irs_credit_value: number; // 148.50 | 0
    };
    readonly metrics: {
        missing_alts: number;
        deceptive_alts: number; // e.g., alt="image.jpg"
        shadow_dom_violations: number;
        landmark_errors: number;
        form_label_missing: number;
    };
    readonly timestamp: string;
}
