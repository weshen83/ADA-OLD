import { Metadata } from 'next';
import { Button } from '@/components/atoms/Button';
import { Check, Zap, Shield, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Pricing | ADA Legal Shield',
    description: 'Transparent pricing for ADA compliance remediation. Emergency AI Shield starting at $297.',
};

const TIERS = [
    {
        name: 'Emergency AI Shield',
        description: 'The "Tourniquet" — Stops automated bot scans instantly.',
        price: 297,
        netCost: 148.50,
        period: 'one-time',
        highlight: true,
        features: [
            'Instant AI Remediation Layer',
            '2025 Statement of Compliance',
            'Timestamped "Good Faith" Audit Log',
            'IRS Form 8826 (Pre-filled)',
            'Single-line code deployment',
            '12-month protection coverage',
        ],
        cta: 'Authorize Shield Deployment',
        icon: Zap,
    },
    {
        name: 'Structural Remediation',
        description: 'The "Cure" — Hard-coded WCAG 2.1/2.2 AA conformance.',
        price: 558,
        netCost: 279,
        period: 'per template',
        highlight: false,
        features: [
            'Manual Engineer Code Correction',
            'Remediation of Logical Traps',
            'Form & Checkout Path Fixes',
            'Certified Statutory Conformity Letter',
            'Priority Support Access',
            'Quarterly Compliance Review',
        ],
        cta: 'Schedule Technical Scope',
        icon: Shield,
    },
    {
        name: 'Enterprise',
        description: 'Full organizational compliance infrastructure.',
        price: null,
        netCost: null,
        period: 'custom',
        highlight: false,
        features: [
            'Full site remediation (unlimited templates)',
            'Annual compliance monitoring',
            'Dedicated compliance architect',
            'Staff accessibility training',
            'Quarterly executive briefings',
            'Litigation support documentation',
        ],
        cta: 'Contact Sales',
        icon: FileText,
    },
];

export default function PricingPage() {
    return (
        <div className="py-24">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-safe/20 bg-safe/5 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-safe" />
                        <span className="text-xs font-mono text-safe tracking-widest uppercase">
                            IRS Section 44 Eligible
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                        Compliance Infrastructure Pricing
                    </h1>
                    <p className="text-txt-secondary text-lg leading-relaxed">
                        Every price includes{' '}
                        <span className="text-safe font-medium">50% federal tax credit eligibility</span>{' '}
                        via IRS Section 44. Net costs shown assume credit approval.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {TIERS.map((tier) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.name}
                                className={`relative rounded-xl p-6 ${tier.highlight
                                        ? 'bg-surface border-2 border-alert/50 shadow-[0_0_40px_rgba(255,51,51,0.1)]'
                                        : 'bg-surface/50 border border-white/10'
                                    }`}
                            >
                                {tier.highlight && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="px-3 py-1 text-[10px] font-mono font-bold bg-alert text-white rounded uppercase tracking-wider">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`p-2 rounded-lg ${tier.highlight ? 'bg-alert/10' : 'bg-white/5'}`}>
                                            <Icon className={`w-5 h-5 ${tier.highlight ? 'text-alert' : 'text-white'}`} />
                                        </div>
                                        <h3 className="text-lg font-bold">{tier.name}</h3>
                                    </div>
                                    <p className="text-sm text-txt-secondary">{tier.description}</p>
                                </div>

                                <div className="mb-6">
                                    {tier.price ? (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-black">${tier.netCost}</span>
                                                <span className="text-txt-secondary text-sm line-through">${tier.price}</span>
                                            </div>
                                            <span className="text-xs text-txt-secondary font-mono uppercase">
                                                {tier.period} • Net after IRS credit
                                            </span>
                                        </>
                                    ) : (
                                        <div>
                                            <span className="text-3xl font-black">Custom</span>
                                            <span className="block text-xs text-txt-secondary font-mono uppercase mt-1">
                                                Contact for quote
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-safe flex-shrink-0 mt-0.5" />
                                            <span className="text-txt-secondary">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={tier.highlight ? 'primary' : 'ghost'}
                                    className="w-full justify-center"
                                >
                                    {tier.cta}
                                </Button>
                            </div>
                        );
                    })}
                </div>

                {/* IRS Credit Explainer */}
                <div className="mt-16 max-w-2xl mx-auto text-center">
                    <h3 className="text-xl font-bold mb-4">The IRS Section 44 Math</h3>
                    <p className="text-txt-secondary text-sm leading-relaxed mb-6">
                        Small businesses with gross receipts under $1,000,000 or fewer than 30 full-time employees
                        are eligible for a 50% tax credit on accessibility expenditures (up to $5,000/year).
                    </p>
                    <Link href="https://www.irs.gov/forms-pubs/about-form-8826" target="_blank" rel="noopener noreferrer">
                        <Button variant="terminal" size="sm">
                            View IRS Form 8826 →
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
