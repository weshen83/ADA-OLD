# **🔐 API GATEWAY & WEBHOOK SECURITY (v2.0 \- FINAL)**

**Status:** Security Hardened (Dec 2025 Standards) **Scope:** Next.js 15 Frontend \<-\> n8n Backend \<-\> Stripe \<-\> Attio **Security Tier:** Institutional / Zero-Trust

## 

## **1\. THE "SECURE HANDSHAKE" (NEXT.JS \<-\> n8n)**

*Objective: Guarantee that only OUR frontend can trigger the audit engine.*

### **A. HMAC \+ Nonce Verification**

Every request to the n8n "Audit" webhook must be signed.

* **Mechanism:** Next.js Server Action generates a SHA-256 HMAC using a N8N\_SIGNING\_SECRET.  
* **The Nonce:** We include a x-request-id (UUID) that n8n caches in Redis for 5 minutes. If a request arrives with a used UUID, it is rejected as a "Replay Attack."  
* **Time-Window:** Requests older than 30 seconds are dropped to prevent "Time-Travel" attacks.

### **B. Input Sanitization (The "Zod" Guard)**

Before data ever leaves Next.js or enters n8n, it passes through strict validation.

* **Domain Regex:** We strictly validate the input against ^(\[a-z0-9\]+(-\[a-z0-9\]+)\*\\.)+\[a-z\]{2,}$.  
* **Payload Limit:** The Webhook receiver rejects any payload \> 10kb to prevent "Memory Exhaustion" DoS attacks.  
* **Blocklist:** We block localhost, 127.0.0.1, and reserved internal IPs from being submitted as audit targets to prevent SSRF (Server-Side Request Forgery).

## **2\. INFRASTRUCTURE DEFENSE LAYERS**

### **A. Geo-Fencing (The "US-Only" Wall)**

Since the IRS Section 44 Credit is US-only, non-US traffic is irrelevant and dangerous.

* **Implementation:** Cloudflare WAF Rule.  
* **Logic:** (ip.geoip.country ne "US") \-\> **BLOCK**.  
* **Benefit:** Reduces bot traffic by \~80% and protects the API from global botnets.

### **B. The "Cloudflare Tunnel" (Invisible Server)**

We do NOT open ports 80 or 443 on the Hetzner VPS.

* **Technology:** cloudflared daemon.  
* **Topology:** The VPS initiates an *outbound* encrypted tunnel to Cloudflare's edge.  
* **Result:** Port scanners see nothing. Shodan sees nothing. The server is invisible to the public internet except through the authenticated Cloudflare route.

## **3\. STRIPE & PAYMENT SECURITY (THE VAULT)**

### **A. Webhook Signature Enforcement**

We use the official stripe.webhooks.constructEvent method in a dedicated "Gateway" node within n8n.

* **Logic:** If the signature fails, the connection is dropped silently (no error message sent back to the attacker).

### **B. Idempotency & "Double-Dip" Prevention**

* **Risk:** Stripe sends retries if your server is slow. This could trigger duplicate emails or double-counting revenue.  
* **Defense:** n8n checks a Redis key stripe:processed:{event\_id}. If it exists, the execution returns 200 OK immediately without running the logic again.

## **4\. RATE LIMITING & "CIRCUIT BREAKERS"**

### **A. The "Upstash" Edge Governor**

We use Redis at the Edge (Middleware) to track IP behavior.

* **Anonymous Limit:** 3 audits / 24 hours.  
* **Violator Action:** If an IP hits the limit, they get a 429 Too Many Requests \+ a 24-hour "Cool-down" ban.

### **B. The "Kill Switch" (Panic Protocol)**

If n8n CPU spikes \> 90% or the "Sniffer" queue exceeds 500 pending jobs:

* **Action:** Julian triggers a "Maintenance Mode" environment variable in Vercel.  
* **Result:** The Frontend immediately stops sending requests and displays: *"System Under High Load. Please try again in 15 minutes."* This saves the VPS from crashing.

## **5\. DATA PRIVACY & OBSFUCATION**

### **A. "Error Masking"**

* **Rule:** The API **NEVER** returns stack traces or raw database errors to the frontend.  
* **Production Response:** Always return generic JSON: { "error": "audit\_failed", "code": 5001 }.  
* **Internal Log:** The full stack trace is sent to a private Slack channel \#ops-alerts via n8n.

### **B. PII Encryption (Data at Rest)**

* **Rule:** If we store any scraped emails in Baserow, the column is marked "Sensitive."  
* **Rule:** We do not log customer emails in Vercel or n8n execution logs (configured to "Exclude Input Data" in production).

## **6\. RED-TEAM "ATTACK SURFACE" FINAL CHECKLIST**

1. **CORS Lockdown:** Access-Control-Allow-Origin is strictly set to https://adashield.com. No wildcards (\*).  
2. **Honey-Tokens:** We bury a fake API key (sk\_live\_fake\_123) in the client-side JS code comment. If anyone attempts to use it against our backend, their IP is permanently hard-banned at the Cloudflare level.  
3. **Dependency Audit:** We use npm audit in the CI/CD pipeline to ensure no compromised packages are deployed to the Next.js frontend.