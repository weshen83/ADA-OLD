# **🎨 GSAP FORENSIC ANIMATION LIBRARY (v2.0 \- FINAL)**

**Framework:** GSAP 3.12+ (Core \+ TextPlugin) **Aesthetic:** "Cyber-Forensic" / "Institutional Security" **Performance:** GPU-Accelerated / FOUC-Proof

## 

## **1\. THE "LABOR ILLUSION" SCANNER (CORE CONVERSION TOOL)**

### **A. The "Deep Scan" Sequence (With Mobile Velocity)**

* **Logic:** On desktop, we want a 5-second drama. On mobile, we speed it up (0.7x) because attention spans are shorter.

\<\!-- end list \--\>  
`// animations/scan-sequence.ts`  
`import { gsap } from 'gsap';`

`export const runDeepScanSequence = (`  
  `barRef: React.RefObject<HTMLDivElement>,`   
  `onComplete: () => void,`  
  `playSound: (id: string) => void // New Audio Hook`  
`) => {`  
  `const isMobile = window.innerWidth < 768;`  
  `const timeScale = isMobile ? 1.5 : 1; // Faster on mobile`

  `const tl = gsap.timeline({`   
    `onComplete,`  
    `defaults: { ease: "power2.out" }`  
  `});`

  `tl.to(barRef.current, { width: "30%", duration: 0.8 * timeScale, onStart: () => playSound('init') })`  
    `.to(barRef.current, { width: "45%", duration: 1.5 * timeScale, ease: "linear" }) // Processing...`  
    `.to(barRef.current, { width: "85%", duration: 0.6 * timeScale, ease: "power4.out", onStart: () => playSound('burst') })`   
    `.to(barRef.current, { width: "92%", duration: 2.0 * timeScale, ease: "none" }) // The "Deep Think" Stall (Anxiety Peak)`  
    `.to(barRef.current, { width: "100%", duration: 0.4 * timeScale, ease: "expo.out", onStart: () => playSound('success') });`  
      
  `return tl;`  
`};`

### **B. The "Number Decryptor" (Score Counter)**

* **Visual:** The Risk Score doesn't just appear. It counts up rapidly like a slot machine or a hacking tool finding a password.  
* **Psychology:** Shows "Calculation" happening.

\<\!-- end list \--\>  
`// animations/score-counter.ts`  
`export const animateRiskScore = (`  
  `element: HTMLElement,`   
  `targetScore: number // e.g. 9.2`  
`) => {`  
  `const obj = { val: 0 };`  
    
  `gsap.to(obj, {`  
    `val: targetScore,`  
    `duration: 2,`  
    `ease: "power4.out",`  
    `onUpdate: () => {`  
      `// Formats to 1 decimal place (e.g. "4.5")`  
      `element.innerText = obj.val.toFixed(1);`   
        
      `// Dynamic Color Shift based on value`  
      `if (obj.val > 8) element.style.color = "#FF3333"; // Red`  
      `else if (obj.val > 5) element.style.color = "#F97316"; // Orange`  
    `}`  
  `});`  
`};`

## **2\. THE "THREAT REVEAL" (FORENSIC RESULT PAGE)**

### **A. The "Text Decryption" Effect (No Club Plugins)**

* **Visual:** Headers scramble from random characters into legible text. XJ9\# \-\> CRITICAL  
* **Implementation:** Custom hook to avoid paid GSAP plugins.

\<\!-- end list \--\>  
`// hooks/use-scramble.ts`  
`// A lightweight replacement for ScrambleTextPlugin`  
`export const useScramble = (element: HTMLElement, finalText: string) => {`  
  `const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";`  
  `let iterations = 0;`  
    
  `const interval = setInterval(() => {`  
    `element.innerText = finalText`  
      `.split("")`  
      `.map((letter, index) => {`  
        `if (index < iterations) return finalText[index];`  
        `return chars[Math.floor(Math.random() * chars.length)];`  
      `})`  
      `.join("");`  
      
    `if (iterations >= finalText.length) clearInterval(interval);`  
    `iterations += 1 / 3; // Speed control`  
  `}, 30);`  
`}`

### **B. The "Critical Risk" Gauge (Elastic Physics)**

* **Physics:** The needle overshoots the target value slightly (wobble) before settling. This mimics a physical voltmeter measuring high voltage.

\<\!-- end list \--\>  
`// animations/risk-gauge.ts`  
`export const animateRiskNeedle = (needle: HTMLElement, score: number) => {`  
  `const rotation = (score / 10) * 180;`   
    
  `gsap.to(needle, {`  
    `rotation: rotation,`  
    `duration: 2.5,`  
    `ease: "elastic.out(1, 0.4)", // Heavy bounce`  
    `transformOrigin: "bottom center",`  
    `delay: 0.2`  
  `});`  
`};`

## **3\. MICRO-INTERACTIONS (THE "FEEL")**

### **A. The "Glitch" Alert (System Failure)**

* **Usage:** When the "Critical Violations Found" badge appears.  
* **Visual:** A chromatic aberration shift (Red/Cyan) for 0.2s.

\<\!-- end list \--\>  
`// animations/glitch-effect.ts`  
`export const triggerGlitch = (element: HTMLElement) => {`  
  `const tl = gsap.timeline();`  
    
  `// Quick shake and color split`  
  `tl.to(element, { x: -2, textShadow: "2px 0 red", duration: 0.05 })`  
    `.to(element, { x: 2, textShadow: "-2px 0 cyan", duration: 0.05 })`  
    `.to(element, { x: 0, textShadow: "none", duration: 0.05 });`  
      
  `return tl;`  
`};`

## **4\. FOUC PREVENTION (CSS STRATEGY)**

* **Problem:** Next.js hydrates, and for 0.1s, the user sees the "Un-animated" state (e.g., Risk Score 0).  
* **Solution:** Global CSS rules for GSAP targets.

\<\!-- end list \--\>  
`/* globals.css */`  
`.gsap-hidden {`  
  `opacity: 0;`  
  `visibility: hidden;`  
`}`

`// Usage in Component`  
`// GSAP automatically handles the 'autoAlpha' (opacity + visibility)`  
`gsap.to(".gsap-hidden", { autoAlpha: 1, duration: 0.5 });`

## **5\. RED-TEAM PERFORMANCE CONTROLS**

* **Audio Throttling:** Ensure the audio hooks (playSound) have a debounce. We don't want a machine-gun sound effect if the user resizes the window or re-triggers a scan rapidly.  
* **Canvas vs. DOM:** For the "Matrix/Code Rain" background, use \<canvas\> (handled by a lightweight library like react-matrix-effect) instead of animating thousands of DOM nodes with GSAP. GSAP handles the *UI*, Canvas handles the *Background*.  
* **Memory Cleanup:** ctx.revert() must be called in the useEffect cleanup return to ensure GSAP animations don't persist across route changes in the Single Page Application.