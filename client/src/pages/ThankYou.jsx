import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Share2, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const donor = location.state?.donor;

    useEffect(() => {
        if (!donor) {
            navigate('/donate');
        }
    }, [donor, navigate]);

    if (!donor) return null;

    return (
        <div className="pt-160 pb-120 min-h-screen bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-accent/10 via-white to-white -z-10"></div>
            <div className="absolute top-40 right-40 opacity-5 -rotate-12">
                <Heart size={400} fill="currentColor" className="text-accent" />
            </div>

            <div className="container-custom text-center max-w-3xl mx-auto relative z-10">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="inline-flex items-center justify-center w-120 h-120 bg-accent text-primary rounded-[2.5rem] mb-48 shadow-2xl shadow-accent/30"
                >
                    <CheckCircle size={64} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs mb-16 block">Impact Confirmed</span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-24 leading-tight text-primary">
                        You're a <span className="text-accent italic">Hero</span>, <br />{donor.name.split(' ')[0]}!
                    </h1>
                    <p className="text-xl md:text-2xl text-muted mb-64 max-w-2xl mx-auto leading-relaxed">
                        Your transformation gift of <span className="text-primary font-bold">₹{donor.amount.toLocaleString()}</span> has been received. You've just taken a stand for dignity and hope.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-48 md:p-64 rounded-[3.5rem] mb-64 text-left shadow-[0_48px_80px_-16px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden"
                >
                    <div className="relative z-10 space-y-24">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-20">
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Transaction ID</span>
                            <span className="font-mono font-bold text-primary text-lg">{donor.paymentId}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-20">
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Order ID</span>
                            <span className="text-primary font-medium">{donor.orderId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Confirmation Date</span>
                            <span className="text-primary font-medium">{new Date(donor.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-24 justify-center items-center mb-80">
                    <button className="btn-primary flex items-center justify-center gap-12 py-24 px-56 text-lg shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-transform group">
                        Download Receipt <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                    <button className="btn-outline border-primary text-primary hover:bg-primary hover:text-white flex items-center justify-center gap-12 py-24 px-56 text-lg hover:-translate-y-1 transition-transform">
                        Share Your Impact <Share2 size={20} />
                    </button>
                </div>

                <div className="pt-48 border-t border-gray-100">
                    <Link to="/" className="text-gray-400 hover:text-accent font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-12 transition-all group">
                        Return to Mission <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
