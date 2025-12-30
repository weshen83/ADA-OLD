'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { useForensicScan } from '@/lib/hooks/use-forensic-scan';
import { ScannerOverlay } from '@/components/organisms/ScannerOverlay';
import { Shield, CheckCircle, Zap, FileText } from 'lucide-react';

export default function Home() {
    const [inputDomain, setInputDomain] = useState('');
    const { executeScan } = useForensicScan();

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputDomain) return;
        await executeScan(inputDomain);
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-4">
                {/* Background Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-alert/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,51,51,0.05)_0%,_transparent_70%)] pointer-events-none" />

                <div className="relative z-10 text-center space-y-8 max-w-4xl">
                    {/* Urgency Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-alert/30 bg-alert/5">
                        <div className="w-2 h-2 rounded-full bg-alert animate-pulse" />
                        <span className="text-xs font-mono text-alert tracking-widest uppercase">
                            Urgent: Statutory Compliance Update — Effective Dec 29, 2025
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                        In 2025, your website is no longer a marketing asset.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                            It is an Unsecured Statutory Liability.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-txt-secondary max-w-2xl mx-auto leading-relaxed">
                        Law firms use automated bots to &quot;harvest&quot; non-compliant businesses in seconds.
                        We deploy the same forensic technology to{' '}
                        <span className="text-white font-medium">immunize your domain</span>{' '}
                        before the demand letter is drafted.
                    </p>

                    {/* Scan Form */}
                    <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto w-full pt-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="enter-your-domain.com"
                                value={inputDomain}
                                onChange={(e) => setInputDomain(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-alert/50 focus:border-transparent font-mono text-sm"
                                aria-label="Enter your domain for statutory risk analysis"
                            />
                        </div>
                        <Button type="submit" variant="primary" size="lg" className="whitespace-nowrap px-8">
                            INITIATE FORENSIC SCAN
                        </Button>
                    </form>

                    {/* Friction Killers */}
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
                        <span className="flex items-center gap-2 text-xs text-txt-secondary">
                            <CheckCircle className="w-4 h-4 text-safe" />
                            100% Secure Connection
                        </span>
                        <span className="flex items-center gap-2 text-xs text-txt-secondary">
                            <Zap className="w-4 h-4 text-safe" />
                            50% IRS Subsidized
                        </span>
                        <span className="flex items-center gap-2 text-xs text-txt-secondary">
                            <FileText className="w-4 h-4 text-safe" />
                            No Credit Card Required
                        </span>
                    </div>

                    <p className="text-[10px] text-txt-secondary/50 font-mono pt-2">
                        *By scanning, you agree to our Terms of Forensic Service.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-black text-alert">1,422</div>
                            <div className="text-xs text-txt-secondary font-mono uppercase tracking-wider mt-2">
                                Lawsuits Dec 2025
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-white">$14,200</div>
                            <div className="text-xs text-txt-secondary font-mono uppercase tracking-wider mt-2">
                                Avg Settlement
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-white">92%</div>
                            <div className="text-xs text-txt-secondary font-mono uppercase tracking-wider mt-2">
                                Sites Exposed
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-safe">$148.50</div>
                            <div className="text-xs text-txt-secondary font-mono uppercase tracking-wider mt-2">
                                Net Shield Cost
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-surface/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
                            From Exposed to Protected in 3 Steps
                        </h2>
                        <p className="text-txt-secondary max-w-xl mx-auto">
                            Deploy your compliance layer in under 10 minutes. No developer required.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="relative p-6 bg-surface border border-white/10 rounded-xl">
                            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-alert flex items-center justify-center text-sm font-bold">
                                1
                            </div>
                            <h3 className="font-bold text-lg mb-3 mt-2">Run Forensic Scan</h3>
                            <p className="text-sm text-txt-secondary leading-relaxed">
                                Enter your domain. Our engine maps 50+ WCAG violation vectors in real-time,
                                identifying exactly what plaintiff bots will find.
                            </p>
                        </div>

                        <div className="relative p-6 bg-surface border border-white/10 rounded-xl">
                            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-alert flex items-center justify-center text-sm font-bold">
                                2
                            </div>
                            <h3 className="font-bold text-lg mb-3 mt-2">Authorize Shield</h3>
                            <p className="text-sm text-txt-secondary leading-relaxed">
                                Deploy the AI Remediation Layer with a single line of code.
                                Screen readers and bots instantly see a compliant interface.
                            </p>
                        </div>

                        <div className="relative p-6 bg-surface border border-white/10 rounded-xl">
                            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-alert flex items-center justify-center text-sm font-bold">
                                3
                            </div>
                            <h3 className="font-bold text-lg mb-3 mt-2">Claim Tax Credit</h3>
                            <p className="text-sm text-txt-secondary leading-relaxed">
                                File IRS Form 8826 with your pre-filled documentation.
                                The federal government effectively pays for 50% of your defense.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center p-12 bg-gradient-to-br from-alert/10 to-transparent border border-alert/20 rounded-2xl">
                        <Shield className="w-12 h-12 text-alert mx-auto mb-6" />
                        <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">
                            Every Hour You Wait is a Scan You Can&apos;t Stop
                        </h2>
                        <p className="text-txt-secondary mb-8 max-w-lg mx-auto">
                            Plaintiff bots don&apos;t negotiate. They don&apos;t warn. They simply file.
                            Run your audit now and know exactly where you stand.
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            Start Your Free Audit →
                        </Button>
                    </div>
                </div>
            </section>

            <ScannerOverlay />
        </div>
    );
}
