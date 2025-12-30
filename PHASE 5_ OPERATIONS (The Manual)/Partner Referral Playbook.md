# **🤝 PARTNER REFERRAL PLAYBOOK: ARBITRAGING THE OVERFLOW**

This document defines the strategy and operational workflows for managing our secondary revenue streams: referring leads to Defense Law Firms and Web Development Agencies.

## 

## **1\. THE PARTNER ECOSYSTEM**

We do not waste a single lead. If a business is outside our scope, we move them to a partner.

| Partner Type | The "Lead Trigger" | Value Prop to Partner | Our Referral Fee |
| :---- | :---- | :---- | :---- |
| **ADA Defense Law Firm** | Already received a Demand Letter / Sued. | High-intent client needing immediate litigation defense. | **$500.00** |
| **Web Agency** | Site is too old (Flash, Table-based) for AI Shield. | High-budget client needing a total site rebuild. | **$500.00** |
| **Tax Specialist/CPA** | Client has \>$10k in annual accessibility spend. | High-value client needing Section 44 / R\&D tax optimization. | **$250.00** |

## 

## **2\. THE REFERRAL WORKFLOW (n8n & ATTIO)**

To ensure we get paid, the "Handshake" must be documented.

1. **Tagging:** Julian identifies an ineligible lead in **Attio** and tags them as Referral\_Required.  
2. **The Trigger:** A dropdown in Attio triggers an n8n workflow based on the partner selected.  
3. **The "Warm Intro" (Resend):** n8n fires an automated email to both the Client and the Partner.  
   * *To Client:* "To assist with your \[Active Lawsuit/Rebuild\], I am introducing you to our preferred partner, \[Partner Name\], who specializes in \[Specialty\]."  
   * *To Partner:* "New Referral: \[Client Name\] from \[Domain\]. Audit logs attached."  
4. **The Tracking:** The Attio record moves to Stage: Referral\_Pending.

## 

## **3\. PAYOUT SOP (THE "HONESTY" PROTOCOL)**

Because we are dealing with external partners, we must have a system to verify closed deals.

* **The Monthly Audit:** On the 1st of every month, Julian sends a "Referral Status Report" (generated from Attio) to all partners.  
* **Verification:** Partners must update the status of each lead (Opened, Quoted, Closed, Dead).  
* **Invoicing:** Upon a "Closed" status, Julian generates a $500 invoice via Stripe/Quickbooks.  
* **The "Clawback" Clause:** If a partner is found to be closing our leads without reporting them, they are removed from the network and all future leads are redirected to competitors.

## 

## **4\. PARTNER VETTING & BRAND PROTECTION**

Not all partners are equal. Julian must vet each one using these criteria:

1. **Speed to Response:** Partner must contact our referral within 4 business hours.  
2. **Institutional Alignment:** Partner must use the same professional, data-driven tone we use.  
3. **Revenue Minimum:** Partner must be capable of handling $5,000+ contracts.

## 

## **5\. STRATEGY: THE "PARTNER PIVOT" SCRIPTS**

**For the "Already Sued" Client:**  
"Mr. \[Name\], while our AI Shield is a preventative measure, you are currently in an active litigation phase. I’m going to refer you to our Specialized Defense Partner who has a 95% success rate in settling these specific Dec 2025 claims for under $5,000. I’ll make the introduction now."  
**For the "Legacy Site" Client:**  
"Your current infrastructure is too outdated for a technical remediation layer. It’s like putting a new lock on a cardboard door. I am referring you to our Agency Partner for a 'Safety-First' Rebuild. They will build you a site that is compliant from the first line of code."

## 

## **6\. RED-TEAM PARTNER CONTROLS**

**1\. The "Leakage" Prevention:**

* **Red-Team Rule:** Every referral email must include a "Tracking Pixel" or a unique "Case ID" in the subject line. This creates a paper trail that Julian can use to audit the partner’s CRM later if needed.

**2\. The "Kickback" Legal Pass:**

* **Red-Team Rule:** Ensure the referral fee is described as a "Marketing & Audit Fee" or "Technical Handover Fee" to comply with various state bar association rules regarding "fee-splitting" for legal services.

**3\. Quality Control (The "Secret Shopper"):**

* **Red-Team Rule:** Julian should occasionally use a "Burner Identity" to submit a lead to a partner to see how they handle the intake. If they are slow, unprofessional, or try to cut Julian out of the deal, terminate the partnership.