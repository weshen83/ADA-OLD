# **🛤️ CUSTOMER JOURNEY & FUNNEL LOGIC (v2.0 \- FINAL)**

Status: Production Ready

Tech Stack: Next.js \-\> n8n \-\> Attio \-\> Resend

Objective: Automating the transition from "Unaware Victim" to "Shielded Partner."

## **1\. THE ARCHITECTURAL CORE: "THE LABOR ILLUSION"**

Every path in this funnel is anchored by the **Diagnostic Event**. To maximize perceived value and justify the $297 price tag, we utilize a 5–8 second GSAP-animated "Forensic Scan."

* **The Psychological Anchor:** Users do not trust instant results. They trust "Work."  
* **The Interaction:** The user enters a URL. The screen goes dark. Terminal lines scroll. A progress bar stalls at 92%.  
* **Red-Team Note:** To prevent 20% bounce rates during the wait, we must display "Sub-Task Status" updates (e.g., *\> Analyzing Image Metadata... \> Decrypting DOM Structure...*) to maintain engagement.

## **2\. THE THREE STRATEGIC PATHS**

### **🌊 PATH A: THE "EDUCATIONAL" NURTURE (Non-Buyers)**

Target: Leads who entered a URL but abandoned the checkout flow.

Psychological State: "Problem Aware" but "Solution Skeptical."

1. **Entry Point:** Exit Intent Popup or "Download Full Report" button on the Audit Result page.  
2. **The Hook:** "The Dec 2025 Safe Harbor Kit" (Includes IRS Form 8826 Guide \+ Compliance Checklist).  
3. **CRM Trigger (Attio):**  
   * Create Person/Company.  
   * Set Status: Lead.  
   * Add Tag: Path\_A\_Nurture.  
4. **Resend Nurture Sequence (5 Days \- Fear to Logic):**  
   * **Day 0 (Immediate):** "Your Forensic Audit Checklist \[Download\]" \+ Screen Reader Simulator GIF.  
   * **Day 1 (Agitation):** "The 'Drive-By' Lawsuit: Why \[Industry\] is the \#1 target this week." (Uses dynamic industry insertion).  
   * **Day 3 (Logic):** "The IRS is paying for 50% of your defense." (Deep dive into Section 44 Math).  
   * **Day 5 (Urgency):** "Closing the Pilot Window ($297 Pricing Ends)."

### **🛡️ PATH B: THE "SHIELD" CONVERSION (Direct Buyers)**

Target: Leads who purchased the $297 AI Shield.

Psychological State: "Relieved" but "Structurally Exposed."

1. **Entry Point:** Successful Stripe Checkout ($297).  
2. **CRM Trigger (Attio):**  
   * Update Status: Customer\_Shield\_Active.  
   * Create Forensic\_Audit Object (Linked to Company).  
   * **Logic Branch:** If Template\_Count \> 3, Tag as High\_Ticket\_Prospect.  
3. **Fulfillment (Immediate via Resend):**  
   * **Email B1 (Transactional):** "🛡️ DEPLOYMENT COMPLETE: \[Domain\] Shield Active."  
     * *Attachments:* JS Snippet \+ Statement of Compliance PDF.  
   * **Email B2 (4 Hours Later):** "The Safe Harbor Kit."  
     * *Framing:* "I bundled this for you as a bonus. It includes the Tax Credit Form you need for your accountant."  
4. **The Pivot:** Automatically subscribe to **Path C (Ascension)** after 72 hours.

### **🚀 PATH C: THE "ASCENSION" (High-Ticket Upsell)**

Target: Shield Buyers identified as having "Complex Infrastructure" (E-com, Custom Forms).

Psychological State: "Trust established, looking for permanent safety."

1. **The Trigger:** 72 Hours after Purchase \+ High\_Ticket\_Prospect Tag.  
2. **The Narrative:** "The Shield stops bots. Manual Remediation stops humans."  
3. **Personalized Outreach (Manual/Automated Hybrid):**  
   * **Email C1 (Day 3):** "Structural Logic Alert: \[Domain\]."  
     * *Body:* "Your Shield is working. However, my manual review flagged a 'Logical Trap' in your **\[Checkout/Booking\]** flow. AI cannot fix logic. This is a primary target for human plaintiffs."  
   * **Email C2 (Day 5):** "The Template Math (IRS Update)."  
     * *Body:* "We can fix your core templates manually. Net cost is only **$279/page** with your tax credit. Shall we scope it?"  
4. **The Action:** Schedule 10-min "Technical Scope Call" (Calendly).  
5. **Closing (On Call):** Quote $1,395+ (5+ templates), anchor against the $15,000 settlement risk.

## **3\. TECHNICAL WIRING & CRM TRIGGERS**

| Event | System | Action | Data Payload |
| :---- | :---- | :---- | :---- |
| **GSA Form Fill** | n8n | Pushes "Diagnostic Data" to **Baserow**. | domain, missing\_alt, form\_url |
| **User Runs Scan** | Next.js | Queries Baserow \-\> Sets GSAP Scan values. | risk\_score |
| **Lead Magnet Opt-in** | n8n | Pushes to **Attio** \-\> Triggers **Resend** (Path A). | email, industry |
| **Stripe Success** | n8n | Updates **Attio** (Closed Won) \-\> Triggers **Resend** (Path B). | stripe\_session\_id, amount |
| **Upsell Call Booked** | Calendly | Updates **Attio** (Stage: Scoping). | meeting\_time |

## **4\. THE RED-TEAM "FRICTION & LEAK" AUDIT**

**Vulnerability 1: The "False Positive" Refund.**

* *Risk:* A user buys the Shield, runs a free scanner (like Wave), and sees errors still exist.  
* *Solution:* The "Statement of Compliance" PDF must explicitly state: *"This Shield remediates violations at the Runtime/Browser level. Static scanners may not detect the fix. Please use the provided 'Live Audit' tool to verify protection."*

**Vulnerability 2: The "Small Business" Denial.**

* *Risk:* "I'm too small to be sued."  
* *Solution:* Page 1 must include a **"Risk Counter"** showing that 74% of 2025 lawsuits targeted SMBs with \<$5M revenue.

**Vulnerability 3: Pricing Confusion (Path C).**

* *Risk:* "You want $2,500? You said $279\!"  
* *Solution:* We define "Page" strictly as a **"Template"** in all copy. Julian must verbally explain: *"You have 100 product pages, but they use 1 template. You pay for the template, we fix 100 pages. It's a bulk discount."*

## **5\. FAQ STRATEGY (EVERY PAGE)**

*To prevent support tickets and pre-handle objections.*

1. **"Is this a subscription?"**  
   * *A:* "No. The Pilot is a one-time Setup Fee ($297). We offer an optional annual continuity plan for $197/year starting next year, but you are protected immediately upon deployment."  
2. **"Do I need a developer?"**  
   * *A:* "No. We provide a single line of code (like a Facebook Pixel). You paste it once, and the Shield deploys instantly."  
3. **"What if I get sued tomorrow?"**  
   * *A:* "The Shield creates a timestamped 'Good Faith' audit log. In many jurisdictions, this evidence allows your defense attorney to dismiss the claim or drastically reduce the settlement."

