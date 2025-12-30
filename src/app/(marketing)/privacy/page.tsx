import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | ADA Legal Shield',
    description: 'Privacy Policy and Data Governance for ADA Legal Shield.',
};

export default function PrivacyPage() {
    return (
        <div className="py-24">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-black tracking-tighter mb-8">Privacy Policy</h1>
                <p className="text-txt-secondary mb-8">
                    Last Updated: December 29, 2025
                </p>

                <div className="prose prose-invert prose-sm max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-bold mb-4">1. Data Collection</h2>
                        <p className="text-txt-secondary leading-relaxed">
                            ADA Legal Shield collects minimal data required to provide our forensic audit
                            and remediation services. This includes:
                        </p>
                        <ul className="list-disc list-inside text-txt-secondary mt-4 space-y-2">
                            <li>Domain URLs submitted for analysis</li>
                            <li>Contact information provided during checkout</li>
                            <li>Payment information (processed securely via Stripe)</li>
                            <li>Technical audit results and violation metrics</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4">2. US-Only Service</h2>
                        <p className="text-txt-secondary leading-relaxed">
                            ADA Legal Shield operates exclusively within the United States. We utilize
                            geo-fencing technology to restrict access from non-US regions. This is because
                            our services are specifically designed around US federal ADA law and IRS
                            Section 44 tax credits, which are not applicable internationally.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4">3. California Privacy Rights (CCPA/CPRA)</h2>
                        <p className="text-txt-secondary leading-relaxed">
                            California residents have the right to:
                        </p>
                        <ul className="list-disc list-inside text-txt-secondary mt-4 space-y-2">
                            <li>Know what personal information we collect</li>
                            <li>Delete personal information we hold</li>
                            <li>Opt-out of the sale of personal information</li>
                            <li>Non-discrimination for exercising these rights</li>
                        </ul>
                        <p className="text-txt-secondary leading-relaxed mt-4">
                            We honor the Global Privacy Control (GPC) browser signal. When detected,
                            we automatically disable non-essential tracking.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4">4. Data Retention</h2>
                        <p className="text-txt-secondary leading-relaxed">
                            Forensic audit data is retained for 12 months to support compliance documentation
                            and potential legal defense purposes. Uncontacted lead data is automatically
                            purged after 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4">5. Third-Party Services</h2>
                        <p className="text-txt-secondary leading-relaxed">
                            We utilize the following third-party services:
                        </p>
                        <ul className="list-disc list-inside text-txt-secondary mt-4 space-y-2">
                            <li>Stripe (payment processing)</li>
                            <li>Vercel (website hosting)</li>
                            <li>Resend (transactional email)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4">6. Contact</h2>
                        <p className="text-txt-secondary leading-relaxed">
                            For privacy-related inquiries or data deletion requests, contact us at:{' '}
                            <a href="mailto:privacy@adashield.com" className="text-alert hover:underline">
                                privacy@adashield.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
