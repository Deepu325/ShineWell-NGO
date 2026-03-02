import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, CreditCard, ChevronRight, CheckCircle } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';

const Donate = () => {
    const [amount, setAmount] = useState(1000);
    const [customAmount, setCustomAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('one-time');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const presets = [500, 1000, 2500, 5000];

    const handleDonate = async (e) => {
        e.preventDefault();
        const finalAmount = customAmount || amount;

        if (!finalAmount || !name || !email) {
            toast.error('Please fill all required fields');
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post('/donations/initiate', {
                amount: finalAmount,
                name,
                email,
                type
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
                amount: data.order.amount,
                currency: data.order.currency,
                name: 'Shine Well NGO',
                description: 'Thank you for your generous donation',
                order_id: data.order.id,
                handler: async (response) => {
                    try {
                        const verifyRes = await api.post('/donations/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            toast.success('Donation successful! Thank you.');
                            navigate('/thank-you', { state: { donor: verifyRes.data.donor } });
                        }
                    } catch (err) {
                        toast.error('Verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name,
                    email,
                },
                theme: {
                    color: '#0B1F3A',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const getImpactText = (val) => {
        const amt = parseInt(val);
        if (amt < 1000) return "Provides nutritious meals for 5 children for a week.";
        if (amt < 2500) return "Covers primary education materials for 2 students for a year.";
        if (amt < 5000) return "Funds a mobile health camp checkup for an entire village.";
        return "Empowers a woman with vocational training and a starter kit.";
    };

    return (
        <div className="bg-white">
            <PageHero
                badge="Empower Humanity"
                title="Your Spark can"
                titleAccent="Light UP"
                description="Join thousands of donors in our mission to provide education, healthcare, and sustainable livelihood to those who need it most."
                image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            />

            <section className="layout-section">
                <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left: Impact & Trust */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">Impact of your gift</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">Every Contribution <br />Saves a <span className="text-accent italic font-bold">Legacy.</span></h2>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: <ShieldCheck size={24} />, title: 'Tax Benefits', desc: 'All donations are eligible for tax exemption under Section 80G of the Income Tax Act.' },
                                { icon: <Heart size={24} />, title: 'Direct Impact', desc: '92% of your donation goes directly towards our field programs and community development.' },
                                { icon: <CreditCard size={24} />, title: 'Secure Payment', desc: 'Your transaction is protected by industry-leading 256-bit encryption through Razorpay.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="bg-secondary p-4 rounded-xl text-accent shadow-sm border border-border shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-lg mb-2">{item.title}</h4>
                                        <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-primary text-white p-10 rounded-panel relative overflow-hidden group shadow-hero">
                            <div className="relative z-10">
                                <p className="text-xl font-light italic leading-relaxed mb-4">
                                    "We make a living by what we get, but we make a life by what we give."
                                </p>
                                <p className="font-bold tracking-widest uppercase text-accent text-xs">— Winston Churchill</p>
                            </div>
                            <Heart size={160} className="absolute -bottom-12 -right-12 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Right: Donation Form */}
                    <form onSubmit={handleDonate} className="bg-white p-8 lg:p-12 rounded-panel border border-border shadow-elevated grid gap-8">
                        {/* Type Toggle */}
                        <div className="grid grid-cols-2 p-1.5 bg-secondary rounded-2xl">
                            <button
                                type="button"
                                className={`py-4 rounded-xl font-bold transition-all ${type === 'one-time' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-primary'}`}
                                onClick={() => setType('one-time')}
                            >
                                One-time
                            </button>
                            <button
                                type="button"
                                className={`py-4 rounded-xl font-bold transition-all ${type === 'monthly' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-primary'}`}
                                onClick={() => setType('monthly')}
                            >
                                Monthly
                            </button>
                        </div>

                        {/* Amount Presets */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {presets.map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    className={`py-6 rounded-xl font-heading font-bold text-xl border-2 transition-all ${amount === p && !customAmount ? 'border-accent bg-accent/5 text-accent active-scale' : 'border-border bg-white text-muted hover:border-accent/30'}`}
                                    onClick={() => { setAmount(p); setCustomAmount(''); }}
                                >
                                    ₹{p.toLocaleString()}
                                </button>
                            ))}
                        </div>

                        {/* Custom Amount */}
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-accent">₹</span>
                            <input
                                type="number"
                                placeholder="Enter other amount"
                                className="input-field pl-12 pr-6 py-6 text-2xl font-bold"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                            />
                        </div>

                        {/* Impact Summary */}
                        <div className="bg-accent/5 p-4 rounded-xl border border-accent/20 flex items-center gap-4">
                            <div className="text-accent shrink-0"><CheckCircle size={20} /></div>
                            <p className="text-sm font-medium text-primary leading-tight">
                                {getImpactText(customAmount || amount)}
                            </p>
                        </div>

                        {/* Personal Details */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-primary uppercase tracking-widest">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field px-6 py-4"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-primary uppercase tracking-widest">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="input-field px-6 py-4"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full shadow-lg h-16 text-lg"
                            >
                                {loading ? 'Processing...' : `Donate ₹${(customAmount || amount).toLocaleString()} Now`} <ChevronRight size={24} className="ml-2" />
                            </button>
                            <div className="flex items-center justify-center gap-4 text-muted font-bold text-[10px] uppercase tracking-[0.3em]">
                                <ShieldCheck size={14} className="text-accent" /> Secure 256-bit Payment
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Donate;
