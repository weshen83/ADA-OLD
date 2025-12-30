'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSafeAuditStore } from '@/lib/store/audit-store';
import { RiskGauge } from '@/components/molecules/RiskGauge';
import { ViolationCard } from '@/components/molecules/ViolationCard';
import { Button } from '@/components/atoms/Button';
import { useScramble } from '@/lib/hooks/use-scramble';
import { Shield, FileText, Download, AlertTriangle, ExternalLink } from 'lucide-react';

export default function AuditResultPage() {
    const router = useRouter();
    const report = useSafeAuditStore(state => state.report);
    const unscrambleTitle = useScramble("CRITICAL VIOLATIONS DETECTED", true);

    // Persistence Check: If no report, redirect to home
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!report) router.push('/');
        }, 500);
        return () => clearTimeout(timer);
    }, [report, router]);

    if (!report) return null;

    // Calculate settlement range based on violations
    const minSettlement = report.summary.total_violations * 350;
    const maxSettlement = report.summary.total_violations * 600;

    return (
        <div className="min-h-screen bg-background">
            {/* Header Bar */}
            <div className="border-b border-white/5 bg-surface/50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase">
                                FORENSIC REPORT: {report.domain}
                            </h1>
                            <p className="font-mono text-xs text-terminal mt-1">
                                ID: {report.audit_id} | {new Date(report.timestamp).toLocaleString()}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="ghost" size="sm" onClick={() => window.print()}>
                                <Download className="w-4 h-4 mr-2" />
                                Export PDF
                            </Button>
                            <Button variant="primary" size="sm">
                                <Shield className="w-4 h-4 mr-2" />
                                Fix Violations Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Risk Score & Metrics */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Risk Gauge Card */}
                        <div className="bg-surface border border-white/5 rounded-xl p-6">
                            <h3 className="font-mono text-xs text-txt-secondary uppercase tracking-widest mb-6">
                                Litigation Probability
                            </h3>
                            <RiskGauge score={report.risk_score} size="md" />
                        </div>

                        {/* Quick Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-surface border border-white/5 p-4 rounded-lg">
                                <div className="text-2xl font-bold font-mono text-white">
                                    {report.metrics.missing_alts}
                                </div>
                                <div className="text-[10px] text-txt-secondary font-mono uppercase tracking-wider">
                                    Missing Alt Tags
                                </div>
                            </div>
                            <div className="bg-surface border border-white/5 p-4 rounded-lg">
                                <div className="text-2xl font-bold font-mono text-white">
                                    {report.metrics.landmark_errors}
                                </div>
                                <div className="text-[10px] text-txt-secondary font-mono uppercase tracking-wider">
                                    ARIA Errors
                                </div>
                            </div>
                            <div className="bg-surface border border-white/5 p-4 rounded-lg">
                                <div className="text-2xl font-bold font-mono text-white">
                                    {report.metrics.form_label_missing}
                                </div>
                                <div className="text-[10px] text-txt-secondary font-mono uppercase tracking-wider">
                                    Form Errors
                                </div>
                            </div>
                            <div className="bg-surface border border-white/5 p-4 rounded-lg">
                                <div className="text-2xl font-bold font-mono text-white">
                                    {report.metrics.shadow_dom_violations}
                                </div>
                                <div className="text-[10px] text-txt-secondary font-mono uppercase tracking-wider">
                                    Shadow DOM
                                </div>
                            </div>
                        </div>

                        {/* Financial Exposure */}
                        <div className="bg-surface border border-alert/20 rounded-xl p-6">
                            <h3 className="font-mono text-xs text-txt-secondary uppercase tracking-widest mb-4">
                                Statutory Exposure Model
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-txt-secondary">Settlement Range</span>
                                    <span className="font-mono font-bold text-alert">
                                        ${minSettlement.toLocaleString()} — ${maxSettlement.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-txt-secondary">Defense Retainer</span>
                                    <span className="font-mono text-white">$5,000+</span>
                                </div>
                                <div className="border-t border-white/10 pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-white">Total Exposure</span>
                                        <span className="font-mono font-bold text-alert text-lg">
                                            ${(minSettlement + 5000).toLocaleString()}+
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Violations & CTA */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Alert Card */}
                        <div className="bg-surface/50 border border-alert/20 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-alert/10 rounded-md">
                                    <AlertTriangle className="w-6 h-6 text-alert" />
                                </div>
                                <span
                                    ref={unscrambleTitle}
                                    className="font-bold text-lg text-white tracking-tight"
                                >
                                    CRITICAL VIOLATIONS DETECTED
                                </span>
                            </div>
                            <p className="text-txt-secondary text-sm leading-relaxed mb-4">
                                Our forensic engine identified{' '}
                                <strong className="text-white">{report.summary.total_violations} unique violations</strong>{' '}
                                that breach WCAG 2.1 Level AA standards. The primary threat detected was:{' '}
                                <span className="text-alert font-mono">{report.summary.top_threat}</span>.
                            </p>

                            {/* IRS Credit Box */}
                            <div className="p-4 bg-black border border-dashed border-white/20 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <div className="text-xs text-txt-secondary font-mono uppercase">
                                        IRS Tax Credit Eligibility
                                    </div>
                                    <div className="text-xl font-bold text-safe">
                                        ${report.summary.irs_credit_value.toFixed(2)}
                                    </div>
                                </div>
                                <a
                                    href="https://www.irs.gov/forms-pubs/about-form-8826"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="terminal" size="sm">
                                        View Form 8826 <ExternalLink className="w-3 h-3 ml-2" />
                                    </Button>
                                </a>
                            </div>
                        </div>

                        {/* Violation Cards */}
                        <div className="space-y-4">
                            <h3 className="font-mono text-xs text-txt-secondary uppercase tracking-widest">
                                Violation Breakdown
                            </h3>

                            {report.metrics.missing_alts > 0 && (
                                <ViolationCard
                                    title="Non-Text Content"
                                    wcagRef="WCAG 1.1.1"
                                    status="CRITICAL"
                                    count={report.metrics.missing_alts}
                                    description="Missing metadata on images allows plaintiffs to prove 'Intentional Exclusion'. This is cited in 82% of demand letters."
                                />
                            )}

                            {report.metrics.landmark_errors > 0 && (
                                <ViolationCard
                                    title="Semantic Navigation"
                                    wcagRef="WCAG 2.4.1"
                                    status="FAIL"
                                    count={report.metrics.landmark_errors}
                                    description="Your site lacks ARIA landmarks. This is the 'Digital Equivalent' of locking the front door for people with disabilities."
                                />
                            )}

                            {report.metrics.form_label_missing > 0 && (
                                <ViolationCard
                                    title="Form Input Labels"
                                    wcagRef="WCAG 1.3.1"
                                    status="FAIL"
                                    count={report.metrics.form_label_missing}
                                    description="Form inputs without proper labels prevent screen reader users from understanding what information to enter."
                                />
                            )}

                            {report.metrics.deceptive_alts > 0 && (
                                <ViolationCard
                                    title="Deceptive Alt Text"
                                    wcagRef="WCAG 1.1.1"
                                    status="WARNING"
                                    count={report.metrics.deceptive_alts}
                                    description="Alt text that equals the filename (e.g., 'IMG_5502.jpg') is considered 'Automated Failure' in federal court."
                                />
                            )}

                            {report.metrics.shadow_dom_violations > 0 && (
                                <ViolationCard
                                    title="Shadow DOM Accessibility"
                                    wcagRef="WCAG 4.1.2"
                                    status="FAIL"
                                    count={report.metrics.shadow_dom_violations}
                                    description="Components hidden in Shadow DOM are inaccessible to assistive technologies without proper ARIA forwarding."
                                />
                            )}
                        </div>

                        {/* Final CTA */}
                        <div className="p-8 border border-glass rounded-xl bg-gradient-to-br from-white/5 to-transparent text-center space-y-6">
                            <Shield className="w-10 h-10 text-alert mx-auto" />
                            <h4 className="text-xl font-bold text-white">Protect Your Organization</h4>
                            <p className="text-sm text-txt-secondary max-w-md mx-auto">
                                Deploy the ADA Shield immediately to mitigate liability.
                                Installation takes 2 minutes and provides instant safe harbor documentation.
                            </p>
                            <Button className="px-12">
                                ACTIVATE SHIELD ($297)
                            </Button>
                            <p className="text-[10px] text-txt-secondary/50">
                                *Net cost $148.50 after IRS Section 44 credit. Includes 12-month indemnification log.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
