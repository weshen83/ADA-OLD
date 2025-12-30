# **⚡ n8n AUTOMATION LOGIC BLUEPRINTS (v1.0)**

This document provides the logic maps for the four "Nervous Systems" of the ADA Legal Shield. These workflows must be built as separate, modular flows to ensure scalability and ease of debugging.

## 

## **1\. WORKFLOW ALPHA: THE INGEST & AUDIT ENGINE**

**Trigger:** Next.js Form Submission (Domain Input).

| Step | Node Type | Logic / Action |
| :---- | :---- | :---- |
| **01** | Webhook | Receives domain\_url and session\_id from Next.js frontend. |
| **02** | Baserow | Search: Does this domain exist? If yes, fetch missing\_alt\_count. |
| **03** | Conditional | If NOT in Baserow: Trigger "Real-Time Sniffer" Node.js script. |
| **04** | Attio | Upsert Company and Forensic\_Audit objects. |
| **05** | Response | Return JSON to Next.js: risk\_score, violation\_data, and attio\_id. |

* **Logic:** The frontend "Scan" bar is just a visual representation of this API response.

## **2\. WORKFLOW BETA: THE CONVERSION & FULFILLMENT PIPE**

**Trigger:** Stripe Webhook (checkout.session.completed).

| Step | Node Type | Logic / Action |
| :---- | :---- | :---- |
| **01** | Webhook | Receives Stripe payload. **Verify Webhook Secret.** |
| **02** | Attio | Fetch Company via email or client\_reference\_id. |
| **03** | PDF Gen | Generate "2025 Statement of Compliance" via HTML-to-PDF template. |
| **04** | Resend | Send Transactional Email (B1) with Script Snippet and PDF attachments. |
| **05** | Attio | Update Stage to Shield\_Active. Trigger 72-hour delay for Path C. |

* **Red-Team Safety:** If PDF generation fails, the workflow must send the email *without* the PDF and trigger a Slack alert for manual delivery within 1 hour.

## **3\. WORKFLOW GAMMA: THE "PATH A" NURTURE LOOP**

**Trigger:** Attio Stage Change (Diagnostic\_Run \-\> Safe\_Harbor\_Optin).

| Step | Node Type | Logic / Action |
| :---- | :---- | :---- |
| **01** | Attio Trigger | Triggers when a lead magnet is downloaded. |
| **02** | Wait | Wait 48 Hours. |
| **03** | Attio Check | Filter: Has this lead already purchased the Shield? If YES, stop. |
| **04** | Resend | Send Nurture Email 2: "The Small Biz Reality Check." |
| **05** | Decision | Repeat for Emails 3-5 until purchase or sequence end. |

## **4\. WORKFLOW DELTA: THE "PATH C" UPSALE (HIGH-TICKET)**

**Trigger:** 72 Hours after Shield\_Active status.

| Step | Node Type | Logic / Action |
| :---- | :---- | :---- |
| **01** | Wait | 72-hour delay (allows user to install the script). |
| **02** | Attio Check | Does Forensic\_Audit show \>3 complex templates? |
| **03** | Resend | Send Email C1: "Structural Logic Alert" (Personalized from Julian). |
| **04** | Slack | Alert Julian: "High-Ticket Lead \[Domain\] warmed. Expect booking." |

## **5\. RED-TEAM ERROR HANDLING & RELIABILITY**

### **A. The "Exponential Backoff" Protocol**

Every node connecting to an external API (Stripe, Attio, Resend) **must** have "Retry on Failure" enabled:

* **Attempts:** 5  
* **Delay:** 1s, 2s, 4s, 8s, 16s.  
* **On Final Failure:** Route to "Global Error Handler" (Slack/Discord Alert).

### **B. Security & Data Integrity**

1. **Stripe Signature Verification:** Do not process any payment webhook that does not have a valid stripe-signature header.  
2. **Duplicate Prevention:** Use the session\_id from Stripe as the "Idempotency Key" in n8n to ensure a user isn't emailed twice for the same purchase.  
3. **PII Sanitization:** If a workflow fails, ensure the error log sent to Slack does *not* contain the customer's full credit card digits (only last 4).

### **C. Rate Limit Management**

* **Attio API:** Limit n8n to 50 concurrent requests to prevent triggering Attio’s rate-limiting, which could pause the entire system during a peak Blitz.