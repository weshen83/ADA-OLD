import { useRouter } from 'next/navigation';
import { useAuditStore } from '@/lib/store/audit-store';
import { z } from 'zod';
import { PublicAuditReport } from '@/types/audit';

const DomainSchema = z.string().min(3).regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

export const useForensicScan = () => {
    const router = useRouter();
    const { actions } = useAuditStore();
    const MIN_DURATION = 5200; // 5.2 seconds for Labor Illusion

    const executeScan = async (rawDomain: string) => {
        try {
            // 0. Validation & Sanitization
            const sanitized = rawDomain.replace(/<[^>]*>?/gm, '');
            const prevDomain = DomainSchema.parse(sanitized);

            actions.startScan(prevDomain);
            actions.setPhase('CONNECTING');

            // 1. Fetch from API (Real Backend Connection)
            const apiPromise = fetch('/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain: prevDomain }),
            }).then(res => {
                if (!res.ok) throw new Error('Scan API failed');
                return res.json();
            });

            // 2. Play the "Labor Illusion" Animation (Enforce 5.2s wait)
            const [apiResult] = await Promise.all([
                apiPromise,
                new Promise(r => setTimeout(r, MIN_DURATION))
            ]);

            if (!apiResult.success) {
                throw new Error(apiResult.error || 'Unknown scan error');
            }

            // 3. Complete
            actions.setReport(apiResult.data);
            actions.setPhase('COMPLETE');

            // 4. Navigate
            router.push(`/audit/${apiResult.data.domain}`);

        } catch (error) {
            console.error("Scan Failed:", error);
            actions.setPhase('IDLE');
            // Keep the alert for now, or move to a toast/state
            alert("Audit Protocol Failed: Host Unreachable or Invalid.");
        }
    };

    return { executeScan };
};
