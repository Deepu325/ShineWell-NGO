import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Heart, Users, BookOpen, ShieldCheck, ArrowRight,
    MessageSquare, Newspaper, Image, CheckCircle,
    Award, TrendingUp, Globe2, Briefcase, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GallerySection from '../components/GallerySection';


const Home = () => {
    const stats = [
        { label: 'Lives Impacted', value: '50,000+', icon: <Users size={28} /> },
        { label: 'Donations Raised', value: '₹12M+', icon: <TrendingUp size={28} /> },
        { label: 'Students Supported', value: '15,000+', icon: <BookOpen size={28} /> },
        { label: 'Transparency Score', value: 'A+', icon: <ShieldCheck size={28} /> },
    ];

    const programs = [
        {
            title: 'Project ShinewellEd',
            category: 'Education',
            desc: 'Providing school kits, digital literacy, and scholarships for children in urban slums.',
            img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
            title: 'HealthCare Reach',
            category: 'Medical Aid',
            desc: 'Mobile medical units delivering life-saving treatment to over 200 remote Indian villages.',
            img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
            title: 'Women Empowerment',
            category: 'Livelihood',
            desc: 'Vocational training in tailoring and tech for women to achieve financial independence.',
            img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
    ];

    const testimonials = [
        {
            quote: "Shinewell didn't just give us food; they gave us a way to earn it with dignity.",
            author: "Anjali Sharma",
            role: "Skills Project Beneficiary"
        },
        {
            quote: "The transparency in their reporting is why I chose them for my annual corporate giving.",
            author: "Rajiv Mehta",
            role: "Donor & Partner"
        }
    ];

    return (
        <div className="bg-white selection:bg-accent/30">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center bg-primary text-white overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
                </div>

                <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-accent/30">
                            Empowering India Since 2014
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] mb-8">
                            Restoring <span className="text-accent italic">Dignity</span>. <br />
                            Building <span className="underline decoration-accent/40 decoration-8 underline-offset-4">Hope</span>.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl leading-relaxed">
                            Join Shinewell NGO in our mission to provide education, healthcare, and sustainable livelihood to those who need it most.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Link to="/donate" className="btn-accent btn-lg group">
                                Donate Now <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/volunteer" className="btn-outline border-white text-white hover:bg-white hover:text-primary btn-lg">
                                Volunteer With Us
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="hidden lg:block relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Community Impact"
                            className="rounded-panel shadow-hero object-cover w-full aspect-[4/3]"
                        />
                        <div className="absolute -bottom-8 -left-8 bg-white text-primary p-6 rounded-card shadow-floating border border-gray-100">
                            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Direct Impact</p>
                            <p className="text-3xl font-heading font-bold">200k+ Lives</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Indicators Section */}
            <section className="bg-secondary/50 border-y border-border">
                <div className="container-custom py-12 lg:py-16">
                    <p className="text-center text-xs font-bold text-muted uppercase tracking-[0.3em] mb-12 leading-none">Registered & Compliant NGO • 80G Certified • Audited by KPMG</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4 text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                    {stat.icon}
                                </div>
                                <h3 className="text-3xl font-bold text-primary mb-1">{stat.value}</h3>
                                <p className="text-muted text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview Section */}
            <section className="layout-section">
                <div className="container-custom grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="order-2 lg:order-1">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Our Origin Story</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary leading-tight">
                            Driven by <span className="text-accent">Purpose</span>, <br />Measured by Impact.
                        </h2>
                        <p className="text-lg text-muted mb-8 leading-relaxed">
                            Founded in 2014, Shinewell NGO started with a simple belief: that poverty is not just a lack of resources, but a lack of opportunity. We work across 12 states in India to bridge this gap.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {[
                                'Community-led development models',
                                '100% Transparency in fund utilization',
                                'Focus on long-term sustainable growth'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-primary font-medium">
                                    <CheckCircle size={20} className="text-accent" /> {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/about" className="btn-primary">
                            More About Us <ArrowRight size={18} className="ml-2" />
                        </Link>
                    </div>
                    <div className="order-1 lg:order-2">
                        <img
                            src="https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="The Shinewell Team"
                            className="rounded-panel w-full aspect-square object-cover shadow-elevated"
                        />
                    </div>
                </div>
            </section>

            {/* Programs Preview Section */}
            <section className="bg-secondary/30 layout-section">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">What We Do</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Programs Creating <br /><span className="text-accent">Generational Impact</span></h2>
                        <p className="text-lg text-muted">We focus on three core pillars to ensure a holistic approach to community development and individual growth.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {programs.map((program, idx) => (
                            <div key={idx} className="bg-white rounded-card overflow-hidden shadow-card hover:shadow-floating transition-all duration-500 flex flex-col h-full group">
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img src={program.img} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2">{program.category}</span>
                                    <h3 className="text-2xl font-heading font-bold mb-4">{program.title}</h3>
                                    <p className="text-muted mb-6 flex-grow">{program.desc}</p>
                                    <Link to="/programs" className="text-primary font-bold inline-flex items-center gap-2 group/link">
                                        Learn More <ArrowRight size={16} className="text-accent group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Numbers Section */}
            <section className="bg-primary text-white layout-section overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <Globe2 size={800} className="absolute -bottom-32 -right-32" />
                </div>
                <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16">Our commitment to transparency means your contribution is always trackable.</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="p-8 border border-white/10 rounded-card bg-white/5">
                            <Zap className="text-accent mx-auto mb-4" size={40} />
                            <p className="text-5xl font-bold mb-2">92%</p>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Direct Utilization</p>
                        </div>
                        <div className="p-8 border border-white/10 rounded-card bg-white/5">
                            <Award className="text-accent mx-auto mb-4" size={40} />
                            <p className="text-5xl font-bold mb-2">10+</p>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Awards Won</p>
                        </div>
                        <div className="p-8 border border-white/10 rounded-card bg-white/5">
                            <Briefcase className="text-accent mx-auto mb-4" size={40} />
                            <p className="text-5xl font-bold mb-2">12</p>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">States Covered</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Gallery Section */}
            <GallerySection />


            {/* Testimonials Section */}
            <section className="bg-secondary/20 layout-section">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <MessageSquare className="text-accent mb-6" size={48} />
                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">Voices from the <br /><span className="text-accent">Communities</span> we Serve</h2>
                            <p className="text-lg text-muted">We believe the best way to understand our impact is through the stories of those whose lives have been transformed.</p>
                        </div>
                        <div className="space-y-8">
                            {testimonials.map((t, i) => (
                                <div key={i} className="bg-white p-10 rounded-card shadow-card relative border-l-4 border-accent">
                                    <p className="text-xl italic text-primary mb-6">"{t.quote}"</p>
                                    <div>
                                        <p className="font-bold text-primary">{t.author}</p>
                                        <p className="text-accent text-sm font-bold uppercase tracking-widest">{t.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Preview Section */}
            <section className="layout-section">
                <div className="container-custom">
                    <div className="flex justify-between items-end mb-16">
                        <div className="max-w-xl">
                            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Latest Stories</span>
                            <h2 className="text-4xl font-heading font-bold">News & Updates</h2>
                        </div>
                        <Link to="/blog" className="btn-outline btn-sm">Read All News</Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'New Digital Learning Center in Mumbai Slums', date: 'March 15, 2024' },
                            { title: 'Women Tailoring Batch Graduates in rural Bihar', date: 'March 10, 2024' },
                            { title: 'Healthcare Report: 200 Villages Reached in Q1', date: 'March 05, 2024' }
                        ].map((post, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-video bg-gray-100 rounded-card mb-6 overflow-hidden">
                                    <img src={`https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=${i}`} alt="Blog" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">{post.date}</p>
                                <h3 className="text-xl font-heading font-bold group-hover:text-accent transition-colors">{post.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Donation CTA */}
            <section className="layout-section pt-0">
                <div className="container-custom">
                    <div className="bg-primary rounded-panel p-12 lg:p-24 text-white text-center flex flex-col items-center shadow-hero">
                        <Heart size={64} className="text-accent mb-8 animate-float" />
                        <h2 className="text-4xl md:text-7xl font-heading font-bold mb-8 max-w-4xl">You hold the power to <span className="text-accent">Change</span> a Life.</h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                            Whether you donate or volunteer, you are directly changing the course of a family's future. Join the Shinewell movement today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link to="/donate" className="btn-accent btn-lg">Every Rupee Counts</Link>
                            <Link to="/volunteer" className="btn-outline border-white text-white hover:bg-white hover:text-primary btn-lg">Join as Volunteer</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
