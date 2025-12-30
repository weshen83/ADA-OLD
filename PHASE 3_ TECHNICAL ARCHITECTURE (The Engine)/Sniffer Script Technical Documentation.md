# **🕵️ SNIFFER SCRIPT TECHNICAL DOCUMENTATION (v1.0)**

The "Sniffer" is a high-performance Node.js utility designed to filter raw lead lists and perform a "Forensic Scan" to identify high-liability targets for the ADA Legal Shield.

## 

## **1\. TECHNICAL ARCHITECTURE**

The script utilizes a headless browser cluster to simulate real user visits, allowing us to bypass simple bot protections and analyze the "Executed DOM" (what the browser actually renders) rather than just the static HTML source.

### **Core Stack:**

* **Runtime:** Node.js (v20+).  
* **Engine:** Playwright (Chromium) for high-fidelity rendering.  
* **Concurrency:** p-limit for controlled multi-threading on a 4-core VPS.  
* **Proxies:** Integration with WebShare Rotating Datacenter Proxies.

## 

## **2\. THE "FORENSIC" SCAN LOGIC (WCAG 2.1 AA)**

To drive the "Labor Illusion" and provide Julian with high-accuracy sales data, the script scans for four primary "Litigation Triggers":

1. **Alt-Text Deficit:** \* Checks every \<img\> tag for the presence of an alt attribute.  
   * Flags "Empty Alts" (alt="") and "Redundant Alts" (alt="image123").  
2. **ARIA Landmark Absence:**  
   * Scans for role="navigation", role="main", role="contentinfo".  
   * Lack of landmarks is the primary indicator of an "Unnavigable" site for screen readers.  
3. **Keyboard Focus Traps:**  
   * Programmatically attempts to tab through the first 10 interactive elements.  
   * If focus does not move or becomes "trapped," the site is flagged as "High Liability."  
4. **Form Label Integrity:**  
   * Inspects \<input\> fields for associated \<label\> tags or aria-label attributes.

## 

## **3\. IMPLEMENTATION BLUEPRINT (CORE LOGIC)**

`// sniffer.js - Core Audit Logic`  
`const { chromium } = require('playwright');`  
`const pLimit = require('p-limit');`

`async function forensicAudit(domain, proxy) {`  
  `const browser = await chromium.launch({`   
    `proxy: { server: proxy },`  
    `args: ['--disable-blink-features=AutomationControlled']`   
  `});`  
    
  `const context = await browser.newContext({ userAgent: 'Mozilla/5.0...' });`  
  `const page = await context.newPage();`

  `try {`  
    ``await page.goto(`https://${domain}`, { waitUntil: 'domcontentloaded', timeout: 30000 });``  
      
    `// 1. Audit Missing Alt Tags`  
    `const images = await page.$$eval('img', imgs => ({`  
      `total: imgs.length,`  
      `missing: imgs.filter(i => !i.alt || i.alt.trim() === '').length`  
    `}));`

    `// 2. Audit ARIA Landmarks`  
    `const landmarks = await page.$$eval('[role]', roles => roles.length);`

    `// 3. Detect Platform (Tech Stack Sniffing)`  
    `const isWordpress = await page.evaluate(() => !!document.querySelector('meta[name="generator"]')?.content?.includes('WordPress'));`

    `return {`  
      `domain,`  
      `status: images.missing > 5 ? 'At-Risk' : 'Compliant',`  
      `missing_alt_count: images.missing,`  
      `has_landmarks: landmarks > 0,`  
      `tech_stack: isWordpress ? 'WordPress' : 'Custom/Other',`  
      `timestamp: new Date().toISOString()`  
    `};`  
  `} catch (err) {`  
    `return { domain, status: 'Inaccessible', error: err.message };`  
  `} finally {`  
    `await browser.close();`  
  `}`  
`}`

## 

## **4\. OPERATIONAL WORKFLOW**

### **A. The "Filter" Phase (Pre-GSA)**

1. Ingest 50,000 raw domains from DataforSEO.  
2. Run the Sniffer with high concurrency (50 tabs).  
3. Output: at\_risk\_leads.csv (Only those with \>10 violations).  
4. **Julian’s Value:** This ensures we only message people who are *actually* broken.

### **B. The "Real-Time" Phase (Live Audit)**

1. User enters domain on the Next.js frontend.  
2. n8n triggers this script via a dedicated API endpoint on the VPS.  
3. Output: Real-time violation counts fed directly into the GSAP terminal.

## 

## **5\. RED-TEAM SECURITY & STEALTH PROTOCOLS**

**1\. The "Anti-Fingerprinting" Pass:**

* **Protocol:** The script must randomize userAgent, viewport, and deviceScaleFactor for every request.  
* **Why:** To bypass Cloudflare's "Under Attack" mode and prevent our VPS IP from being blacklisted.

**2\. The "Rate Limit" Governor:**

* **Protocol:** Implement a 500ms jitter between browser launches.  
* **Why:** Rapid-fire Chromium launches can spike CPU to 100%, causing the VPS to freeze or n8n to drop the connection.

**3\. "Stealth" Filtering:**

* **Protocol:** The script automatically skips domains ending in .gov, .edu, or .mil.  
* **Why:** These entities have internal legal teams and automated monitoring. Targeting them increases the risk of "Cease & Desist" letters.

**4\. Captcha Handling:**

* **Protocol:** If a 403 or "Challenge" page is detected, the script routes the page URL to **CapMonster** via API.  
* **Why:** Ensures the "Forensic Audit" doesn't fail on sites protected by HCaptcha or Turnstile.

## 

## **6\. OUTPUT SCHEMA (FOR BASEROW/ATTIO)**

The script must return a standardized JSON object:  
`{`  
  `"domain": "smiledental.com",`  
  `"forensic_metrics": {`  
    `"alt_deficit": 14,`  
    `"aria_fail": true,`  
    `"keyboard_trap": false,`  
    `"risk_score": 8.5`  
  `},`  
  `"metadata": {`  
    `"platform": "WordPress 6.4",`  
    `"cms_detected": true,`  
    `"audit_ref": "ADA-FX-102"`  
  `}`  
`}`  
