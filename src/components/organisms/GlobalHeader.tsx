'use client';

import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const GlobalHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full border-b border-white/5 bg-background/90 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-alert" />
                    <span className="font-bold tracking-tight text-lg">ADA SHIELD</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 text-sm">
                    <Link
                        href="/methodology"
                        className="text-txt-secondary hover:text-white transition-colors"
                    >
                        Methodology
                    </Link>
                    <Link
                        href="/pricing"
                        className="text-txt-secondary hover:text-white transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/about"
                        className="text-txt-secondary hover:text-white transition-colors"
                    >
                        About
                    </Link>
                </nav>

                {/* Desktop CTAs */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                        Talk to an Architect
                    </Button>
                    <Button variant="primary" size="sm">
                        Start Free Audit
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-txt-secondary hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-lg">
                    <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <Link
                            href="/methodology"
                            className="text-txt-secondary hover:text-white transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Methodology
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-txt-secondary hover:text-white transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className="text-txt-secondary hover:text-white transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                            <Button variant="ghost" size="md" className="w-full justify-center">
                                Talk to an Architect
                            </Button>
                            <Button variant="primary" size="md" className="w-full justify-center">
                                Start Free Audit
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};
