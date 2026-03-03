import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="pt-160 pb-120 bg-white min-h-screen">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-16 block">Trust & Legal</span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-64 text-primary leading-tight">Privacy <span className="text-accent italic">Policy</span></h1>

                    <div className="prose prose-lg max-w-none text-muted space-y-48">
                        <section className="bg-secondary/30 p-40 md:p-56 rounded-[3rem] border border-gray-100">
                            <h2 className="text-2xl font-bold text-primary mb-20 flex items-center gap-12">
                                <span className="w-32 h-32 bg-primary text-white rounded-full flex items-center justify-center text-xs">01</span>
                                Introduction
                            </h2>
                            <p className="leading-relaxed">
                                Shinewell NGO ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or donate to our cause.
                            </p>
                        </section>

                        <section className="p-40">
                            <h2 className="text-2xl font-bold text-primary mb-32 flex items-center gap-12">
                                <span className="w-32 h-32 bg-accent text-primary rounded-full flex items-center justify-center text-xs">02</span>
                                Information We Collect
                            </h2>
                            <p className="mb-24">We collect information that you provide directly to us, such as:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-16 list-none p-0">
                                {[
                                    "Personal identifiers (name, email, phone)",
                                    "Donation details & history",
                                    "Volunteer interests and skills",
                                    "Secure payment tokens (via Razorpay)"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-12 bg-white p-20 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="w-8 h-8 bg-accent rounded-full" />
                                        <span className="text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="bg-primary text-white p-40 md:p-64 rounded-[3.5rem] relative overflow-hidden">
                            <h2 className="text-2xl font-bold mb-24 relative z-10">3. Data Security Pledge</h2>
                            <p className="text-gray-400 leading-relaxed mb-0 relative z-10">
                                We implement industry-standard security measures to protect your data. All financial transactions are encrypted using SSL technology and processed by verified third-party payment gateways. Your trust is our most valuable asset.
                            </p>
                            <div className="absolute -bottom-24 -right-24 opacity-5">
                                <ShieldCheck size={200} />
                            </div>
                        </section>

                        <section className="p-40 border-l-4 border-accent">
                            <h2 className="text-2xl font-bold text-primary mb-20">Support & Inquiries</h2>
                            <p className="leading-relaxed mb-32">
                                If you have any questions about this Privacy Policy or how your data is handled, our legal team is here to assist.
                            </p>
                            <a href="mailto:privacy@shinewellngo.org" className="text-accent font-bold text-lg hover:underline">
                                privacy@shinewellngo.org
                            </a>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
