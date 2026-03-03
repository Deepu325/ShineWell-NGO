import React from 'react';
import { BookOpen, Stethoscope, Briefcase, Shovel, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const Programs = () => {
    const programs = [
        {
            title: 'ShinewellEd: Education for All',
            subtitle: 'Knowledge is Empowerment',
            desc: 'We provide basic literacy, school supplies, and digital education to children in urban slums and rural villages. Our "Night Schools" cater to working children, ensuring they don\'t miss out on their future.',
            icon: <BookOpen size={32} />,
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            impact: '15,000+ Students enrolled'
        },
        {
            title: 'HealthCare Reach',
            subtitle: 'Healing the Heartlands',
            desc: 'Our mobile medical units bring specialized doctors and essential medicines to remote areas where there are no hospitals. We focus on maternal health, child nutrition, and epidemic prevention.',
            icon: <Stethoscope size={32} />,
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            impact: '200+ Villages covered'
        },
        {
            title: 'Livelihood & Skills',
            subtitle: 'Towards Self-Reliance',
            desc: 'Vocational training in tailoring, computer operations, and basic accounting for women and unemployed youth. We also provide seed funding for small community-led startups.',
            icon: <Briefcase size={32} />,
            image: 'https://images.unsplash.com/photo-1581578731522-aa0042f4fd41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            impact: '5,000+ Skilled professionals'
        },
        {
            title: 'Green Earth Initiative',
            subtitle: 'Protecting the Future',
            desc: 'Community-led tree plantation, water harvesting systems, and solar lamp distribution. We educate farmers on sustainable organic practices to protect their land and health.',
            icon: <Shovel size={32} />,
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            impact: '100k+ Trees planted'
        }
    ];

    return (
        <div className="bg-white">
            <PageHero
                badge="Our Initiatives"
                title="Strategic Focus for"
                titleAccent="Lasting Change"
                description="Our programs address the root causes of poverty through sustainable, community-led interventions. Every rupee you donate is transformed into measurable social impact."
                image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            />

            <section className="layout-section">
                <div className="container-custom">
                    <div className="grid gap-16 lg:gap-24">
                        {programs.map((prog, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
                            >
                                <div className={`${idx % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary text-accent rounded-2xl mb-6 shadow-sm">
                                        {prog.icon}
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary leading-tight">{prog.title}</h2>
                                    <p className="text-accent font-bold uppercase tracking-widest text-sm mb-6">{prog.subtitle}</p>
                                    <p className="text-lg text-muted mb-8 leading-relaxed max-w-xl">
                                        {prog.desc}
                                    </p>

                                    <div className="bg-secondary/50 p-6 rounded-card border border-border flex items-center gap-4 mb-8 max-w-sm">
                                        <div className="bg-white p-3 rounded-xl text-accent shadow-sm">
                                            <Heart size={20} fill="currentColor" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted uppercase tracking-widest font-bold mb-1">Impact Metric</p>
                                            <p className="text-xl font-heading font-bold text-primary">{prog.impact}</p>
                                        </div>
                                    </div>

                                    <Link to="/donate" className="btn-primary">
                                        Support this Initiative <ArrowRight size={18} className="ml-2" />
                                    </Link>
                                </div>

                                <div className={`${idx % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                    <img
                                        src={prog.image}
                                        alt={prog.title}
                                        className="rounded-panel w-full aspect-[4/3] object-cover shadow-elevated"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA for Collaboration */}
            <section className="layout-section pt-0">
                <div className="container-custom">
                    <div className="bg-primary text-white rounded-panel p-10 lg:p-16 relative overflow-hidden flex flex-col items-center text-center shadow-floating">
                        <div className="relative z-10 max-w-3xl">
                            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Corporate Partnerships</span>
                            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Partner for <span className="text-accent">CSR Impact</span></h2>
                            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                                Align your corporate goals with meaningful social change. We design customized CSR projects that deliver measurable results and empower thousands.
                            </p>
                            <Link to="/contact" className="btn-accent btn-lg">Partner With Us</Link>
                        </div>
                        {/* Decorative mark - kept simple */}
                        <Briefcase size={400} className="absolute -bottom-32 -right-32 opacity-5 pointer-events-none" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Programs;
