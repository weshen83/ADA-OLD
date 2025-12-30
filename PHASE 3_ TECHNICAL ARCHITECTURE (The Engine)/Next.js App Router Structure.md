# **🏗️ NEXT.JS 15 APP ROUTER STRUCTURE (v2.0 \- FINAL)**

**Framework:** Next.js 15.1+ (App Router) **Styling:** Tailwind CSS v4 (Alpha/Beta optimization) 

**State:** Zustand (Client) \+ React Query (Server Hydration) 

**Validation:** Zod \+ React Hook Form **Status:** Production Ready

## 

## **1\. THE FORENSIC PROJECT TREE**

This structure uses **Feature-Sliced Design principles** adapted for the App Router to ensure maintainability and security.  
`/`  
`├── app/                        # App Router (Server-First Entry)`  
`│   ├── (marketing)/            # Marketing Group (Institutional Layout)`  
`│   │   ├── layout.tsx          # Marketing Header/Footer`  
`│   │   ├── page.tsx            # Home (The Command Center)`  
`│   │   ├── privacy/            # Legal Pages`  
`│   │   └── about/              # "Our Mission"`  
`│   ├── (audit)/                # App Group (Forensic Layout)`  
`│   │   ├── layout.tsx          # Dashboard Shell (No Footer, High Focus)`  
`│   │   ├── scan/               # The "Labor Illusion" Loading State`  
`│   │   │   └── page.tsx`  
`│   │   └── audit/              # Dynamic Results`  
`│   │       └── [domain]/`  
`│   │           ├── page.tsx    # Server Component (Fetches Data)`  
`│   │           ├── loading.tsx # React Suspense Fallback`  
`│   │           └── error.tsx   # Granular Error Boundary`  
`│   ├── api/                    # Route Handlers (Edge Compatible)`  
`│   │   ├── webhooks/`  
`│   │   │   └── stripe/route.ts # Payment Listener`  
`│   │   └── n8n-proxy/route.ts  # Secure Gateway`  
`│   ├── global-error.tsx        # Catastrophic Failure Catcher`  
`│   ├── layout.tsx              # Root Layout (Fonts, Metadata, Providers)`  
`│   ├── not-found.tsx           # Custom 404 (Institutional Theme)`  
`│   ├── robots.ts               # SEO Control`  
`│   └── sitemap.ts              # SEO Indexing`  
`├── components/                 # UI Library`  
`│   ├── atoms/                  # Button, Badge, Input, Spinner`  
`│   ├── molecules/              # RiskGauge, TerminalLog, PricingCard`  
`│   ├── organisms/              # ForensicHeader, AuditGrid, ThreatTicker`  
`│   ├── templates/              # Full page layouts (Email Templates)`  
`│   └── providers/              # Client-Side Context Wrappers`  
`│       ├── theme-provider.tsx`  
`│       └── gsap-context.tsx    # Global Animation Controller`  
`├── lib/                        # Shared Utilities`  
`│   ├── actions/                # Server Actions (Mutations)`  
`│   │   ├── submit-scan.ts      # Triggers Sniffer`  
`│   │   └── process-payment.ts  # Stripe Logic`  
`│   ├── db/                     # Database Clients`  
`│   │   ├── attio.ts`  
`│   │   └── baserow.ts`  
`│   ├── utils.ts                # cn(), formatCurrency()`  
`│   └── constants.ts            # Design Tokens & Config`  
`├── schemas/                    # Zod Validation (Single Source of Truth)`  
`│   ├── audit-request.ts        # Validates Domain Input`  
`│   └── database-types.ts       # Infers Types from DB Schema`  
`├── styles/                     # Global Styles`  
`│   └── globals.css             # Tailwind v4 Directives (@theme)`  
`├── types/                      # TypeScript Global Definitions`  
`│   └── global.d.ts`  
`├── middleware.ts               # Edge Security (Rate Limit, Geo-Fence)`  
`└── next.config.ts              # Security Headers & Image Domains`

## **2\. COMPONENT COLLOCATION & RULES**

### **A. The "Server-Only" Mandate**

We install the server-only package to prevent accidental leakage of secrets.

* **Rule:** Any file in lib/db/ or lib/actions/ MUST import server-only at the top. If a developer tries to import these into a Client Component, the build will fail.

### **B. The "Client Island" Architecture**

We isolate interactivity to the smallest possible leaf nodes.

* **Bad Pattern:** Making page.tsx a Client Component ("use client").  
* **Good Pattern:** page.tsx fetches data (Server) and passes it to \<AuditVisualizer /\> (Client).

### **C. Zod Schema Centralization**

All validation logic lives in /schemas.

* **Frontend:** Uses the schema for form validation (React Hook Form).  
* **Backend:** Uses the *exact same schema* to validate the API payload.  
* **Why:** Prevents "Frontend/Backend Drift" where the UI allows a domain that the API rejects.

## **3\. SEO & METADATA STRATEGY**

We use Next.js 15's Metadata API for dynamic "Social Proof."

* **layout.tsx:** Defines the base "Institutional" metadata (Title, Description, OG Image).  
* **\[domain\]/page.tsx:** Generates dynamic OG Images.  
  * *Logic:* If I share the link adashield.com/audit/nike.com on Slack, the preview image should show "NIKE.COM: CRITICAL RISK DETECTED" dynamically generated via ImageResponse.

## **4\. TAILWIND v4 CONFIGURATION**

We use the CSS-first configuration method in globals.css.  
`@import "tailwindcss";`

`@theme {`  
  `--color-background: #050505;`  
  `--color-alert: #FF3333;`  
  `--font-mono: "JetBrains Mono", monospace;`  
    
  `/* Forensic Animations */`  
  `--animate-pulse-fast: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;`  
`}`

## **5\. RED-TEAM SECURITY AUDIT (CODE LEVEL)**

1. **Strict Content Security Policy (CSP):**  
   * Configured in next.config.ts.  
   * **Rule:** Scripts can ONLY load from our domain, Stripe, and Vercel Analytics. No inline scripts allowed (prevents XSS).  
2. **Middleware Logic:**  
   * The middleware.ts file must run *before* any route rendering.  
   * **Logic:** Check GeoIP \-\> Check Rate Limit (Upstash) \-\> Pass to App.  
3. **Error masking:**  
   * global-error.tsx must NEVER render the actual stack trace to the user. It should render a specific "System Integrity Error" screen with a support ID code.

## **6\. VIBE CODING PROMPT INSTRUCTION**

When instructing Gemini to build a page, reference the path explicitly:  
"Gemini, create the **Forensic Audit Result** page at app/(audit)/audit/\[domain\]/page.tsx. It must be a Server Component that awaits the params. Use the getAuditData function from lib/actions/audit.ts. Handle the loading state with loading.tsx which should contain the GSAP 'Labor Illusion' component."