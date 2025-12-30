# **🛠️ TOOL CONFIGURATION & WIRING GUIDE (v1.0)**

This guide provides the specific settings, API configurations, and connection logic required to activate the ADA Legal Shield "Blitz" machine.

## 

## **1\. THE INFRASTRUCTURE (HETZNER VPS)**

* **OS:** Windows Server 2022 (Required for GSA Website Contact).  
* **Configuration:** \* Install **Node.js v20.x** (For the Sniffer Script and n8n).  
  * Install **n8n Desktop** (or run via Docker).  
  * Enable **Remote Desktop (RDP)** with a strong 32-character password.

## 

## **2\. GSA WEBSITE CONTACT (THE OUTREACH ENGINE)**

*Julian must configure these exact settings to bypass filters and maximize deliverability.*

### **A. Submission Settings**

* **Threads:** Set to 50 (Adjust based on VPS CPU; if CPU \> 80%, lower to 30).  
* **Timeout:** 60 seconds.  
* **Retries:** 2 (Do not over-retry; it burns proxies).

### **B. Message & Spintax**

* **Link Format:** Use https://adashield.com/audit?v=%domain% (GSA will automatically replace %domain% with the target URL).  
* **Spintax:** Paste the Master Spintax from **Document 8**.

### **C. Captcha Wiring**

* Go to Options \-\> Captcha.  
* Select CapMonster Cloud.  
* Enter your **CapMonster API Key**.  
* Check Solve all supported types.

## **3\. WEBSHARE PROXIES (THE CLOAK)**

* **Type:** Rotating Datacenter or Residential (Datacenter is cheaper for Phase 1).  
* **Format:** IP:PORT:USER:PASS.  
* **Wiring:** Import the proxy list directly into GSA and the sniffer.js configuration file.  
* **Rotation:** Set to "Rotate on every request."

## **4\. RESEND (TRANSACTIONAL EMAIL)**

* **Domain Verification:**  
  * Add your domain (e.g., adashield.com) to Resend.  
  * **CRITICAL:** Update your DNS records (Cloudflare/GoDaddy) with the **SPF, DKIM, and DMARC** values provided by Resend. *Emails will hit spam without this.*  
* **API Key:** Create a "Production" key with Full Access.

## **5\. ATTIO (THE CRM BRAIN)**

* **Workspace:** Ensure your custom Forensic\_Audit object is created (from **Document 10**).  
* **API Access:** Generate an "Integration Token."  
* **Wiring:** Note your Object ID for the Audit object; you will need this for the n8n nodes.

## **6\. THE WIRING (n8n ORCHESTRATION)**

*Julian must "Bridge" the tools using these Webhook URLs.*

### **A. The Ingest Hook**

1. In n8n, create a **Webhook Node**.  
2. Set Method to POST.  
3. Copy the **Production URL**.  
4. In the Next.js .env file, set NEXT\_PUBLIC\_N8N\_WEBHOOK\_URL=\[Your\_URL\].

### **B. The Stripe Hook**

1. In Stripe Dashboard \-\> Developers \-\> Webhooks.  
2. Add an endpoint: \[n8n\_Stripe\_Webhook\_URL\].  
3. Select Event: checkout.session.completed.  
4. Copy the Signing Secret (starts with whsec\_) and paste it into the n8n Stripe Node.

## **7\. RED-TEAM CONFIGURATION AUDIT (PRE-FLIGHT CHECK)**

**1\. The "Dead Man's Switch":**

* **Configuration:** Set an n8n alert to email Julian if the VPS disk space is \>90% or if the Sniffer script returns more than 50 consecutive errors.

**2\. Proxy Health:**

* **Configuration:** In GSA, enable "Automatically disable proxy on 3 consecutive failures." This prevents the bot from "hallucinating" that a site is down when the proxy is actually dead.

**3\. API Rate Limits:**

* **Configuration:** Set the n8n "Wait" nodes to ensure we don't send more than **10 requests per second** to Attio. Attio will throttle us if we go higher, causing lost data.

**4\. Burner Domain Protection:**

* **Configuration:** Do **not** use your primary domain for GSA outreach. Use a ".com" or ".net" that is similar (e.g., adashield-alerts.com). Link this to your main site via the Audit URL. This protects your main domain's SEO and email reputation.