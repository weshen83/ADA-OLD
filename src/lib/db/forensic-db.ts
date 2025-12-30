import { PublicAuditReport } from "@/types/audit";

// This object acts as a redundant fallback if the Math Engine fails
// or if we need specific hardcoded overrides for demos.
export const FORENSIC_DATABASE: Record<string, PublicAuditReport> = {
    "example.com": {
        audit_id: "DEMO-001",
        domain: "example.com",
        risk_score: 8.8,
        summary: {
            total_violations: 24,
            top_threat: "Critical Main Thread Blockage",
            irs_credit_value: 148.50,
        },
        metrics: {
            missing_alts: 10,
            deceptive_alts: 4,
            shadow_dom_violations: 2,
            landmark_errors: 5,
            form_label_missing: 3
        },
        timestamp: "2025-01-01T00:00:00Z"
    }
};
