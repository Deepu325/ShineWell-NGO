import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Heart, Globe, Send, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const Volunteer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interestArea: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/volunteers/register', formData);
            setSubmitted(true);
            toast.success('Application submitted successfully!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Submission failed');
        } finally {
            setLoading(false);
        }
    };

    const benefits = [
        { title: 'Global Impact', desc: 'Work on projects that directly improve lives across the country.', icon: <Globe size={24} /> },
        { title: 'Skill Building', desc: 'Gain experience in leadership, communication, and social work.', icon: <BookOpen size={24} /> },
        { title: 'Certification', desc: 'Receive an official certificate of association for your contribution.', icon: <CheckCircle2 size={24} /> },
        { title: 'Community', desc: 'Join a network of thousands of like-minded changemakers.', icon: <Users size={24} /> },
    ];

    if (submitted) {
        return (
            <div className="pt-120 pb-120 min-h-screen container-custom flex items-center justify-center">
                <div className="text-center max-w-lg bg-white p-64 rounded-card shadow-xl border-t-8 border-accent">
                    <div className="inline-flex p-20 bg-green-100 text-green-600 rounded-full mb-32">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-bold mb-16">Application Received!</h2>
                    <p className="text-muted text-lg mb-40">
                        Thank you for your interest in volunteering with Shine Well NGO. Our team will review your application and get back to you within 3-5 business days.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-primary">
                        Back to Volunteer Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            {/* Header / Hero */}
            <section className="relative pt-160 pb-120 bg-primary overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1559027615-cd2673bbb752?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Volunteer Background"
                        className="w-full h-full object-cover opacity-20 scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/60 to-primary"></div>
                </div>

                <div className="container-custom relative z-10 text-white">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
                        <span className="inline-block px-12 py-4 bg-accent/20 text-accent rounded-full text-sm font-bold tracking-widest uppercase mb-24 border border-accent/30">
                            Be the Change
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-32 leading-[1.1]">
                            Your Skills Can <span className="text-accent underline decoration-4 underline-offset-8">Rewrite</span> a Future.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                            We are looking for passionate individuals who want to dedicate their time and talent to creating a sustainable future for underprivileged communities.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-120 bg-white">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row items-center gap-120">
                        {/* Benefits Content */}
                        <div className="lg:w-1/2">
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-16 block">Why Join Us?</span>
                            <h2 className="text-4xl md:text-5xl font-heading mb-48">Impact Beyond the <br /><span className="text-accent">Traditional</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-40">
                                {benefits.map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col gap-16 group"
                                    >
                                        <div className="w-56 h-56 bg-secondary rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-sm">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-8 text-primary">{benefit.title}</h4>
                                            <p className="text-muted leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-80 p-40 bg-secondary/30 rounded-[2.5rem] border border-gray-100 relative overflow-hidden">
                                <h4 className="text-xl font-bold mb-8">Questions?</h4>
                                <p className="text-muted mb-24">Our volunteer coordinator is ready to help you find the right fit.</p>
                                <a href="mailto:volunteer@shinewellngo.org" className="text-primary font-bold inline-flex items-center gap-8 group">
                                    Contact Support <ArrowRight size={18} className="group-hover:translate-x-4 transition-transform text-accent" />
                                </a>
                                <Users size={120} className="absolute -bottom-16 -right-16 opacity-10" />
                            </div>
                        </div>

                        {/* Registration Form */}
                        <div className="lg:w-1/2 w-full relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-white p-48 md:p-80 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100"
                            >
                                <h3 className="text-3xl font-heading font-bold mb-48">Volunteer <span className="text-accent underline">Registration</span></h3>
                                <form onSubmit={handleSubmit} className="space-y-32">
                                    <div className="space-y-12">
                                        <label className="text-sm font-bold text-primary tracking-wide uppercase">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full px-24 py-20 bg-secondary/50 rounded-2xl outline-none border border-transparent focus:border-accent focus:bg-white transition-all shadow-sm"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
                                        <div className="space-y-12">
                                            <label className="text-sm font-bold text-primary tracking-wide uppercase">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full px-24 py-20 bg-secondary/50 rounded-2xl outline-none border border-transparent focus:border-accent focus:bg-white transition-all shadow-sm"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        <div className="space-y-12">
                                            <label className="text-sm font-bold text-primary tracking-wide uppercase">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                className="w-full px-24 py-20 bg-secondary/50 rounded-2xl outline-none border border-transparent focus:border-accent focus:bg-white transition-all shadow-sm"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-12">
                                        <label className="text-sm font-bold text-primary tracking-wide uppercase">Interest Area</label>
                                        <select
                                            name="interestArea"
                                            required
                                            className="w-full px-24 py-20 bg-secondary/50 rounded-2xl outline-none border border-transparent focus:border-accent focus:bg-white transition-all shadow-sm appearance-none"
                                            value={formData.interestArea}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select an area of impact</option>
                                            <option value="Education">Education & Teaching</option>
                                            <option value="Healthcare">Healthcare Assistance</option>
                                            <option value="Digital">Digital & Content Creation</option>
                                            <option value="Fundraising">Events & Fundraising</option>
                                            <option value="Admin">Administration Support</option>
                                        </select>
                                    </div>
                                    <div className="space-y-12">
                                        <label className="text-sm font-bold text-primary tracking-wide uppercase">Why do you want to join us?</label>
                                        <textarea
                                            name="message"
                                            rows="4"
                                            className="w-full px-24 py-20 bg-secondary/50 rounded-2xl outline-none border border-transparent focus:border-accent focus:bg-white transition-all shadow-sm resize-none"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself and your motivations..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary btn-lg w-full shadow-xl shadow-primary/10"
                                    >
                                        {loading ? 'Submitting Application...' : (
                                            <>
                                                Submit Application <Send size={24} className="ml-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform text-accent" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                            <div className="absolute -z-10 -bottom-24 -right-24 w-1/2 h-1/2 bg-accent/20 rounded-full blur-[100px] opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Volunteer;
