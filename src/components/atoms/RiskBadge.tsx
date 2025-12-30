'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { animateRiskScore } from '@/lib/animations/score-counter';

interface RiskBadgeProps {
    score: number; // 0.0 to 10.0
}

export const RiskBadge = ({ score }: RiskBadgeProps) => {
    const scoreRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (scoreRef.current && containerRef.current) {
            animateRiskScore(scoreRef.current, score);
        }
    }, { scope: containerRef, dependencies: [score] });

    return (
        <div
            ref={containerRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm"
        >
            <div className="w-2 h-2 rounded-full bg-alert animate-pulse" />
            <span className="text-xs font-mono text-txt-secondary uppercase tracking-wider">Risk Level</span>
            <span ref={scoreRef} className="text-sm font-mono font-bold text-white min-w-[3ch] text-right">
                0.0
            </span>
        </div>
    );
};
