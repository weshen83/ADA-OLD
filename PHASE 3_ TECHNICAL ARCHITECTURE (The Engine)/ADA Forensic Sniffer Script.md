`const axios = require('axios');`  
`const cheerio = require('cheerio');`  
`const createCsvWriter = require('csv-writer').createObjectCsvWriter;`  
`const pLimit = require('p-limit');`

`/**`  
 `* CONFIGURATION`  
 `* We use 50 concurrent requests. Too high might crash a small VPS.`  
 `* 50 threads can process approx 5,000-8,000 sites per hour.`  
 `*/`  
`const limit = pLimit(50);`  
`const INPUT_JSON = './leads_from_dataforseo.json'; // The file from Step 1`  
`const OUTPUT_CSV = './at_risk_leads.csv';`

`// Detection Strings: If these exist, the site is likely PROTECTED.`  
`const PROTECTED_INDICATORS = [`  
    `'acsbapp.com',      // AccessiBe`  
    `'userway.org',      // UserWay`  
    `'audioeye.com',     // AudioEye`  
    `'monsido.com',      // Monsido`  
    `'siteimprove.com',  // Siteimprove`  
    `'equalweb.com',     // EqualWeb`  
    `'maxaccess.io',     // MaxAccess`  
    `'adally.com',       // Adally`  
    `'accessibe.js',     // General AccessiBe script`  
    `'accessibility-widget' // Generic class names`  
`];`

`// Structural Indicators: We check for these to determine "Risk Score"`  
`const STRUCTURAL_TAGS = ['aria-label', 'role=', 'aria-hidden', 'alt='];`

`const csvWriter = createCsvWriter({`  
    `path: OUTPUT_CSV,`  
    `header: [`  
        `{id: 'name', title: 'Business Name'},`  
        `{id: 'url', title: 'Website URL'},`  
        `{id: 'risk_score', title: 'Risk Score (0-10)'},`  
        `{id: 'missing_alt', title: 'Missing Alt Tags'},`  
        `{id: 'no_aria', title: 'Has No Aria Labels'}`  
    `]`  
`});`

`async function analyzeSite(business) {`  
    ``const url = business.url.startsWith('http') ? business.url : `https://${business.url}`;``  
      
    `try {`  
        `const response = await axios.get(url, {`   
            `timeout: 8000,`   
            `headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ADA-Compliance-Scanner/1.0' }`  
        `});`  
          
        `const html = response.data.toLowerCase();`  
        `const $ = cheerio.load(html);`

        `// 1. Check for Widgets (Immediate Exclusion)`  
        `const isProtected = PROTECTED_INDICATORS.some(term => html.includes(term));`  
        `if (isProtected) return null; // Skip compliant sites`

        `// 2. Forensic Analysis (Risk Scoring)`  
        `let riskScore = 10;`  
        `let missingAltCount = 0;`  
          
        `// Count images without alt tags`  
        `$('img').each((i, el) => {`  
            `if (!$(el).attr('alt')) missingAltCount++;`  
        `});`

        `const hasAria = html.includes('aria-label');`  
        `if (hasAria) riskScore -= 3; // Reduced risk if they at least tried`  
        `if (missingAltCount === 0) riskScore -= 2;`

        `return {`  
            `name: business.name,`  
            `url: url,`  
            `risk_score: riskScore,`  
            `missing_alt: missingAltCount,`  
            `no_aria: !hasAria`  
        `};`

    `} catch (error) {`  
        `// If the site is down, we don't include it in the blitz`  
        `return null;`  
    `}`  
`}`

`async function run() {`  
    `console.log("🚀 Initializing ADA Forensic Scan...");`  
    `const leads = require(INPUT_JSON); // Assuming DataforSEO output`  
      
    `const tasks = leads.map(lead => limit(() => analyzeSite(lead)));`  
    `const results = (await Promise.all(tasks)).filter(res => res !== null);`

    `await csvWriter.writeRecords(results);`  
    ``console.log(`✅ Scan Complete. Found ${results.length} high-risk targets. File saved: ${OUTPUT_CSV}`);``  
`}`

`run();`  
