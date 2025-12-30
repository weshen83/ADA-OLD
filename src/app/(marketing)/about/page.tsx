import { Metadata } from 'next';
import { Target, Users, Scale } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About | ADA Legal Shield',
    description: 'Digital Risk Architects protecting American SMBs from ADA website litigation.',
};

export default function AboutPage() {
    return (
        <div className="py-24">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                        Digital Risk Architects
                    </h1>
                    <p className="text-txt-secondary text-lg leading-relaxed">
                        We don&apos;t &quot;sell software&quot;—we remediate structural liability.
                        ADA Legal Shield was built to protect American small-to-medium businesses
                        from the December 2025 litigation surge.
                    </p>
                </div>

                {/* Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
                    <div className="p-6 bg-surface border border-white/10 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-alert/10 flex items-center justify-center mb-4">
                            <Target className="w-6 h-6 text-alert" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">The Problem</h3>
                        <p className="text-sm text-txt-secondary leading-relaxed">
                            Serial plaintiffs use LLM-driven bots to scan 100,000+ domains daily.
                            92% of US businesses are structurally exposed, viewing accessibility
                            as a design choice rather than a statutory mandate.
                        </p>
                    </div>

                    <div className="p-6 bg-surface border border-white/10 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-safe/10 flex items-center justify-center mb-4">
                            <Scale className="w-6 h-6 text-safe" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">The Precedent</h3>
                        <p className="text-sm text-txt-secondary leading-relaxed">
                            Federal Courts have finalized the &quot;Nexus&quot; theory—websites are now
                            legally defined as &quot;Public Accommodations&quot; under Title III of the ADA.
                            Digital borders do not exist.
                        </p>
                    </div>

                    <div className="p-6 bg-surface border border-white/10 rounded-xl">
                        <div className="w-12 h-12 rounded-lg bg-terminal/10 flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-terminal" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Our Mission</h3>
                        <p className="text-sm text-txt-secondary leading-relaxed">
                            Deploy autonomous &quot;Statutory Defense Layers&quot; that neutralize the
                            threat of predatory litigation through forensic auditing, automated
                            remediation, and federal tax-incentive optimization.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8">Our Principles</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-mono font-bold">
                                01
                            </span>
                            <div>
                                <h4 className="font-bold mb-1">Forensic Accuracy</h4>
                                <p className="text-sm text-txt-secondary">
                                    We utilize the same scanning technology as plaintiff law firms.
                                    If they can find it, we find it first.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-mono font-bold">
                                02
                            </span>
                            <div>
                                <h4 className="font-bold mb-1">Institutional Transparency</h4>
                                <p className="text-sm text-txt-secondary">
                                    No hidden fees. Every price shows both gross cost and net cost
                                    after IRS Section 44 credit. We link directly to official sources.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-mono font-bold">
                                03
                            </span>
                            <div>
                                <h4 className="font-bold mb-1">Good Faith Documentation</h4>
                                <p className="text-sm text-txt-secondary">
                                    Every remediation generates timestamped, cryptographically-hashed proof.
                                    In court, action matters more than perfection.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-20 max-w-2xl mx-auto p-6 bg-surface/50 border border-dashed border-white/10 rounded-xl text-center">
                    <p className="text-xs text-txt-secondary leading-relaxed">
                        <span className="font-bold text-white">LEGAL NOTICE:</span> ADA Legal Shield is a technical
                        service provider and is NOT a law firm. We provide forensic remediation layers designed to
                        WCAG 2.2 AA standards. This constitutes technical risk mitigation, not legal advice.
                    </p>
                </div>
            </div>
        </div>
    );
}
