# **📊 DATABASE & CRM SCHEMA DEFINITION (v1.0)**

This document defines the "Data Backbone" of the ADA Legal Shield. It ensures that every forensic data point collected during the 48-hour blitz is actionable, reportable, and ready for high-ticket upselling.

## 

## **1\. THE TWO-TIER DATABASE STRATEGY**

1. **Baserow (The "Cold" Ocean):** Stores 50,000+ scraped/filtered leads. Minimalist and high-performance.  
2. **Attio (The "Warm" CRM):** Stores only leads who have interacted (Opt-in/Scan/Purchase). Rich, relational, and automation-heavy.

## 

## **2\. BASEROW SCHEMA: COLD LEAD REPOSITORY**

**Table Name:** Lead\_Inventory\_v1

| Field Name | Type | Purpose |
| :---- | :---- | :---- |
| domain\_url | URL (Primary) | The unique identifier for the lead. |
| business\_name | Text | Captured from DataforSEO/Maps. |
| industry\_category | Single Select | Used for industry-specific spintax in GSA. |
| lead\_source | Text | e.g., "GSA\_Maps\_Blitz\_01". |
| sniffer\_status | Single Select | Unprocessed, Compliant, At-Risk, Inaccessible. |
| missing\_alt\_count | Number | Preliminary count from the Sniffer script. |
| contact\_form\_url | URL | Targeted URL for the GSA Bot. |
| last\_contacted\_at | DateTime | Timestamp of GSA form submission. |

## **3\. ATTIO SCHEMA: WARM CRM ARCHITECTURE**

Attio utilizes **Objects** and **Attributes**. We will extend the standard Person and Company objects and create a custom Forensic\_Audit object.

### **A. The "Forensic Audit" Custom Object**

*Why: Allows us to track multiple audits per company over time (Growth Strategy).*

| Attribute Name | Type | Purpose |
| :---- | :---- | :---- |
| Audit\_Status | Status | In\_Progress, Failed, High\_Risk, Shielded. |
| Risk\_Score | Number (0.0-10.0) | The primary needle for the UI Gauge. |
| Missing\_Alt\_Tags | Number | Specific violation count. |
| Aria\_Violation\_Flag | Boolean | True/False for structural logic errors. |
| Statutory\_Liability | Currency | Estimated risk (Calculated: Missing\_Alts \* $250). |
| IRS\_Eligible | Boolean | Based on revenue/employee count data. |

### **B. The "Deal" Pipeline (The "Blitz" Board)**

| Stage Name | Logic / Trigger |
| :---- | :---- |
| **1\. Diagnostic Run** | Lead ran the scan but did not purchase. |
| **2\. Safe-Harbor Opt-in** | Lead downloaded the PDF kit (Path A). |
| **3\. Shield Active** | **Closed-Won.** AI Shield purchased ($297). |
| **4\. Manual Scope** | Technical call scheduled ($279/page upsell). |
| **5\. Fully Remediated** | Manual fix completed and certified. |

## **4\. THE DATA FLOW (n8n LOGIC)**

1. **Ingest:** When a user enters a domain on the site, n8n queries **Baserow**.  
2. **Upsert:** If the user opts in, n8n creates/updates a Person and Company in **Attio**.  
3. **Link:** n8n creates a Forensic\_Audit object and links it to the Company.  
4. **Enrich:** If **RB2B** identifies the visitor, n8n updates the Person record with their LinkedIn profile URL.

## **5\. RED-TEAM DATA & PRIVACY AUDIT**

**1\. Data Minimization:** \* **Red-Team Rule:** Do not store full HTML snapshots in the CRM. Only store the *counts* of violations. Storing raw code increases storage costs and creates unnecessary liability.  
**2\. PII Protection:**

* **Red-Team Rule:** Scraped email addresses from GSA must remain in Baserow. Only "First-Party" emails (provided by the user in a form) move to Attio to maintain high deliverability and compliance.

**3\. "Dead Lead" Purge:**

* **Red-Team Rule:** Any lead in Baserow that has not responded after 3 Blitz cycles (6 weeks) should be auto-deleted to keep the database lean.

## **6\. MIGRATION READINESS (FUTURE-PROOFING)**

To ensure we can move to **Salesforce** or **HubSpot** in Phase 2:

* Every record in Attio **must** carry the Baserow\_ID as an external reference.  
* All Forensic\_Audit data must be stored in standardized JSON-ready attributes, not text notes.