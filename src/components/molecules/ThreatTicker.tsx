'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { AlertTriangle, Scale, Search, Building2, TrendingDown } from 'lucide-react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

const ALERTS = [
    { icon: AlertTriangle, text: "INTEL: Federal Appeals Court (2nd Cir) affirms 'Nexus' for all US-facing domains." },
    { icon: Scale, text: "STATUTORY ALERT: California Unruh Act damages now $4,000 per 'Digital Barrier'." },
    { icon: Search, text: "FORENSIC DATA: 1,422 'Drive-By' Lawsuits filed in Dec 2025 against Shopify/WP SMBs." },
    { icon: Building2, text: "DOJ UPDATE: Title II Web Standards adopted as 'Universal Standard of Care' for Title III entities." },
    { icon: TrendingDown, text: "MARKET WATCH: Average 2025 ADA settlement: $14,200 (excludes defense retainers)." },
];

export const ThreatTicker = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        if (prefersReducedMotion) return;

        const content = contentRef.current;
        const contentWidth = content.scrollWidth / 2;

        gsap.to(content, {
            x: -contentWidth,
            duration: 40,
            ease: 'none',
            repeat: -1,
        });

        return () => {
            gsap.killTweensOf(content);
        };
    }, [prefersReducedMotion]);

    return (
        <div
            ref={containerRef}
            className="w-full bg-black border-b border-alert/20 overflow-hidden py-2"
            role="marquee"
            aria-label="Federal Litigation Intelligence Alerts"
        >
            <div ref={contentRef} className="flex whitespace-nowrap">
                {/* Double the content for seamless loop */}
                {[...ALERTS, ...ALERTS].map((alert, index) => {
                    const Icon = alert.icon;
                    return (
                        <div
                            key={index}
                            className="inline-flex items-center gap-2 mx-8 text-xs font-mono"
                        >
                            <Icon className="w-3 h-3 text-alert flex-shrink-0" />
                            <span className="text-alert/90 uppercase tracking-wider">
                                {alert.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
