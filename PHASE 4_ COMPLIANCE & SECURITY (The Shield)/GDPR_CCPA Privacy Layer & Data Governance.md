# **🛡️ GDPR/CCPA PRIVACY LAYER & DATA GOVERNANCE (v2.0 \- FINAL)**

**Strategy:** "US-Fortress" Isolation \+ California (CPRA) Compliance **Objective:** Maximize tracking for US leads while eliminating international liability.

## 

## **1\. THE "US-FORTRESS" GEO-STRATEGY**

*Since IRS Section 44 is US-only, international traffic is liability without revenue.*

### **A. The Edge Block (Middleware)**

We do not show a cookie banner to Europeans. We show them a 403 Forbidden.

* **Technology:** Vercel Middleware \+ Vercel GeoIP.  
* **Logic:**  
  `// middleware.ts`  
  `import { next } from '@vercel/edge';`

  `export default function middleware(req: Request) {`  
    `const country = req.geo?.country || 'US';`  
    `const blockedRegions = ['EU', 'EEA', 'GB']; // Generalize for list of ISO codes`

    `if (blockedRegions.includes(country)) {`  
      `return new Response('Access Restricted: Regional Compliance Protocol Active.', { status: 403 });`  
    `}`  
  `}`

* **Benefit:** Reduces GDPR liability by \~99%.

## **2\. CCPA/CPRA COMPLIANCE (CALIFORNIA DEFENSE)**

*For US traffic, California is the strict standard. If we satisfy CA, we satisfy the rest of the US.*

### **A. The "Do Not Sell/Share My Personal Information" Link**

* **Requirement:** Must be visible on the footer.  
* **Action:** When clicked, it opens a "Privacy Preferences" modal.  
* **The "Global Privacy Control" (GPC):** Our site must listen for the browser's Sec-GPC signal. If detected, we automatically disable the Meta Pixel.

### **B. The "Forensic" Consent Banner**

* **Design:** Not a generic "We use cookies." It looks like a **Security Protocol Acceptance**.  
* **Copy:** *"PROTOCOL ALERT: This forensic interface uses secure telemetry to analyze domain liability. Confirm protocol acceptance to proceed."*  
* **Buttons:** \[ ACCEPT TELEMETRY \] / \[ ESSENTIALS ONLY \]

## **3\. DATA PURGING & RETENTION (THE "BURNER" PROTOCOL)**

*We hold sensitive scraped data. We must have a "Kill Policy" to prevent a data leak from becoming a disaster.*

### **A. The "Cold Data" Airlock (Baserow)**

* **Retention Policy:** 30 Days.  
* **Automation:** An n8n workflow runs every Sunday at 00:00 UTC.  
  * *Action:* DELETE FROM Lead\_Inventory WHERE status \= 'UNCONTACTED' AND created\_at \< NOW() \- INTERVAL '30 DAYS'.  
  * *Why:* If we haven't contacted them in a month, the data is stale and liability-heavy.

### **B. The "Right to be Forgotten" (DSAR Automation)**

* **Input:** A simple form at /privacy/request-deletion.  
* **Workflow:**  
  1. User submits email.  
  2. n8n searches **Attio**, **Baserow**, and **Stripe**.  
  3. n8n purges the record or anonymizes PII (replaces name with REDACTED).  
  4. n8n sends a confirmation email: *"Your digital footprint has been sanitized from our logs."*

## **4\. COOKIE & TRACKING ARCHITECTURE**

### **A. The "Zero-Cookie" Load**

* **Rule:** No pixels (Meta/Google) fire on initial page load.  
* **Trigger:** Pixels only fire **AFTER** the user clicks "Accept Telemetry" OR interacts with the "Scan" input.  
* **Logic:** Use Google Tag Manager (GTM) with "Consent Mode v2" configured.

### **B. The "Forensic" Analytics**

We use **PostHog** (Self-Hosted on VPS or EU Cloud) instead of Google Analytics.

* **Why:** Better "Session Replay" to see exactly where users drop off in the audit flow.  
* **Privacy:** Configured to mask input fields (so we don't record them typing their credit card or personal email).

## **5\. RED-TEAM PRIVACY AUDIT**

**1\. The "Re-Identification" Risk:**

* *Risk:* RB2B identifies a visitor without consent.  
* *Defense:* We only use RB2B data for **B2B Context**. We do not sync personal Gmails, only corporate emails. Our Privacy Policy explicitly states: *"We utilize professional identity resolution for B2B security verification."*

**2\. The "Form Scraping" Defense:**

* *Risk:* Users accuse us of "hacking" their site to get their email for the initial outreach.  
* *Defense:* Our "Source of Truth" log. In Baserow, we store the public\_source\_url (where we found the email). If challenged, we show: *"We found this email publicly listed on your Contact Page. We are compliant with CAN-SPAM B2B exemption."*

## **6\. VIBE CODING PROMPT INSTRUCTION**

"Gemini, create the PrivacyConsentBanner component using a 'Fixed Bottom' layout. Use the 'Institutional' design tokens (Glassmorphism). Implement a useEffect that checks for navigator.globalPrivacyControl. If true, auto-select 'Essentials Only' and hide the banner. Ensure the 'Do Not Sell' link in the footer triggers the openPrivacyModal state in Zustand."