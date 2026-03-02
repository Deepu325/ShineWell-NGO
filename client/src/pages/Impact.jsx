import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Users, Download, ExternalLink, Globe2, Award, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const Impact = () => {
    const corePillars = [
        { value: '92%', label: 'Efficiency Ratio', desc: 'Industry-leading allocation towards core program execution.', icon: <Zap size={32} /> },
        { value: '₹4.5Cr+', label: 'Annual Uplift', desc: 'Direct economic value generated within rural communities.', icon: <TrendingUp size={32} /> },
        { value: '250k', label: 'Voices Empowered', desc: 'Individuals who transitioned from aid to sustainable independence.', icon: <Globe2 size={32} /> },
    ];

    const allocation = [
        { label: 'Primary Education & Materials', value: '45%', color: 'border-primary' },
        { label: 'Healthcare & Critical Supplies', value: '25%', color: 'border-accent' },
        { label: 'Livelihood & Vocational Training', value: '15%', color: 'border-indigo-600' },
        { label: 'Climate Action & Clean Water', value: '7%', color: 'border-emerald-500' },
        { label: 'Governance & Stewardship', value: '8%', color: 'border-slate-400' },
    ];

    return (
        <div className="bg-white">
            <PageHero
                badge="Radical Transparency"
                title="Data That"
                titleAccent="Validates"
                description="True impact isn't accidental—it's engineered. Here is how your generosity is transformed into life-changing reality."
                image="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            />

            {/* Core Impact Pillars */}
            <section className="layout-section">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {corePillars.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 lg:p-16 text-center rounded-card shadow-card flex flex-col items-center group hover:shadow-floating transition-shadow duration-500"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary text-accent rounded-2xl mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl lg:text-5xl font-heading font-bold mb-2 text-primary tracking-tight">{stat.value}</h3>
                                <p className="text-accent font-bold uppercase tracking-widest text-sm mb-4">{stat.label}</p>
                                <p className="text-muted leading-relaxed">{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Financial Allocation */}
            <section className="layout-section bg-secondary/20">
                <div className="container-custom grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div>
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Fiscal Responsibility</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-primary leading-tight">Every Rupee Finds its <span className="text-accent italic font-bold">Purpose</span></h2>

                        <div className="space-y-6">
                            {allocation.map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-card border border-border shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full bg-current ${item.color.replace('border', 'text')}`}></div>
                                        <span className="font-bold text-primary">{item.label}</span>
                                    </div>
                                    <span className="text-xl font-bold text-accent">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-10 lg:p-16 rounded-panel shadow-elevated border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center text-accent mb-8">
                            <Award size={40} />
                        </div>
                        <h3 className="text-2xl font-heading font-bold mb-4">Uncompromising Audit Standards</h3>
                        <p className="text-muted lg:text-lg mb-12 leading-relaxed">
                            We uphold the highest levels of governance with quarterly internal audits and annual external reviews by top-tier firms. Annual financial audits are available for public review.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button className="btn-primary w-full sm:w-auto">
                                Download 2024 Report <Download size={18} className="ml-2" />
                            </button>
                            <button className="btn-outline w-full sm:w-auto">
                                Archive Reports <PieChart size={18} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visionary CTA */}
            <section className="layout-section pb-32">
                <div className="container-custom">
                    <div className="bg-primary text-white rounded-panel p-12 lg:p-24 text-center relative overflow-hidden flex flex-col items-center shadow-hero">
                        <div className="relative z-10 max-w-4xl">
                            <span className="text-accent font-bold tracking-[0.5em] uppercase text-xs mb-8 block">Beyond Data</span>
                            <h2 className="text-4xl md:text-7xl font-heading font-bold mb-8 leading-tight">Beyond the <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">Spreadsheets.</span></h2>
                            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                                Numbers quantify our work, but the true impact is seen in the eyes of a child who can finally read, or a mother who can afford her medicines.
                            </p>
                            <Link to="/blog" className="btn-accent btn-lg w-fit mx-auto shadow-2xl shadow-accent/20">
                                Explore Human Stories <ExternalLink size={20} className="ml-2" />
                            </Link>
                        </div>
                        {/* Decorative mark */}
                        <Users size={600} className="absolute -bottom-32 -right-32 opacity-5 pointer-events-none" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Impact;
