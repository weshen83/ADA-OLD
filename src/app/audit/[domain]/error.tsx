'use client';

import { useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AuditError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Audit Error:', error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-md space-y-6">
                {/* Error Icon */}
                <div className="w-16 h-16 rounded-xl bg-alert/10 border border-alert/30 flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-8 h-8 text-alert" />
                </div>

                {/* Error Message */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-black tracking-tighter">
                        Audit Protocol Interrupted
                    </h1>
                    <p className="text-txt-secondary text-sm leading-relaxed">
                        Remote host latency exceeded threshold. This may be caused by
                        target firewall interference or temporary network congestion.
                    </p>
                </div>

                {/* Error Details (if available) */}
                {error.digest && (
                    <div className="p-3 bg-surface border border-white/10 rounded-lg">
                        <p className="font-mono text-xs text-txt-secondary">
                            Reference: <span className="text-alert">{error.digest}</span>
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={reset} variant="primary">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry Scan
                    </Button>
                    <Link href="/">
                        <Button variant="ghost">
                            Return to Command Center
                        </Button>
                    </Link>
                </div>

                {/* Technical Note */}
                <p className="text-[10px] text-txt-secondary font-mono uppercase tracking-wider">
                    If this persists, the target may be employing active countermeasures.
                </p>
            </div>
        </div>
    );
}
