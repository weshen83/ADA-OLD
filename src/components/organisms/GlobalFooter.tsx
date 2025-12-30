import Link from 'next/link';
import { Shield, ExternalLink } from 'lucide-react';

export const GlobalFooter = () => {
    return (
        <footer className="border-t border-white/5 bg-black mt-20">
            {/* Legal Disclaimer Banner */}
            <div className="border-b border-white/5 py-4 bg-surface/50">
                <div className="container mx-auto px-4">
                    <p className="text-[10px] text-txt-secondary leading-relaxed max-w-4xl">
                        <span className="font-bold text-white uppercase tracking-wider">REGULATORY DISCLOSURE:</span>{' '}
                        ADA Legal Shield is a technical systems architecture firm. We provide forensic remediation layers
                        designed to WCAG 2.2 AA standards. We are not a law firm. This platform provides technical risk
                        mitigation, not legal advice. Forensic audit scores are point-in-time diagnostic snapshots and
                        do not constitute a legal guarantee of immunity. Consult with a qualified attorney regarding
                        specific legal threats or demand letters.
                    </p>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-alert" />
                            <span className="font-bold tracking-tight text-lg">ADA SHIELD</span>
                        </Link>
                        <p className="text-xs text-txt-secondary max-w-[220px] leading-relaxed">
                            Forensic automated compliance auditing for high-revenue digital infrastructure.
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="px-2 py-1 text-[9px] font-mono bg-white/5 border border-white/10 rounded uppercase tracking-wider text-txt-secondary">
                                WCAG 2.2 AA
                            </span>
                            <span className="px-2 py-1 text-[9px] font-mono bg-white/5 border border-white/10 rounded uppercase tracking-wider text-txt-secondary">
                                IRS SEC 44
                            </span>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="font-mono text-xs text-txt-secondary uppercase tracking-widest mb-4">
                            Platform
                        </h4>
                        <ul className="space-y-2 text-sm text-txt-secondary">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    Forensic Audit
                                </Link>
                            </li>
                            <li>
                                <Link href="/methodology" className="hover:text-white transition-colors">
                                    Methodology
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-white transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-mono text-xs text-txt-secondary uppercase tracking-widest mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-2 text-sm text-txt-secondary">
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/accessibility" className="hover:text-white transition-colors">
                                    Accessibility Statement
                                </Link>
                            </li>
                            <li>
                                <button className="hover:text-white transition-colors text-left">
                                    Do Not Sell My Info
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Resources & Status */}
                    <div>
                        <h4 className="font-mono text-xs text-txt-secondary uppercase tracking-widest mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2 text-sm text-txt-secondary">
                            <li>
                                <a
                                    href="https://www.irs.gov/forms-pubs/about-form-8826"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    IRS Form 8826 <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.ada.gov"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    ADA.gov <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                        </ul>

                        {/* System Status */}
                        <div className="mt-6 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-safe animate-pulse" />
                                <span className="text-xs font-mono text-safe uppercase tracking-wider">
                                    System Operational
                                </span>
                            </div>
                            <span className="text-[10px] text-txt-secondary font-mono mt-1 block">
                                v1.0.0-beta | Dec 2025
                            </span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-txt-secondary">
                        © {new Date().getFullYear()} ADA Legal Shield. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
