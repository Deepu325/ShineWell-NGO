import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Award, Heart, CheckCircle, Quote } from 'lucide-react';
import PageHero from '../components/PageHero';

const About = () => {
    const values = [
        { title: 'Integrity', desc: 'Honesty in every action and transparency in every rupee.', icon: <ShieldCheck size={28} /> },
        { title: 'Empathy', desc: 'Understanding the lived experiences of those we serve.', icon: <Heart size={28} /> },
        { title: 'Impact', desc: 'Focusing on measurable results rather than just activities.', icon: <Award size={28} /> },
        { title: 'Collaboration', desc: 'Building partnerships that amplify our collective reach.', icon: <Users size={28} /> },
    ];

    return (
        <div className="bg-white">
            <PageHero
                badge="Our Journey"
                title="A Decade of"
                titleAccent="Dignity"
                description="Founded in 2014, Shinewell NGO has evolved from a small community initiative to a nationwide movement dedicated to empowering the marginalized."
                image="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            />

            {/* Mission & Vision Section */}
            <section className="layout-section">
                <div className="container-custom grid md:grid-cols-2 gap-8 lg:gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 lg:p-16 rounded-card border-l-4 border-primary shadow-card flex flex-col items-start group"
                    >
                        <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <Target size={32} />
                        </div>
                        <h2 className="text-3xl font-heading font-bold mb-6">Our Mission</h2>
                        <p className="text-muted text-lg leading-relaxed">
                            To provide underprivileged communities with access to essential needs including education, healthcare, and livelihood opportunities, enabling them to lead a life of dignity and self-reliance.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 lg:p-16 rounded-card border-l-4 border-accent shadow-card flex flex-col items-start group"
                    >
                        <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                            <Users size={32} />
                        </div>
                        <h2 className="text-3xl font-heading font-bold mb-6">Our Vision</h2>
                        <p className="text-muted text-lg leading-relaxed">
                            A world where every individual, regardless of their background, has the resources and support to reach their full potential and contribute to a just and equitable society.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="layout-section bg-secondary/30">
                <div className="container-custom grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Our Founder"
                            className="rounded-panel w-full aspect-[4/5] object-cover shadow-elevated"
                        />
                        <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-card shadow-floating max-w-xs border border-gray-100 hidden sm:block">
                            <Quote size={32} className="text-accent mb-4 opacity-50" />
                            <p className="text-primary font-medium italic mb-4">"Change doesn't happen by chance, it happens by choice."</p>
                            <p className="text-xs font-bold text-accent uppercase tracking-widest">— Dr. Aradhana Sharma</p>
                        </div>
                    </div>

                    <div>
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">The Shinewell Story</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-primary leading-tight">
                            Building Brighter Futures <br /><span className="text-accent italic">Step by Step.</span>
                        </h2>
                        <div className="space-y-6 text-muted text-lg leading-relaxed mb-10">
                            <p>
                                It started with a single classroom under a tree in the outskirts of Delhi. Our founder, Dr. Aradhana Sharma, saw the immense potential in children who were spending their days working in brick kilns instead of learning.
                            </p>
                            <p>
                                Today, we operate in 12 states across India, impacting over 200,000 lives annually. Our approach is holistic—we don't just solve immediate problems; we build systems that empower communities for generations.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { title: '100% Audit Compliance', icon: <ShieldCheck size={20} /> },
                                { title: 'ISO 9001 Certified', icon: <Award size={20} /> }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="text-accent">{item.icon}</div>
                                    <span className="font-bold text-primary text-sm">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="layout-section">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Core Identity</span>
                        <h2 className="text-4xl font-heading font-bold mb-4">Values that <span className="text-accent underline decoration-accent/30 decoration-4 underline-offset-4 font-bold">Drive Impact</span></h2>
                        <p className="text-muted lg:text-lg">Our four cornerstones guide every decision we make and every project we undertake.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-card border border-gray-100 shadow-card hover:shadow-floating transition-all duration-300 text-center flex flex-col items-center group"
                            >
                                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                    {v.icon}
                                </div>
                                <h4 className="text-xl font-heading font-bold mb-4">{v.title}</h4>
                                <p className="text-muted leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
