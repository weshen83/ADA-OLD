# **🏗️ SNIFFER ENGINE ARCHITECTURE v2.0 (FINAL)**

**Status:** Production Ready (Dec 2025 Standards) **Core:** Node.js v22 (LTS) \+ Playwright \+ Stealth Logic **Target:** 50,000 domains / 4-hour window / 100% Data Integrity

## 

## **1\. THE "DEEP-DIVE" FORENSIC PIPELINE**

Unlike 2024 crawlers, this engine account for modern SPA (Single Page Application) architectures where content is injected post-load.

### **Phase 1: Fingerprint Sanitization (Stealth Mode)**

* **The "Zero-Trace" User-Agent:** We use the playwright-extra stealth plugin to mimic a "Clean Consumer" browser.  
* **CDP (Chrome DevTools Protocol) Hardening:** We manually strip Runtime.enable and Page.addScriptToEvaluateOnNewDocument fingerprints that modern WAFs (DataDome/Cloudflare) use to detect headless browsers.

### **Phase 2: The "Widget & Overlay" Intelligence**

* **Detection:** Scans for aria-hidden="false" overlays.  
* **The "Fake Shield" Check:** We detect if an overlay is present but *inactive* or *blocked* (a common trigger for "Intentional Exclusion" lawsuits).  
* **Logical Exit:** If a valid, active overlay (AccessiBe, etc.) is detected, we log COMPLIANT\_OVERLAY and exit within 800ms to save resources.

### **Phase 3: Shadow DOM & Hydration Audit**

* **Shadow-Piercing:** Many E-com sites hide their "Cart" and "Checkout" in a Shadow DOM. Our script uses page.locator('all') logic to pierce shadow roots.  
* **Hydration Wait:** We wait for networkidle AND a custom 500ms "Visual Stabilization" window to ensure lazy-loaded images are captured in the Alt-count.  
* **The "Deceptive Alt" Filter:** We don't just count missing alts. We flag "Deceptive Alts" where the text is:  
  * Equal to the filename (e.g., alt="IMG\_5502.jpg")  
  * Below 3 characters (e.g., alt="img")  
  * *Why:* These are considered "Automated Failures" in federal court.

## **2\. HIGH-CONCURRENCY RESOURCE SCHEDULER**

To process 50,000 domains on a $14/mo VPS, we must treat RAM as a finite fuel.

### **A. The "Cluster" Strategy**

* **Main Thread:** Orchestrator (reads Baserow, manages proxy pool).  
* **Worker Threads:** 5 clusters of 5 contexts each (25 total).  
* **Auto-Recycle:** The browser instance is killed and respawned every **500 URLs** to wipe Chromium's persistent memory bloat.

### **B. Network Request Throttling**

* **Aborted Types:** stylesheet (except for layout checks), image, media, font, manifest, other.  
* **Execution Bypass:** We disable 3rd-party analytics scripts (GA4, Meta Pixel) from firing to prevent our scan from showing up in the client's Google Analytics (which alerts their web dev).

## **3\. PROXY & ANTI-CAPTCHA WIRING**

* **Proxy Logic:** WebShare Rotating Residential.  
  * If 403/429 \-\> Switch to High-Priority Residential node (Cost: \+$0.02).  
* **Captcha Handler:** CapMonster integration for Cloudflare Turnstile.  
  * *Red-Team Update:* If a site shows a Captcha, we only solve it if the business revenue is \>$1M (High-Value target). For low-value targets, we SKIP to save solve-credits.

## **4\. FINALIZED OUTPUT SCHEMA (.jsonl)**

`{`  
  `"audit_id": "SNF-2025-X99",`  
  `"domain": "luxury-watches-nyc.com",`  
  `"status": "AT_RISK_CRITICAL",`  
  `"forensic_report": {`  
    `"total_images": 42,`  
    `"missing_alt": 28,`  
    `"deceptive_alt": 5,`  
    `"shadow_dom_violations": 2,`  
    `"aria_landmarks_present": false,`  
    `"form_errors": 3`  
  `},`  
  `"business_intel": {`  
    `"cms": "Shopify",`  
    `"theme": "Dawn-v15",`  
    `"estimated_settlement_risk": 12500,`  
    `"irs_credit_eligible": true`  
  `},`  
  `"operational": {`  
    `"scan_duration_ms": 4200,`  
    `"proxy_region": "US-EAST-1"`  
  `}`  
`}`

## **5\. RED-TEAM INFRASTRUCTURE HARDENING**

1. **Memory Guard:** A Process.on('uncaughtException') listener that dumps the current queue back to Baserow before the script dies, ensuring 0% lead loss.  
2. **IP Jitter:** The sniffer never hits more than 2 domains on the same shared host (e.g., Shopify) from the same proxy IP in a 60-second window to prevent platform-wide banning.  
3. **Local Cache:** The script stores "Last 1,000 Domains" in a local SQLite buffer to prevent redundant scanning if n8n accidentally sends a duplicate request.