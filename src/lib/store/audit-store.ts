import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PublicAuditReport } from '@/types/audit';
import { useEffect, useState } from 'react';

type AuditPhase = 'IDLE' | 'CONNECTING' | 'ANALYZING' | 'COMPILING' | 'COMPLETE';

interface AuditState {
    domain: string | null;
    phase: AuditPhase;
    progress: number;
    report: PublicAuditReport | null;

    actions: {
        startScan: (domain: string) => void;
        setPhase: (phase: AuditPhase) => void;
        setProgress: (progress: number) => void; // Added for granular control
        setReport: (data: PublicAuditReport) => void;
        reset: () => void;
    };
}

export const useAuditStore = create<AuditState>()(
    persist(
        (set) => ({
            domain: null,
            phase: 'IDLE',
            progress: 0,
            report: null,

            actions: {
                startScan: (domain) => set({ domain, phase: 'IDLE', progress: 0, report: null }),
                setPhase: (phase) => set({ phase }),
                setProgress: (progress) => set({ progress }),
                setReport: (report) => set({ report }),
                reset: () => set({ domain: null, phase: 'IDLE', progress: 0, report: null }),
            },
        }),
        {
            name: 'audit-session',
            partialize: (state) => ({
                domain: state.domain,
                report: state.report,
                phase: state.phase === 'COMPLETE' ? 'COMPLETE' : 'IDLE' // Only persist if complete, else reset
            }),
        }
    )
);

// Safe Hydration Wrapper
export const useSafeAuditStore = <T>(selector: (state: AuditState) => T): T | undefined => {
    const [data, setData] = useState<T>();
    const result = useAuditStore(selector);

    useEffect(() => {
        setData(result);
    }, [result]);

    return data;
};
