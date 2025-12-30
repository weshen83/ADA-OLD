import { Metadata } from 'next';
import { Search, Shield, FileCheck, Zap, Lock, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Methodology | ADA Legal Shield',
    description: 'Our forensic audit methodology: How we identify WCAG 2.1 AA violations and protect your business.',
};

const STEPS = [
    {
        step: '01',
        title: 'Fingerprint Sanitization',
        description: 'Our scanner uses stealth protocols to bypass WAF detection. We mimic real user behavior to ensure accurate results, not bot-triggered false positives.',
        icon: Lock,
    },
    {
        step: '02',
        title: 'Deep DOM Analysis',
        description: 'We pierce Shadow DOM structures and wait for full hydration. Lazy-loaded content, SPAs, and dynamic elements are all captured in our forensic snapshot.',
        icon: Search,
    },
    {
        step: '03',
        title: 'WCAG 2.1 AA Mapping',
        description: 'Every element is cross-referenced against the 50+ success criteria of WCAG 2.1 Level AA, with special attention to Dec 2025 litigation patterns.',
        icon: BarChart3,
    },
    {
        step: '04',
        title: 'Risk Stratification',
        description: "Not all violations are equal. We weight findings by litigation probability—missing alt-text on hero images carries more risk than deep-page issues.",
        icon: Zap,
    },
    {
        step: '05',
        title: 'AI Remediation Layer',
        description: 'Our Shield deploys runtime fixes that intercept accessibility APIs. Screen readers and bots see a compliant interface without touching your source code.',
        icon: Shield,
    },
    {
        step: '06',
        title: 'Compliance Certification',
        description: 'Every audit generates timestamped, cryptographically-hashed evidence. This "Good Faith" log is admissible in court as proof of remediation effort.',
        icon: FileCheck,
    },
];

export default function MethodologyPage() {
    return (
        <div className="py-24">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="inline-block px-3 py-1 text-xs font-mono text-terminal bg-terminal/10 border border-terminal/20 rounded-full uppercase tracking-widest mb-6">
                        Technical Documentation
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                        Forensic Audit Methodology
                    </h1>
                    <p className="text-txt-secondary text-lg leading-relaxed">
                        Our six-phase scanning protocol identifies violations that trigger 92% of
                        ADA website lawsuits. We don&apos;t just find problems—we prioritize them by
                        litigation risk.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="max-w-4xl mx-auto">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={step.step}
                                className={`flex flex-col md:flex-row gap-6 md:gap-12 mb-16 last:mb-0 ${isEven ? '' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Step Number */}
                                <div className="flex-shrink-0 flex items-start">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-xl bg-surface border border-white/10 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-alert" />
                                        </div>
                                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-alert text-white text-xs font-mono font-bold flex items-center justify-center">
                                            {step.step}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-txt-secondary leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Technical Note */}
                <div className="mt-20 max-w-2xl mx-auto p-6 bg-surface border border-white/10 rounded-xl">
                    <h4 className="font-mono text-xs text-txt-secondary uppercase tracking-widest mb-3">
                        Technical Note
                    </h4>
                    <p className="text-sm text-txt-secondary leading-relaxed">
                        Our scanner utilizes Playwright with CDP hardening to bypass modern WAFs (Cloudflare, DataDome).
                        We automatically exclude .gov, .edu, and .mil domains from scanning. All scans originate from
                        US residential IPs to ensure accurate geo-specific results.
                    </p>
                </div>
            </div>
        </div>
    );
}
