import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { Heart, Lock, Mail, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data));
            toast.success(`Welcome back, ${data.data.name}`);
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-card shadow-2xl overflow-hidden">
                <div className="p-10 text-center bg-secondary">
                    <div className="inline-flex p-4 bg-primary rounded-2xl mb-4">
                        <Heart className="text-accent fill-accent" size={32} />
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-primary">Admin Control</h1>
                    <p className="text-muted">Sign in to manage Shinewell NGO</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                            <input
                                type="email"
                                placeholder="Admin Email"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-secondary rounded-xl outline-none focus:ring-2 focus:ring-accent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-secondary rounded-xl outline-none focus:ring-2 focus:ring-accent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 flex items-center justify-center gap-3 group"
                        >
                            {loading ? 'Authenticating...' : (
                                <>
                                    Enter Dashboard <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm font-medium text-muted hover:text-primary transition-colors"
                        >
                            Back to public site
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
