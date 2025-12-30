# **🛡️ AUTOMATED A11Y TESTING SUITE (v2.0 \- FINAL)**

**Framework:** Playwright \+ @axe-core/playwright **Standard:** WCAG 2.1 AA & WCAG 2.2 (Dec 2025\) **Objective:** The "Hypocrisy Shield" — Preventing deployment of non-compliant code.

## 

## **1\. THE "ZERO-TOLERANCE" CI/CD GATE**

We do not rely on manual checks. If a commit fails a single accessibility rule, Vercel **must** reject the build.

### **The Pipeline Logic**

1. **Pre-Commit Hook:** Runs npm run test:a11y locally (fast scan).  
2. **Vercel Build Step:** Runs full Playwright suite against the preview deployment.  
3. **Threshold:** violations: 0\. No warnings allowed.

## **2\. THE TECH STACK**

`// playwright.config.ts`  
`import { defineConfig } from '@playwright/test';`

`export default defineConfig({`  
  `use: {`  
    `// Force specific emulation for A11y`  
    `forcedColors: 'none',`  
    `colorScheme: 'dark', // We test our Dark Mode default`  
  `},`  
  `projects: [`  
    `{`  
      `name: 'Desktop Chrome',`  
      `use: { browserName: 'chromium', viewport: { width: 1280, height: 720 } },`  
    `},`  
    `{`  
      `name: 'Mobile Safari',`  
      `use: { browserName: 'webkit', viewport: { width: 375, height: 667 } },`  
    `},`  
  `],`  
`});`

## **3\. TEST SCENARIOS (THE "FORENSIC" CHECK)**

### **A. Static Page Audit (The Baseline)**

Scans every static route for structural failures.  
`// tests/a11y-static.spec.ts`  
`import { test, expect } from '@playwright/test';`  
`import { injectAxe, checkA11y } from 'axe-playwright';`

`test('Homepage should have zero WCAG violations', async ({ page }) => {`  
  `await page.goto('/');`  
  `await injectAxe(page);`  
    
  `// Exclude 3rd party scripts (Stripe) from our audit liability`  
  `await checkA11y(page, {`  
    `exclude: ['iframe'],`   
    `detailedReport: true,`  
    `detailedReportOptions: { html: true },`  
  `});`  
`});`

### **B. The "Labor Illusion" Interaction Audit (Critical)**

We must ensure the "Scanning" animation doesn't trap the keyboard focus.  
`// tests/a11y-interactive.spec.ts`  
`test('Audit Flow remains accessible during animation', async ({ page }) => {`  
  `await page.goto('/');`  
    
  `// 1. Trigger the Scan`  
  `await page.getByRole('textbox', { name: /enter domain/i }).fill('example.com');`  
  `await page.getByRole('button', { name: /initiate scan/i }).click();`  
    
  `// 2. Wait for GSAP Animation State`  
  `await page.waitForSelector('[data-state="scanning"]');`  
    
  `// 3. Verify Focus Management (Focus should move to the progress indicator or wait)`  
  `// Ensure no "Keyboard Trap" exists in the terminal window`  
  `await injectAxe(page);`  
  `await checkA11y(page);`  
`});`

### **C. The "Reduced Motion" Override**

We must verify that our useSafeGSAP hook actually works.  
`test('Respects prefers-reduced-motion', async ({ page }) => {`  
  `// Emulate user setting`  
  `await page.emulateMedia({ reducedMotion: 'reduce' });`  
  `await page.goto('/');`  
  `await page.getByRole('button', { name: /scan/i }).click();`  
    
  `// Asset: Result should appear INSTANTLY (No 5s wait)`  
  `await expect(page.getByText('Critical Risk Detected')).toBeVisible({ timeout: 500 });`  
`});`

## **4\. RED-TEAM SPECIFIC CHECKS**

**1\. Contrast Ratio in "Forensic Mode":**

* *Risk:* Our \#050505 background \+ \#FF3333 text might fail contrast checks on some monitors.  
* *Test:* axe-core automatically checks color contrast. We strictly enforce a **4.5:1 ratio** for all text (except huge headlines which allow 3:1).

**2\. Form Labeling (The "Irony" Check):**

* *Risk:* If our own "Enter Domain" input is missing a label, we look incompetent.  
* *Test:* Explicit check for getByLabel('Enter Domain') to ensure the association exists in the DOM.

**3\. Zoom Scaling:**

* *Risk:* Next.js sometimes disables zoom on mobile.  
* *Test:* Verify viewport meta tag allows user-scalable=yes and layout doesn't break at 200% zoom.

## **5\. VIBE CODING PROMPT INSTRUCTION**

"Gemini, create the Playwright test file tests/a11y-audit.spec.ts. Import axe-playwright. Write a test that navigates to the /audit/google.com page, waits for the 'Labor Illusion' animation to complete (using page.waitForSelector('.result-card')), and then runs checkA11y. Ensure detailedReport: true is enabled so I can see the JSON violation log in the console."