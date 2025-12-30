'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { FileText, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export const ExitIntentPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenShown, setHasBeenShown] = useState(false);

    useEffect(() => {
        // Only run on desktop
        if (window.innerWidth < 768) return;

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasBeenShown && !localStorage.getItem('ada-shield-exit-dismissed')) {
                setIsVisible(true);
                setHasBeenShown(true);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasBeenShown]);

    useGSAP(() => {
        if (isVisible) {
            gsap.fromTo("#exit-popup-overlay",
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
            gsap.fromTo("#exit-popup-content",
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.1 }
            );
        }
    }, [isVisible]);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('ada-shield-exit-dismissed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div
            id="exit-popup-overlay"
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
            <div
                id="exit-popup-content"
                className="w-full max-w-lg bg-surface border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-white/50 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative text-center space-y-6">
                    <div className="inline-flex p-4 rounded-full bg-safe/10 text-safe mb-2">
                        <FileText className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-black tracking-tighter uppercase">
                            Liability Pause Protocol
                        </h2>
                        <p className="text-txt-secondary text-sm leading-relaxed px-4">
                            Before you leave, download the official IRS Form 8826 Guide.
                            Understand exactly how Section 44 covers 50% of your compliance costs.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-left p-4 bg-black/50 rounded-lg border border-white/5 text-xs font-mono text-txt-secondary">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-safe" />
                            <span>PDF Format</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-safe" />
                            <span>IRS Direct Verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-safe" />
                            <span>Updated for 2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-safe" />
                            <span>Free Download</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button variant="primary" size="lg" className="w-full justify-center">
                            Download Safe Harbor Kit
                        </Button>
                        <button
                            onClick={handleDismiss}
                            className="text-xs text-txt-secondary hover:text-white uppercase tracking-wider font-mono py-2"
                        >
                            Decline Protection & Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
