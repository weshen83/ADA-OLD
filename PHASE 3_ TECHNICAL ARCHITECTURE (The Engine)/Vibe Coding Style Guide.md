# **🎨 VIBE CODING STYLE GUIDE: THE FORENSIC STANDARD**

**Target:** Google Antigravity / Gemini 3 Pro **Framework:** Next.js 15 \+ Tailwind v4 \+ GSAP **Status:** Mandatory for all Frontend Generation

## 

## **1\. THE "INSTITUTIONAL" DESIGN TOKENS (TAILWIND CONFIG)**

Do not use default Tailwind colors. We override the palette to create a "Forensic Dark Mode."

### **A. Color Palette**

`// tailwind.config.ts`  
`export default {`  
  `theme: {`  
    `colors: {`  
      `// Backgrounds: Deep, infinite black. No grey wash.`  
      `background: '#050505',`   
      `surface: '#0A0A0A',`  
        
      `// Accents: High-vis alerts.`  
      `alert: {`  
        `DEFAULT: '#FF3333', // Regulatory Red`  
        `dim: 'rgba(255, 51, 51, 0.1)',`  
        `glow: '0 0 20px rgba(255, 51, 51, 0.3)'`  
      `},`  
      `safe: {`  
        `DEFAULT: '#22C55E', // Compliance Green`  
        `dim: 'rgba(34, 197, 94, 0.1)'`  
      `},`  
        
      `// Typography`  
      `txt: {`  
        `primary: '#FFFFFF', // 100% White`  
        `secondary: '#A3A3A3', // Neutral 400`  
        `mono: '#4ADE80' // Terminal Green (for logs only)`  
      `}`  
    `},`  
    `fontFamily: {`  
      `sans: ['Inter', 'system-ui', 'sans-serif'], // UI Text`  
      `mono: ['JetBrains Mono', 'monospace'], // Data & Logs`  
    `}`  
  `}`  
`}`

### **B. Typography Rules**

* **Headlines:** Always font-black tracking-tighter leading-none.  
  * *Example:* text-6xl font-black tracking-\[-0.05em\] uppercase  
* **Data Points:** Always font-mono uppercase.  
  * *Example:* text-xs font-mono text-alert tracking-widest  
* **Body:** High legibility. text-lg text-txt-secondary leading-relaxed.

## 

## **2\. GSAP ANIMATION PHYSICS (THE "FORENSIC" FEEL)**

We do not use "Spring" or "Bounce." Legal tech is precise. **Default Ease:** Power3.out or Expo.out.

### **A. The "Terminal Typewriter" Effect**

* **Usage:** For displaying audit logs.  
* **Code Pattern:**  
  `gsap.to(textRef.current, {`  
    `text: { value: "Scanning DOM Tree..." },`  
    `duration: 0.8,`  
    `ease: "none", // Linear for typing`  
    `delimiter: ""`   
  `});`

### **B. The "Risk Gauge" Stagger**

* **Usage:** Revealing violation cards.  
* **Code Pattern:**  
  `gsap.from(".violation-card", {`  
    `y: 20,`  
    `opacity: 0,`  
    `duration: 0.6,`  
    `stagger: 0.1, // Tight stagger`  
    `ease: "power2.out"`   
  `});`

### **C. The "Panic Pulse"**

* **Usage:** For the "Critical Risk" badge.  
* **Code Pattern:**  
  `gsap.to(".alert-badge", {`  
    `opacity: 0.5,`  
    `repeat: -1,`  
    `yoyo: true,`  
    `duration: 0.8, // Slow, ominous pulse`  
    `ease: "sine.inOut"`  
  `});`

## 

## **3\. REACT COMPONENT PATTERNS (STRICT)**

### **A. Atomic Construction**

Build components as **Isolated Atoms**.

* RiskBadge.tsx  
* TerminalLog.tsx  
* AuditCard.tsx

### **B. The "Labor Illusion" Hook**

Every interactive component must support a loading state that triggers a specific visual sequence before resolving data.  
`// useLaborIllusion.ts`  
`const useLaborIllusion = (onComplete: () => void, duration = 5000) => {`  
  `// Logic to sequence fake "steps" before showing real data`  
`}`

## 

## **4\. ACCESSIBILITY (A11Y) ENFORCEMENT**

* **Buttons:** Must have focus-visible:ring-2 focus-visible:ring-alert.  
* **Animations:** Wrap all GSAP logic in a prefers-reduced-motion check.  
  `let mm = gsap.matchMedia();`  
  `mm.add("(prefers-reduced-motion: no-preference)", () => {`  
    `// Animations go here`  
  `});`

* **Color Contrast:** All text on \#050505 backgrounds must be at least text-gray-400 or lighter to pass AA standards.

## 

## **5\. RED-TEAM "ANTI-PATTERNS" (DO NOT USE)**

1. **Gradients on Text:** Do not use rainbow gradients. Use solid white or solid red. Gradients look like "Web3," not "Legal."  
2. **Rounded-Full Buttons:** Use rounded-md or rounded-lg for primary actions. rounded-full is too soft.  
3. **Default Shadows:** Use border border-white/10 instead of shadow-lg. We want "Glass," not "Float."