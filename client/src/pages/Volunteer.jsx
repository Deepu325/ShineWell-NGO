import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Heart, Globe, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import PageHero from '../components/PageHero';

const Volunteer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        availability: '',
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

        const data = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            city: formData.city,
            availability: formData.availability,
            message: formData.message,
            time: new Date().toLocaleString()
        };

        try {
            // Note: Using window.emailjs because script was added to index.html
            await window.emailjs.send("service_123", "template_b3qbxsr", data);

            // Also keep the API call if they want to store it in DB
            try {
                await api.post('/volunteers/register', {
                    ...formData,
                    interestArea: 'Volunteer' // Defaulting since we removed the field to match user request
                });
            } catch (apiErr) {
                console.warn('DB Storage failed, but email sent:', apiErr);
            }

            setSubmitted(true);
            toast.success('Application submitted successfully!');
        } catch (err) {
            console.error('EmailJS Error:', err);
            toast.error('Failed to send application. Please try again.');
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
            <div className="pt-32 pb-32 min-h-screen container-custom flex items-center justify-center">
                <div className="text-center max-w-lg bg-white p-12 md:p-16 rounded-card shadow-xl border-t-8 border-accent">
                    <div className="inline-flex p-5 bg-green-100 text-green-600 rounded-full mb-8">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Application Received!</h2>
                    <p className="text-muted text-lg mb-10">
                        Thank you for your interest in volunteering with Shinewell NGO. Our team will review your application and get back to you within 3-5 business days.
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
            <PageHero
                badge="Be the Change"
                title="Your Skills Can"
                titleAccent="Rewrite a Future."
                description="We are looking for passionate individuals who want to dedicate their time and talent to creating a sustainable future for underprivileged communities."
                image="https://images.unsplash.com/photo-1559027615-cd2673bbb752?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            />

            <section className="layout-section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Benefits Content */}
                        <div>
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Why Join Us?</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12">Impact Beyond the <br /><span className="text-accent">Traditional</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {benefits.map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col gap-4 group"
                                    >
                                        <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-sm">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-2 text-primary">{benefit.title}</h4>
                                            <p className="text-muted leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12 p-8 bg-secondary/30 rounded-card border border-gray-100 relative overflow-hidden">
                                <h4 className="text-xl font-bold mb-2">Questions?</h4>
                                <p className="text-muted mb-4">Our volunteer coordinator is ready to help you find the right fit.</p>
                                <a href="mailto:volunteer@shinewellngo.org" className="text-primary font-bold inline-flex items-center gap-2 group">
                                    Contact Support <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-accent" />
                                </a>
                                <Users size={120} className="absolute -bottom-8 -right-8 opacity-[0.05]" />
                            </div>
                        </div>

                        {/* Registration Form */}
                        <div className="w-full relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 md:p-12 rounded-card shadow-elevated border border-gray-100"
                            >
                                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-8">Volunteer <span className="text-accent underline decoration-accent/30 underline-offset-4">Registration</span></h3>
                                <form id="volunteerForm" onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest">Full Name</label>
                                        <input
                                            id="v_name"
                                            type="text"
                                            name="name"
                                            required
                                            className="input-field px-6 py-4"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-primary uppercase tracking-widest">Email Address</label>
                                            <input
                                                id="v_email"
                                                type="email"
                                                name="email"
                                                required
                                                className="input-field px-6 py-4"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-primary uppercase tracking-widest">Phone Number</label>
                                            <input
                                                id="v_phone"
                                                type="tel"
                                                name="phone"
                                                required
                                                className="input-field px-6 py-4"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-primary uppercase tracking-widest">City</label>
                                            <input
                                                id="v_city"
                                                type="text"
                                                name="city"
                                                required
                                                className="input-field px-6 py-4"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="Your City"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-primary uppercase tracking-widest">Availability</label>
                                            <select
                                                id="v_availability"
                                                name="availability"
                                                required
                                                className="input-field px-6 py-4 appearance-none"
                                                value={formData.availability}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Availability</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Full-time">Full-time</option>
                                                <option value="Weekends">Weekends Only</option>
                                                <option value="Remote">Remote / Online</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest">Why do you want to join us?</label>
                                        <textarea
                                            id="v_message"
                                            name="message"
                                            rows="4"
                                            className="input-field px-6 py-4 resize-none"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself and your motivations..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary w-full"
                                    >
                                        {loading ? 'Submitting Application...' : (
                                            <>
                                                Submit Application <Send size={20} className="ml-2" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                            <div className="absolute -z-10 -bottom-12 -right-12 w-1/2 h-1/2 bg-accent/20 rounded-full blur-[100px] opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Volunteer;
