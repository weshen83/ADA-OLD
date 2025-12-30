import { PublicAuditReport } from "@/types/audit";

export const generateDeterministicReport = (domain: string): PublicAuditReport => {
    // 1. Normalize Domain for Hashing (Strip https, www, path)
    const cleanDomain = domain
        .toLowerCase()
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
        .split('/')[0];

    // 2. Generate Seed from Char Codes
    const seed = cleanDomain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // 3. Stable Math for "Random" Values
    // Risk Score: Always high (7.2 to 9.8)
    const riskRaw = (seed % 26) / 10 + 7.2;

    // Violation Count: Always significant (12 to 42)
    const violations = (seed % 30) + 12;

    return {
        audit_id: `SIM-${seed}`,
        domain: cleanDomain,
        risk_score: Number(riskRaw.toFixed(1)),
        summary: {
            total_violations: violations,
            top_threat: getDeterministicThreat(seed),
            irs_credit_value: 148.50,
        },
        metrics: {
            missing_alts: Math.floor(violations * 0.4),
            deceptive_alts: Math.floor(violations * 0.2),
            shadow_dom_violations: Math.floor(violations * 0.15),
            landmark_errors: Math.floor(violations * 0.15),
            form_label_missing: Math.floor(violations * 0.1),
        },
        timestamp: new Date().toISOString(),
    };
};

const getDeterministicThreat = (seed: number): string => {
    const threats = [
        "Keyboard Trap in Checkout Flow",
        "Missing ARIA Labels on Payment Forms",
        "Focus Order Trapped in Modal",
        "Non-Compliant Color Contrast (Header)",
        "Unlabelled Form Inputs (Contact)",
        "Missing Alt Text on Main Hero",
        "Screen Reader Dead Zone (Navigation)"
    ];
    return threats[seed % threats.length];
};
