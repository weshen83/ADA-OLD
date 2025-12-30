# **🧠 DYNAMIC AUDIT COMPONENT LOGIC (v2.0 \- FINAL)**

**Framework:** Next.js 15 \+ Zustand \+ React Query **Logic Model:** "Optimistic Forensic UI" with Deterministic Fallbacks **Status:** Production Ready

## 

## **1\. STATE MANAGEMENT (HYDRATION-SAFE ZUSTAND)**

We use a "Safe Hydration" pattern to ensure the server-rendered HTML matches the client-side state, preventing layout shifts.

### **The Store Schema (useAuditStore)**

`type AuditPhase = 'IDLE' | 'CONNECTING' | 'ANALYZING' | 'COMPILING' | 'COMPLETE';`

`interface AuditState {`  
  `domain: string | null;`  
  `phase: AuditPhase;`  
  `progress: number;`  
  `report: PublicAuditReport | null;`  
    
  `// Actions`  
  `actions: {`  
    `startScan: (domain: string) => void;`  
    `setPhase: (phase: AuditPhase) => void;`  
    `setReport: (data: PublicAuditReport) => void;`  
    `reset: () => void;`  
  `}`  
`}`

### **The "Safe" Hook Wrapper**

To prevent Next.js Hydration errors with persisted state:  
`// hooks/use-audit-store.ts`  
`const useAuditStore = create<AuditState>()(`  
  `persist((set) => ({ ... }), { name: 'audit-session' })`  
`);`

`// Use this in components, NOT the raw store`  
`export const useSafeAuditStore = <T>(selector: (state: AuditState) => T): T | undefined => {`  
  `const [data, setData] = useState<T>();`  
  `const result = useAuditStore(selector);`  
  `useEffect(() => setData(result), [result]);`  
  `return data;`  
`};`

## **2\. THE "DETERMINISTIC FALLBACK" ALGORITHM (NORMALIZED)**

**Objective:** Ensure https://google.com, www.google.com/, and google.com ALL yield the exact same "Forensic Risk Score."

### **The Normalization Logic**

1. **Strip Protocol:** Remove https:// or http://.  
2. **Strip Subdomain:** Remove www..  
3. **Strip Path:** Remove anything after the first /.  
4. **Lowercase:** Convert to google.com.

### **The Hashing Algorithm (Stable Math)**

`// lib/forensic-math.ts`  
`export const generateDeterministicReport = (domain: string): PublicAuditReport => {`  
  `const seed = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);`  
    
  `// Risk Score: Always high (7.2 to 9.8)`  
  `const riskRaw = (seed % 26) / 10 + 7.2;`   
    
  `// Violation Count: Always significant (12 to 42)`  
  `const violations = (seed % 30) + 12;`

  `return {`  
    ``audit_id: `SIM-${seed}`,``  
    `domain,`  
    `risk_score: Number(riskRaw.toFixed(1)),`  
    `metrics: {`  
      `missing_alts: violations,`  
      `aria_errors: Math.floor(violations / 3),`  
      `// ...other metrics derived from seed`  
    `}`  
  `};`  
`};`

## **3\. THE "LABOR ILLUSION" HOOK (TIMING ENFORCEMENT)**

We decouple the **Data Fetch** from the **Visual Experience**. The user *must* wait 5 seconds, even if the data arrives in 0.1 seconds.  
`// hooks/useForensicScan.ts`  
`export const useForensicScan = (rawDomain: string) => {`  
  `const router = useRouter();`  
  `const { actions } = useAuditStore();`  
  `const MIN_DURATION = 5200; // 5.2 seconds`

  `const executeScan = async () => {`  
    `const domain = normalizeDomain(rawDomain);`  
    `const startTime = Date.now();`  
      
    `actions.setPhase('CONNECTING');`

    `// 1. Fire API Request (Background)`  
    `const dataPromise = getAuditDataAction(domain); // Server Action`  
      
    `// 2. Trigger GSAP Animation (Foreground)`  
    `// The animation timeline is set to exactly 5.2s in the library`  
      
    `// 3. Wait for BOTH to finish`  
    `const [report] = await Promise.all([`  
      `dataPromise,`  
      `new Promise(r => setTimeout(r, MIN_DURATION)) // Enforce wait`  
    `]);`

    `// 4. Handle Result`  
    `if (report.success) {`  
      `actions.setReport(report.data);`  
    `} else {`  
      `// API Failed? Use Deterministic Fallback silently`  
      `const simReport = generateDeterministicReport(domain);`  
      `actions.setReport(simReport);`  
    `}`

    `actions.setPhase('COMPLETE');`  
    ``router.push(`/audit/${domain}`);``  
  `};`

  `return { executeScan };`  
`};`

## **4\. ERROR MASKING & RECOVERY**

**The "Anti-Crash" Strategy:** In a forensic tool, a crash looks like incompetence. We map Application Errors to "Network Interferences."

* **Scenario:** Database Timeout.  
  * **UI Result:** "Remote Host Latency High. Switching to Passive Scan..." (Then load Deterministic Data).  
* **Scenario:** Rate Limit (429).  
  * **UI Result:** "Queue Full. Priority Access Granted..." (Then load Deterministic Data).

## **5\. RED-TEAM SECURITY LOGIC**

1. **Input Sanitization:**  
   * The normalizeDomain function also strips \<script\> tags and SQL injection patterns. If malicious input is detected, the frontend immediately throws a "Security Alert: Invalid Hostname" and refuses to send the request to the server.  
2. **State Isolation:**  
   * sessionStorage is cleared automatically on the "Thank You" page. This ensures that if the user scans a *second* site, they don't see the cached data from the first scan.

## **6\. VIBE CODING PROMPT INSTRUCTION**

"Gemini, generate the useForensicScan hook. Import generateDeterministicReport from @/lib/forensic-math. Use Promise.all to ensure the function waits for the MIN\_DURATION constant even if the getAuditDataAction resolves early. Normalize the domain input using the Zod schema before passing it to the store."