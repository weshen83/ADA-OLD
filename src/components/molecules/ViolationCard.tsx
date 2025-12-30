'use client';

import { AlertTriangle, ChevronRight } from 'lucide-react';

interface ViolationCardProps {
    title: string;
    wcagRef: string;
    status: 'CRITICAL' | 'FAIL' | 'WARNING' | 'PASS';
    count?: number;
    description: string;
}

export const ViolationCard = ({
    title,
    wcagRef,
    status,
    count,
    description,
}: ViolationCardProps) => {
    const statusStyles = {
        CRITICAL: {
            bg: 'bg-alert/10',
            border: 'border-alert/30',
            badge: 'bg-alert text-white',
            icon: 'text-alert',
        },
        FAIL: {
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/30',
            badge: 'bg-orange-500 text-white',
            icon: 'text-orange-500',
        },
        WARNING: {
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/30',
            badge: 'bg-yellow-500 text-black',
            icon: 'text-yellow-500',
        },
        PASS: {
            bg: 'bg-safe/10',
            border: 'border-safe/30',
            badge: 'bg-safe text-white',
            icon: 'text-safe',
        },
    };

    const style = statusStyles[status];

    return (
        <div
            className={`${style.bg} ${style.border} border rounded-lg p-4 transition-all hover:scale-[1.02] cursor-pointer group`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-md ${style.bg}`}>
                        <AlertTriangle className={`w-4 h-4 ${style.icon}`} />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white text-sm">{title}</h4>
                            <span className="text-[10px] font-mono text-txt-secondary uppercase">
                                ({wcagRef})
                            </span>
                        </div>
                        <p className="text-xs text-txt-secondary leading-relaxed max-w-md">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {count !== undefined && (
                        <div className="text-right">
                            <div className="text-lg font-bold font-mono text-white">{count}</div>
                            <div className="text-[10px] text-txt-secondary uppercase">instances</div>
                        </div>
                    )}
                    <span
                        className={`${style.badge} px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider`}
                    >
                        {status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-txt-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </div>
    );
};
