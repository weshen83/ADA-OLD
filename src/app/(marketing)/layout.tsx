'use client';

import { GlobalHeader } from '@/components/organisms/GlobalHeader';
import { GlobalFooter } from '@/components/organisms/GlobalFooter';
import { ThreatTicker } from '@/components/molecules/ThreatTicker';
import { PrivacyConsentBanner } from '@/components/molecules/PrivacyConsentBanner';
import { ExitIntentPopup } from '@/components/molecules/ExitIntentPopup';

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* ThreatTicker is fixed at the very top */}
            <div className="fixed top-0 left-0 right-0 z-[60]">
                <ThreatTicker />
            </div>
            {/* Header sits below the ticker (ticker is ~36px) */}
            <div className="fixed top-9 left-0 right-0 z-50">
                <GlobalHeader />
            </div>
            {/* Main content starts after ticker + header (~100px total) */}
            <main className="flex-1 pt-[100px]">
                {children}
            </main>
            <GlobalFooter />

            <PrivacyConsentBanner />
            <ExitIntentPopup />
        </div>
    );
}
