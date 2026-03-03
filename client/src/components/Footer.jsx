import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, ArrowRight, ShieldCheck, Award } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const sections = {
        mission: [
            { name: 'ShinewellEd: Education', path: '/programs' },
            { name: 'HealthCare Reach', path: '/programs' },
            { name: 'Livelihood & Skills', path: '/programs' },
            { name: 'Green Earth Initiative', path: '/programs' },
        ],
        resources: [
            { name: 'Our Origin Story', path: '/about' },
            { name: 'Impact Reports', path: '/impact' },
            { name: 'Stories of Change', path: '/blog' },
            { name: 'Volunteer With Us', path: '/volunteer' },
            { name: 'Donate Now', path: '/donate' },
        ],
        legal: [
            { name: 'Privacy Policy', path: '#' },
            { name: 'Terms of Service', path: '#' },
            { name: 'CSR Policy', path: '#' },
            { name: '80G & 12A Status', path: '#' },
        ]
    };

    return (
        <footer className="bg-primary text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5">
            {/* Top Shine/Glow Effect */}
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link to="/" className="flex items-center gap-3 group w-fit">
                            <div className="bg-accent p-2 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                                <Heart className="text-primary h-6 w-6 fill-primary" />
                            </div>
                            <span className="text-2xl font-heading font-bold text-white tracking-tight">Shinewell <span className="text-accent">NGO</span></span>
                        </Link>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                            Restoring dignity and building hope for the marginalized through sustainable education, healthcare, and livelihood interventions.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <Facebook size={18} />, label: 'Facebook' },
                                { icon: <Instagram size={18} />, label: 'Instagram' },
                                { icon: <Twitter size={18} />, label: 'Twitter' },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span className="sr-only">{social.label}</span>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-8">The Mission</h4>
                        <ul className="space-y-4">
                            {sections.mission.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm">
                                        <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-8">Resources</h4>
                        <ul className="space-y-4">
                            {sections.resources.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-gray-400 hover:text-white transition-colors flex items-center group text-sm">
                                        <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Trust */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <h4 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-6">Contact Us</h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 text-gray-400 group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:text-accent transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <p className="text-sm leading-relaxed">123 Empowerment Way, Okhla Phase III,<br />New Delhi, India 110020</p>
                                </div>
                                <div className="flex items-center gap-4 text-gray-400 group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:text-accent transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <p className="text-sm">+91 98765 43210</p>
                                </div>
                                <div className="flex items-center gap-4 text-gray-400 group">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:text-accent transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <p className="text-sm">contact@shinewellngo.org</p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex gap-4 pt-4">
                            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 group">
                                <ShieldCheck size={16} className="text-accent" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">80G Certified</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 group">
                                <Award size={16} className="text-accent" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">CSR Compliant</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-gray-500 font-medium">
                        &copy; {currentYear} Shinewell NGO. All rights reserved. Registered under Section 12A & 80G.
                    </p>
                    <div className="flex items-center gap-8">
                        {sections.legal.map((link, i) => (
                            <React.Fragment key={link.name}>
                                <Link to={link.path} className="text-xs text-gray-500 hover:text-accent transition-colors">
                                    {link.name}
                                </Link>
                                {i < sections.legal.length - 1 && <span className="w-1 h-1 rounded-full bg-gray-700" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle Decorative Heart Background */}
            <div className="absolute -bottom-24 -left-24 opacity-[0.03] pointer-events-none rotate-12">
                <Heart size={400} fill="currentColor" />
            </div>
            <div className="absolute -top-24 -right-24 opacity-[0.03] pointer-events-none -rotate-12">
                <Heart size={300} fill="currentColor" />
            </div>
        </footer>
    );
};

export default Footer;
