'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Shield, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Link from 'next/link';

export const PrivacyConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        // Check local storage
        const hasConsented = localStorage.getItem('ada-shield-consent');

        // Check GPC (Global Privacy Control)
        const gpc = (navigator as any).globalPrivacyControl;

        if (!hasConsented && !gpc) {
            // Delay showing by 2 seconds
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    useGSAP(() => {
        if (isVisible && !isLeaving) {
            gsap.fromTo("#privacy-banner",
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [isVisible]);

    const handleAccept = (level: 'essentials' | 'full') => {
        localStorage.setItem('ada-shield-consent', level);
        setIsLeaving(true);

        gsap.to("#privacy-banner", {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => setIsVisible(false)
        });
    };

    if (!isVisible) return null;

    return (
        <div
            id="privacy-banner"
            className="fixed bottom-0 left-0 right-0 z-[200] p-4 flex justify-center pointer-events-none"
        >
            <div className="w-full max-w-4xl bg-surface/90 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl pointer-events-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-alert/10 rounded-lg hidden sm:block">
                            <Shield className="w-6 h-6 text-alert" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white text-sm">Review Protocol Alert</h3>
                                <span className="text-[10px] font-mono text-txt-secondary uppercase border border-white/10 px-1 rounded">
                                    Data Governance
                                </span>
                            </div>
                            <p className="text-xs text-txt-secondary leading-relaxed max-w-xl">
                                This forensic interface uses secure telemetry to analyze domain liability.
                                We conform to CCPA/CPRA standards.
                                <span className="hidden sm:inline"> Confirm protocol acceptance to proceed or restricted functionality will apply.</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAccept('essentials')}
                            className="whitespace-nowrap"
                        >
                            Essentials Only
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleAccept('full')}
                            className="whitespace-nowrap"
                        >
                            Accept Telemetry
                        </Button>
                    </div>
                </div>

                <div className="absolute top-2 right-2 md:hidden">
                    <button onClick={() => handleAccept('essentials')} className="text-white/50 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
