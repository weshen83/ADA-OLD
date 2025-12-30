'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface RiskGaugeProps {
    score: number; // 0.0 to 10.0
    size?: 'sm' | 'md' | 'lg';
}

export const RiskGauge = ({ score, size = 'md' }: RiskGaugeProps) => {
    const needleRef = useRef<HTMLDivElement>(null);
    const scoreRef = useRef<HTMLSpanElement>(null);

    const sizes = {
        sm: { width: 120, height: 60 },
        md: { width: 192, height: 96 },
        lg: { width: 256, height: 128 },
    };

    const { width, height } = sizes[size];

    useEffect(() => {
        if (!needleRef.current || !scoreRef.current) return;

        // Animate needle from -90 (left) to target rotation
        // -90 = 0, 0 = 5, 90 = 10
        const targetRotation = -90 + (score / 10) * 180;

        gsap.fromTo(
            needleRef.current,
            { rotation: -90 },
            {
                rotation: targetRotation,
                duration: 2.5,
                ease: 'elastic.out(1, 0.4)',
                transformOrigin: 'bottom center',
                delay: 0.3,
            }
        );

        // Animate score counter
        const obj = { val: 0 };
        gsap.to(obj, {
            val: score,
            duration: 2,
            ease: 'power4.out',
            onUpdate: () => {
                if (scoreRef.current) {
                    scoreRef.current.innerText = obj.val.toFixed(1);
                }
            },
        });
    }, [score]);

    // Determine color based on score
    const getColor = (s: number) => {
        if (s >= 8) return '#FF3333'; // Critical
        if (s >= 5) return '#F97316'; // High
        if (s >= 3) return '#EAB308'; // Moderate
        return '#22C55E'; // Low
    };

    const color = getColor(score);

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Gauge Arc */}
            <div
                className="relative overflow-hidden"
                style={{ width, height }}
            >
                {/* Background Arc */}
                <div
                    className="absolute inset-0 rounded-t-full border-t-4 border-l-4 border-r-4 border-white/10"
                />

                {/* Gradient zones */}
                <svg
                    className="absolute inset-0"
                    viewBox={`0 0 ${width} ${height}`}
                    style={{ width, height }}
                >
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
                            <stop offset="30%" stopColor="#EAB308" stopOpacity="0.3" />
                            <stop offset="60%" stopColor="#F97316" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#FF3333" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                    <path
                        d={`M 0 ${height} A ${width / 2} ${height} 0 0 1 ${width} ${height}`}
                        fill="url(#gaugeGradient)"
                    />
                </svg>

                {/* Needle */}
                <div
                    ref={needleRef}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom"
                    style={{
                        width: 4,
                        height: height - 8,
                        background: `linear-gradient(to top, ${color}, ${color}80)`,
                        borderRadius: 2,
                        boxShadow: `0 0 10px ${color}`,
                        transform: 'rotate(-90deg)',
                    }}
                />

                {/* Center pin */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-surface"
                />
            </div>

            {/* Score Display */}
            <div className="text-center">
                <span
                    ref={scoreRef}
                    className="text-4xl font-black tabular-nums"
                    style={{ color }}
                >
                    0.0
                </span>
                <span className="text-sm text-txt-secondary ml-1">/ 10.0</span>
            </div>
        </div>
    );
};
