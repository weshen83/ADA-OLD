'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { TerminalLog } from '@/components/atoms/TerminalLog';

const SCAN_LOGS = [
    "Establishing Secure Handshake...",
    "Piercing Shadow DOM architecture...",
    "Mapping ARIA-Landmark Tree (WCAG 2.2 AA)...",
    "Identifying Metadata Gaps in Image Assets...",
    "Testing Keyboard-Only Navigation Paths...",
    "Cross-referencing with 2025 Federal Precedents...",
    "Calculating Statutory Liability Exposure...",
    "Generating Forensic Report...",
];

export default function AuditLoading() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!barRef.current) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            barRef.current.style.width = '100%';
            return;
        }

        const tl = gsap.timeline({
            defaults: { ease: 'power2.out' }
        });

        tl.to(barRef.current, { width: '30%', duration: 0.8 })
            .to(barRef.current, { width: '45%', duration: 1.5, ease: 'linear' })
            .to(barRef.current, { width: '85%', duration: 0.6, ease: 'power4.out' })
            .to(barRef.current, { width: '92%', duration: 2.0, ease: 'none' })
            .to(barRef.current, { width: '100%', duration: 0.4, ease: 'expo.out' });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
            {/* Matrix/Grid Background Effect */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(18,18,18,0) 50%, rgba(0,0,0,0.25) 50%),
                        linear-gradient(90deg, rgba(255,0,0,0.06) 1px, transparent 1px),
                        linear-gradient(rgba(255,0,0,0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: '100% 2px, 20px 20px, 20px 20px',
                }}
            />

            <div className="w-full max-w-2xl space-y-8 relative z-10">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black tracking-tighter text-white animate-pulse">
                        INITIATING FORENSIC AUDIT
                    </h2>
                    <p className="font-mono text-terminal text-sm uppercase tracking-widest">
                        Deep Scan Protocol Active
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        ref={barRef}
                        className="h-full bg-alert w-0"
                        style={{
                            boxShadow: '0 0 20px #FF3333',
                        }}
                    />
                </div>

                {/* Terminal Component */}
                <TerminalLog logs={SCAN_LOGS} />

                {/* Disclaimer */}
                <p className="text-center text-xs text-txt-secondary">
                    Scanning in progress. Do not close this window.
                </p>
            </div>
        </div>
    );
}
