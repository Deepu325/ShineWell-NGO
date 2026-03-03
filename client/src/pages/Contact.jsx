import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import PageHero from '../components/PageHero';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            time: new Date().toLocaleString()
        };

        // Note: Using window.emailjs because script was added to index.html
        window.emailjs.send("service_123", "template_ligatr7", data)
            .then(() => {
                toast.success('Message sent! We will get back to you soon.');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                toast.error('Failed to send message. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="bg-white">
            <PageHero
                badge="Connect With Us"
                title="Let's Build a"
                titleAccent="Better World"
                description="Have questions about our programs or want to support our mission? We're here to help. Reach out to us through any of the channels below."
                image="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            />

            <section className="layout-section">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Contact Info Column */}
                        <div className="space-y-6">
                            {[
                                {
                                    title: 'Email Us',
                                    details: ['contact@shinewellngo.org', 'support@shinewellngo.org'],
                                    icon: <Mail size={24} />
                                },
                                {
                                    title: 'Call Us',
                                    details: ['+91 98765 43210', 'Mon - Sat, 9am - 6pm'],
                                    icon: <Phone size={24} />
                                },
                                {
                                    title: 'Visit Us',
                                    details: ['123 Empowerment Way, Okhla Phase III,', 'New Delhi, India 110020'],
                                    icon: <MapPin size={24} />
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-secondary/30 p-8 rounded-card border border-border flex gap-6 group hover:bg-white hover:shadow-card transition-all duration-300">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-2">{item.title}</h4>
                                        {item.details.map((detail, i) => (
                                            <p key={i} className="text-muted text-sm leading-relaxed">{detail}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="bg-primary text-white p-10 rounded-card mt-8">
                                <h4 className="text-xl font-bold mb-4">Instant Support?</h4>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">Our team is active on WhatsApp for quick inquiries.</p>
                                <a href="#" className="btn-accent btn-sm w-full">
                                    <MessageSquare size={16} className="mr-2" /> Chat Now
                                </a>
                            </div>
                        </div>

                        {/* Contact Form Column */}
                        <div className="lg:col-span-2">
                            <form id="contactForm" onSubmit={handleSubmit} className="bg-white p-8 lg:p-12 rounded-card border border-border shadow-elevated grid gap-6">
                                <h3 className="text-2xl font-heading font-bold mb-4">Send us a <span className="text-accent underline decoration-accent/30 underline-offset-4">Message</span></h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            className="input-field px-6 py-4"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            className="input-field px-6 py-4"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-primary uppercase tracking-widest">Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        required
                                        className="input-field px-6 py-4"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-primary uppercase tracking-widest">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field px-6 py-4"
                                        placeholder="How can we help you?"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-primary uppercase tracking-widest">Message</label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        required
                                        className="input-field px-6 py-4 resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary"
                                >
                                    {loading ? 'Sending...' : 'Send Message'} <Send size={18} className="ml-2" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="layout-section bg-secondary/20 pt-16">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-heading font-bold mb-4">Visit our Headquarters</h2>
                        <p className="text-muted">Our doors are always open to those who want to see our impact first-hand.</p>
                    </div>
                    <div className="aspect-video lg:aspect-[21/9] rounded-panel overflow-hidden border-8 border-white shadow-hero">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112115.11550570887!2d77.1000823!3d28.5818967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347662db%3A0xad635bb36b99d50a!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Office Location"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
