`/**`  
 `* 📊 DATABASE & CRM SCHEMA DEFINITIONS (v2.0 - FINAL)`  
 `* Optimized for: Gemini 3 Pro + TypeScript 6.0`  
 `* Scope: Multi-tier Data Persistence (Baserow, Attio, Redis, Stripe)`  
 `*/`

`// ==========================================`  
`// 1. CORE ENUMS (READONLY)`  
`// ==========================================`

`export const RiskLevel = {`  
  `CRITICAL: 'CRITICAL', // Immediate Litigation Risk`  
  `HIGH: 'HIGH',`  
  `MODERATE: 'MODERATE',`  
  `LOW: 'LOW',`  
  `SHIELDED: 'SHIELDED' // Compliance Active`  
`} as const;`

`export type RiskLevel = typeof RiskLevel[keyof typeof RiskLevel];`

`export type AuditStatus =`   
  `| 'QUEUED'`   
  `| 'SCANNING'`   
  `| 'COMPLETED'`   
  `| 'FAILED_TIMEOUT'`   
  `| 'FAILED_WAF'`  
  `| 'ABORTED_GEOBLOCK';`

`// ==========================================`  
`// 2. THE FORENSIC AUDIT (PUBLIC VS PRIVATE)`  
`// ==========================================`

`/** * Data safe to send to the client-side UI`   
 `*/`  
`export interface PublicAuditReport {`  
  `readonly audit_id: string;`  
  `readonly domain: string;`  
  `readonly risk_score: number; // 0.0 - 10.0`  
  `readonly summary: {`  
    `total_violations: number;`  
    `top_threat: string; // e.g., "Keyboard Trap in Checkout"`  
    `irs_credit_value: 148.50 | 0; // Fixed based on price`  
  `};`  
  `readonly metrics: {`  
    `missing_alts: number;`  
    `deceptive_alts: number; // e.g., alt="image.jpg"`  
    `shadow_dom_violations: number; // Dec 2025 Special`  
    `landmark_errors: number;`  
    `form_label_missing: number;`  
  `};`  
  `readonly timestamp: string;`  
`}`

`/** * Internal data stored in Attio/Baserow for Julian`   
 `*/`  
`export interface InternalAuditRecord extends PublicAuditReport {`  
  `readonly lead_id: string;`  
  `readonly tech_stack: {`  
    `cms: 'WordPress' | 'Shopify' | 'Wix' | 'Custom';`  
    `version?: string;`  
    `detected_widgets: string[]; // e.g., ["UserWay", "AccessiBe"]`  
  `};`  
  `readonly liability_forecast: {`  
    `estimated_settlement_range: [number, number]; // [min, max]`  
    `precedent_cases: string[]; // Links to similar industry lawsuits`  
  `};`  
  `readonly operational: {`  
    `proxy_ip: string;`  
    `execution_time_ms: number;`  
    `worker_node: string;`  
  `};`  
`}`

`// ==========================================`  
`// 3. BASEROW SCHEMA (COLD LEAD REPOSITORY)`  
`// ==========================================`

`export interface BaserowLeadRow {`  
  `readonly id: number; // Primary Key`  
  `readonly domain: string;`  
  `readonly business_name: string;`  
  `readonly category: string; // e.g., "Dental", "E-commerce"`  
  `readonly contact_info: {`  
    `email?: string;`  
    `form_url?: string;`  
    `owner_name?: string;`  
  `};`  
  `readonly gsa_status: 'UNSENT' | 'SENT' | 'BOUNCED';`  
  `readonly last_audit_score?: number;`  
`}`

`// ==========================================`  
`// 4. ATTIO SCHEMA (CRM OBJECT MAPPING)`  
`// ==========================================`

`/** * Custom Object: "Compliance_Shield"`  
 `* Linked to "Company" in Attio`  
 `*/`  
`export interface AttioShieldObject {`  
  `readonly status: 'ACTIVE' | 'EXPIRED' | 'PENDING_INSTALL';`  
  `readonly installation_date?: string;`  
  `readonly shield_version: string; // Current snippet version`  
  `readonly monthly_scans_remaining: number;`  
  `readonly compliance_log_url: string; // Link to the "Proof of Good Faith" log`  
`}`

`// ==========================================`  
`// 5. STRIPE & BILLING LOGIC`  
`// ==========================================`

`export interface StripeProductMetadata {`  
  `readonly product_sku: 'SHIELD_PILOT_297' | 'MANUAL_REMED_FIX';`  
  `readonly audit_ref: string; // Links payment to specific ForensicAuditData`  
  `readonly tax_credit_form_required: boolean;`  
`}`

`// ==========================================`  
`// 6. API CONTRACT TYPES (ZOD SHAPE)`  
`// ==========================================`

`export interface ScanRequestPayload {`  
  `readonly domain: string;`  
  `readonly session_token: string;`  
  `readonly fingerprint: string;`  
`}`

`export type ScanResponse =`   
  `| { success: true; data: PublicAuditReport }`  
  `| { success: false; error: string; code: number };`

`// ==========================================`  
`// 7. THE "GOOD FAITH" COMPLIANCE LOG`  
`// ==========================================`

`/**`  
 `* This is the legal document generated for the client.`  
 `*/`  
`export interface ComplianceLogEntry {`  
  `readonly timestamp: string;`  
  `readonly event_type: 'SCAN' | 'REMEDIATION' | 'SHIELD_UPDATE';`  
  `readonly description: string;`  
  `readonly before_score: number;`  
  `readonly after_score: number;`  
  `readonly forensic_hash: string; // SHA-256 of the audit data for court proof`  
`}`  
