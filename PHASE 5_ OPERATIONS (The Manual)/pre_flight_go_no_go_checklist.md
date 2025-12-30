# **🚀 PRE-FLIGHT GO/NO-GO CHECKLIST (v2.0 \- ULTIMATE)**

Project: ADA Legal Shield Blitz | Window: T-Minus 90 Minutes to GSA Activation  
Classification: Critical Operations | Authority: Julian (Mission Command)

## **🛑 THE "ABORT" MANDATE**

*If any item marked \[CRITICAL\] is unchecked, Julian is authorized to delay the launch by 120 minutes for remediation. Do NOT engage under "Red" status.*

## **🛰️ PHASE 1: STRESS TEST & LOAD BALANCING (T-90)**

*Checked by: SRE / Infrastructure Lead*

* \[ \] **\[CRITICAL\] n8n Concurrency Test:** Send 10 simultaneous mock webhook pings. Verify CPU spikes stay below 40%. (Prevents VPS lock-up during the 50k burst).  
* \[ \] **\[CRITICAL\] Proxy Pool Latency:** Run a 100-domain "Ghost Scan." Verify average response time is \<1.8s. Flush proxies if success rate is \<85%.  
* \[ \] **Disk Space Sentinel:** Verify the VPS has at least 20GB of free SSD space (n8n execution logs can grow rapidly during a blitz).  
* \[ \] **API Quota Check:** Log in to **Resend, Attio, and CapMonster**. Confirm all credits are sufficient for 2,000+ conversions.

## **🔒 PHASE 2: SECURITY & SOVEREIGNTY (T-60)**

*Checked by: Security Red-Team*

* \[ \] **\[CRITICAL\] Geo-Fence Verification:** Personally VPN into London, Tokyo, and Sydney. Confirm the "403 Forbidden" screen is active. (Zero GDPR/International liability).  
* \[ \] **SSL Chain Validation:** Verify SSL certificate expiry for adashield.com and all API subdomains is \>30 days.  
* \[ \] **DMARC/SPF Lockdown:** Send one test email to mail-tester.com. Score must be **10/10**. (Prevents Resend from being blacklisted by Outlook/Gmail).  
* \[ \] **Token Rotation:** Confirm N8N\_SIGNING\_SECRET and STRIPE\_WEBHOOK\_SECRET are stored as Environment Variables, not hard-coded.

## **💳 PHASE 3: REVENUE & FINANCIAL FIDELITY (T-45)**

*Checked by: RevOps Lead*

* \[ \] **\[CRITICAL\] Stripe Live-Mode Handshake:** Verify Stripe is "Live." Confirm the $297 Product SKU is correctly mapped to the Next.js checkout action.  
* \[ \] **Section 44 Math Audit:** View the checkout page on a mobile device. Confirm the "Net Cost: $148.50" text is perfectly legible and positioned next to the "Pay" button.  
* \[ \] **Refund Portal Ready:** Ensure Julian has the Stripe dashboard open and knows the "1-Click Refund" protocol for Triage (Crisis SOP).

## **🧬 PHASE 4: THE "LABOR ILLUSION" QA (T-30)**

*Checked by: UX / Conversion Specialist*

* \[ \] **\[CRITICAL\] The "92% Stall" Test:** Run a manual audit for nike.com. Verify the GSAP progress bar hangs at 92% for exactly 1.8 seconds to build anxiety.  
* \[ \] **Dynamic Ticker Sync:** Confirm the Litigation Ticker is pulling the "Dec 29, 2025" alert data correctly.  
* \[ \] **Mobile Touch Targets:** Verify the "Authorize Shield" button is tappable on an iPhone 13/14/15/16 screen without horizontal scrolling.

## **📈 PHASE 5: SALES & ASCENSION READINESS (T-15)**

*Checked by: Julian*

* \[ \] **\[CRITICAL\] Attio "Path C" Trigger:** Verify that a "Paid" status triggers the 72-hour delay node in n8n.  
* \[ \] **Calendly Buffer:** Ensure Julian’s calendar has "Buffer Time" (15 mins) between calls to handle high-ticket scoping.  
* \[ \] **Sales Script Monitor:** manual\_remediation\_sales\_script.md must be open and "The IRS Anchor" section highlighted.

## **🛡️ PHASE 6: EMERGENCY ROLLBACK (THE "KILL SWITCH")**

*Checked by: Mission Command*

* \[ \] **GSA Emergency Pause:** Confirm Julian has the GSA "Stop All" hotkey mapped.  
* \[ \] **Maintenance Mode:** Verify that the MAINTENANCE\_MODE=true flag in Vercel successfully shows the "System Calibration" screen to new visitors.

## **🏁 FINAL AUTHORIZATION LOG**

| Tier | Lead | Status | Timestamp |
| :---- | :---- | :---- | :---- |
| **I. INFRASTRUCTURE** | \[Name\] | \[ READY / NO-GO \] | \_\_\_\_\_\_\_\_\_\_ |
| **II. SECURITY** | \[Name\] | \[ READY / NO-GO \] | \_\_\_\_\_\_\_\_\_\_ |
| **III. REVENUE** | \[Name\] | \[ READY / NO-GO \] | \_\_\_\_\_\_\_\_\_\_ |
| **IV. CONVERSION** | \[Name\] | \[ READY / NO-GO \] | \_\_\_\_\_\_\_\_\_\_ |

**MISSION COMMAND (JULIAN):** "By checking this box, I confirm that the ADA Shield is technically and legally primed for a high-velocity 50,000-lead injection."

* \[ \] **ENGAGE BLITZ**