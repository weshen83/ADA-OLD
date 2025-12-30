# **🎨 CREATIVE DIRECTION & VISUAL ASSETS (v1.0)**

The visual goal of ADA Legal Shield is to create a "Technical Command Center" atmosphere. We must look like a security firm or a legal intelligence bureau, not a SaaS marketing site.

## 

## **1\. VISUAL IDENTITY (THE "INSTITUTIONAL" PALETTE)**

### **A. Color System**

We use a high-contrast, "Dark Mode Default" system to imply high-stakes cybersecurity.

* **Core Black:** \#050505 (Deep space black \- Background).  
* **Audit Grey:** \#1A1A1A (Card backgrounds / UI surfaces).  
* **Regulatory Red:** \#FF3333 (Alerts, Risks, and primary CTA). Use with high intensity.  
* **Safe Harbor Green:** \#22C55E (Compliance status, IRS credits).  
* **Monospace Green:** \#4ADE80 (Terminal text).  
* **Text (Primary):** \#FFFFFF (90% opacity).  
* **Text (Secondary/Muted):** \#6B7280.

### **B. Typography**

* **Headlines:** *Inter* (Black weight, \-0.05em letter spacing). High-impact, authoritative.  
* **Body:** *Inter* (Medium weight). Clean, modern, Swiss-style legibility.  
* **Forensic/Data:** *JetBrains Mono* or *Roboto Mono*. Used for all audit results, terminal logs, and price calculations to imply "Code Accuracy."

## 

## **2\. THE "LABOR ILLUSION" ANIMATION SPECS (GSAP)**

The "Forensic Scan" is the core conversion driver. It must feel like heavy processing is occurring.

* **The Scan Progress Bar:** \* *Duration:* 5.8 seconds.  
  * *Easing:* Power4.easeOut (starts fast, slows down at 90% to imply "deep analysis" of the final data points).  
* **The Terminal Typewriter:**  
  * *Speed:* 25ms per character.  
  * *Line Delay:* 400ms between logs.  
  * *Content:* Each line must trigger a small "check" icon SVG to turn from grey to green upon completion.  
* **Audit Result Reveal:** \* *Animation:* "Staggered Slide-Up" (y: 20, opacity: 0).  
  * *Trigger:* On complete of the Scan Progress Bar.

## 

## **3\. THE "SCREEN READER SIMULATOR" (Visual Logic)**

This is the "A-ha\!" component on the homepage. It must be visceral.

* **State A (User View):** A standard, high-quality website hero section with a "Buy Now" button and product image.  
* **State B (Screen Reader View):**  
  * The visual site fades to 10% opacity.  
  * A "Hacker Green" overlay reveals the raw code labels (or lack thereof).  
  * *The "Glitch" Effect:* Where metadata is missing, the image is replaced by a red "X" icon with text: \[NULL\_METADATA\].  
  * *Audio (Optional):*\* A subtle robotic VO (using Browser Synthesis) that says: "Link. Image. Unlabeled Button."

## **4\. UI COMPONENTS & ASSETS**

### **A. The "Risk Gauge" (The "Fear" Visual)**

* **Style:** A semi-circle gauge (SVG).  
* **Behavior:** On page load of the Audit result, the needle swings from 0 to the calculated risk (e.g., 9.2) with a slight "bounce" effect.  
* **Color Logic:** 0-3 (Green), 4-7 (Orange), 8-10 (Red).

### **B. Iconography**

* **Source:** *Lucide-React* or *Phosphor Icons*.  
* **Style:** Thin (1.5px stroke), sharp corners.  
* **Mandatory Icons:** Shield, Gavel, AlertTriangle, FileSearch, Lock, Scale.

### **C. Compliance Seals (SVG)**

* *Note:* We must design custom "ADA Shield" seals.  
* **Seal 1:** "2025 Forensic Compliance Standard."  
* **Seal 2:** "IRS Section 44 Tax-Credit Verified."  
* **Seal 3:** "WCAG 2.1 AA Technical Conformance."

## **5\. RED-TEAM VISUAL AUDIT (ANTI-SKEPTICISM)**

**1\. Avoid "Happy" Imagery:**

* *Red-Team Correction:* Do not use stock photos of smiling business owners or handshakes. This is a technical audit. Use macro-photography of keyboards, server racks, or legal documents.

**2\. No "Marketing" Shadows:**

* *Red-Team Correction:* Avoid soft, blurry drop-shadows. Use 1px solid borders (border-white/10) or sharp 2px "Card" offsets to imply precision.

**3\. The "Institutional" Header:**

* *Red-Team Correction:* The header should contain a "System Clock" (Live Time) and "Active Monitoring" status to make the site feel like it’s a real-time utility, not a static landing page.