import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    BarChart3,
    Users,
    Heart,
    FileText,
    Flag,
    LogOut,
    Menu,
    X,
    CreditCard
} from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

import AdminOverview from './AdminOverview';
import AdminDonations from './AdminDonations';
import AdminBlogs from './AdminBlogs';
import AdminVolunteers from './AdminVolunteers';

const AdminCampaigns = () => <div className="p-8 lg:p-12"><h1>Campaigns</h1><p>Manage active fundraising goals.</p></div>;

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (!token) {
            navigate('/admin/login');
        }
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/admin/login');
    };

    const navItems = [
        { label: 'Overview', path: '', icon: <BarChart3 size={20} /> },
        { label: 'Donations', path: 'donations', icon: <CreditCard size={20} /> },
        { label: 'Blogs', path: 'blogs', icon: <FileText size={20} /> },
        { label: 'Volunteers', path: 'volunteers', icon: <Users size={20} /> },
        { label: 'Campaigns', path: 'campaigns', icon: <Flag size={20} /> },
    ];

    if (!user) return null;

    return (
        <div className="flex h-screen bg-secondary overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'w-64 lg:w-72' : 'w-0'} bg-primary text-white transition-all duration-300 relative flex flex-col`}
            >
                <div className="p-24 flex items-center gap-12 border-b border-white/10">
                    <div className="bg-accent p-8 rounded-lg">
                        <Heart className="text-primary fill-primary" size={24} />
                    </div>
                    <span className={`${sidebarOpen ? 'block' : 'hidden'} font-heading font-bold text-xl`}>Admin Panel</span>
                </div>

                <nav className="flex-grow p-16 space-y-8 mt-24">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-16 px-16 py-12 rounded-xl transition-all ${(item.path === '' && location.pathname === '/admin/dashboard') ||
                                (item.path !== '' && location.pathname.includes(item.path))
                                ? 'bg-accent text-primary font-bold'
                                : 'hover:bg-white/5 text-gray-400'
                                }`}
                        >
                            <span className="shrink-0">{item.icon}</span>
                            <span className={`${sidebarOpen ? 'block' : 'hidden'} whitespace-nowrap`}>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-16 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-16 px-16 py-12 w-full text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white h-20 flex items-center justify-between px-8 lg:px-12 shadow-sm border-b border-gray-100 shrink-0">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-primary hover:bg-secondary p-8 rounded-lg">
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className="flex items-center gap-16">
                        <div className="text-right hidden sm:block">
                            <p className="font-bold text-primary">{user.name}</p>
                            <p className="text-xs text-muted uppercase tracking-widest">{user.role}</p>
                        </div>
                        <div className="w-48 h-48 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-xl">
                            {user.name.charAt(0)}
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-grow overflow-y-auto bg-gray-50">
                    <Routes>
                        <Route path="/" element={<AdminOverview />} />
                        <Route path="/donations" element={<AdminDonations />} />
                        <Route path="/blogs" element={<AdminBlogs />} />
                        <Route path="/volunteers" element={<AdminVolunteers />} />
                        <Route path="/campaigns" element={<AdminCampaigns />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
