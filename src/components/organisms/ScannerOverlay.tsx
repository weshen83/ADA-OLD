'use client';

import { useRef, useEffect } from 'react';
import { useSafeAuditStore } from '@/lib/store/audit-store';
import { TerminalLog } from '@/components/atoms/TerminalLog';
import { runDeepScanSequence } from '@/lib/animations/scan-sequence';

export const ScannerOverlay = () => {
    // Safe hydration to prevent mismatch
    const phase = useSafeAuditStore(state => state.phase);
    const domain = useSafeAuditStore(state => state.domain);
    const barRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (phase === 'CONNECTING' && containerRef.current) {
            // Sound effect placeholder
            const playSound = () => {
                // console.log('Playing sound:', id); 
            };

            const tl = runDeepScanSequence(barRef, () => {
                // Animation Complete
            }, playSound);

            return () => {
                tl.kill();
            };
        }
    }, [phase]);

    if (phase !== 'CONNECTING' && phase !== 'ANALYZING' && phase !== 'COMPILING') return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
            {/* Matrix / Grid Background Effect could go here */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06)_1px,transparent_1px),linear-gradient(rgba(255,0,0,0.06)_1px,transparent_1px)] bg-[length:100%_2px,20px_20px,20px_20px] pointer-events-none" />

            <div className="w-full max-w-2xl space-y-8 relative z-10">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black tracking-tighter text-white animate-pulse">
                        INITIATING FORENSIC AUDIT
                    </h2>
                    <p className="font-mono text-terminal text-sm uppercase tracking-widest">
                        TARGET: {domain}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        ref={barRef}
                        className="h-full bg-alert w-0 shadow-[0_0_20px_#FF3333]"
                    />
                </div>

                {/* Terminal Component */}
                <TerminalLog logs={[
                    "Resolving DNS via Proxy Pool...",
                    "Bypassing WAF (Cloudflare)...",
                    "Injecting Headless Browser Agent...",
                    "Analyzing DOM Structure (Depth: 5)...",
                    "Scanning for 'UserWay' Widget signatures...",
                    "Calculating Layout Shift (CLS)...",
                    "Checking Contrast Ratios (WCAG 2.1 AA)...",
                    "Compiling Forensic Report...",
                    "Finalizing Evidence Package..."
                ]} />
            </div>
        </div>
    );
};
