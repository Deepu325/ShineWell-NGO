import React from 'react';

const Terms = () => {
    return (
        <div className="pt-120 pb-120 bg-white">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-48">Terms of Service</h1>

                <div className="prose prose-lg max-w-none text-muted space-y-32">
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-16">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations in India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-16">2. Donations</h2>
                        <p>
                            All donations made through our website are voluntary and non-refundable unless specified otherwise under extreme circumstances (e.g., duplicate technical errors). Donations are eligible for tax deduction under Section 80G of the Income Tax Act.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-16">3. Use of Content</h2>
                        <p>
                            The content on this website, including text, images, and reports, are the property of Shine Well NGO. You may use this information for personal, non-commercial purposes only, provided you give due credit to the organization.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-16">4. Limitation of Liability</h2>
                        <p>
                            Shine Well NGO shall not be liable for any damages arising out of the use or inability to use the materials on this website. We make no warranties regarding the accuracy or completeness of the content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-16">5. Governing Law</h2>
                        <p>
                            These terms are governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Delhi.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
