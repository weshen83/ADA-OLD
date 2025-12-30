import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
            <div className="text-center max-w-md space-y-6">
                {/* 404 Display */}
                <div className="space-y-2">
                    <span className="text-8xl font-black text-white/10">404</span>
                    <h1 className="text-2xl font-black tracking-tighter">
                        Target Not Found
                    </h1>
                    <p className="text-txt-secondary text-sm leading-relaxed">
                        The requested resource has been moved, deleted, or never existed
                        in our system registry. Please verify your audit parameters.
                    </p>
                </div>

                {/* Terminal-style message */}
                <div className="p-4 bg-surface border border-white/10 rounded-lg text-left font-mono text-xs">
                    <p className="text-txt-secondary">
                        <span className="text-alert">ERROR:</span> Resource resolution failed
                    </p>
                    <p className="text-txt-secondary mt-1">
                        <span className="text-terminal">&gt;</span> Recommend: Return to primary interface
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/">
                        <Button variant="primary">
                            <Search className="w-4 h-4 mr-2" />
                            New Forensic Scan
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
