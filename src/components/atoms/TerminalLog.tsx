'use client';

import { useEffect, useState } from 'react';

interface TerminalLogProps {
    logs: string[];
}

export const TerminalLog = ({ logs }: TerminalLogProps) => {
    const [displayLogs, setDisplayLogs] = useState<string[]>([]);

    useEffect(() => {
        if (logs.length === 0) return;

        // Simulate real-time logging
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < logs.length) {
                setDisplayLogs(prev => [...prev, logs[currentIndex]]);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 800); // 800ms delay between log entries

        return () => clearInterval(interval);
    }, [logs]);

    return (
        <div className="font-mono text-xs text-terminal/80 space-y-1 p-4 bg-black/80 border border-terminal/20 rounded-md overflow-hidden">
            {displayLogs.map((log, i) => (
                <div key={i} className="flex gap-2">
                    <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
                    <span>{`> ${log}`}</span>
                </div>
            ))}
            <div className="animate-pulse">_</div>
        </div>
    );
};
