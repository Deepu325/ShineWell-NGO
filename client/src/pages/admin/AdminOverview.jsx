import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Donut,
    TrendingUp,
    Users,
    Heart,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard
} from 'lucide-react';
import api from '../../services/api';

const AdminOverview = () => {
    const [stats, setStats] = useState({
        totalDonations: '₹1,24,500',
        totalDonors: '156',
        activeCampaigns: '12',
        volunteers: '432'
    });

    const recentActivity = [
        { type: 'donation', user: 'Amit Kumar', amount: '₹2,500', time: '2 hours ago' },
        { type: 'volunteer', user: 'Priya Singh', area: 'Education', time: '5 hours ago' },
        { type: 'donation', user: 'Suresh Raina', amount: '₹5,000', time: '1 day ago' },
        { type: 'blog', user: 'Admin', title: 'New Impact Story Published', time: '2 days ago' },
    ];

    return (
        <div className="p-32 space-y-32">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
                    <p className="text-muted">Welcome back. Here's what's happening with Shine Well NGO today.</p>
                </div>
                <div className="flex items-center gap-12 bg-white px-16 py-8 rounded-xl shadow-sm border border-gray-100">
                    <span className="w-12 h-12 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-bold text-primary">Live System Status</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
                {[
                    { label: 'Total Donations', value: stats.totalDonations, icon: <CreditCard />, color: 'text-blue-600', trend: '+12.5%', isUp: true },
                    { label: 'Active Donors', value: stats.totalDonors, icon: <Heart />, color: 'text-red-600', trend: '+5.2%', isUp: true },
                    { label: 'Campaigns', value: stats.activeCampaigns, icon: <TrendingUp />, color: 'text-accent', trend: '-2.1%', isUp: false },
                    { label: 'Volunteers', value: stats.volunteers, icon: <Users />, color: 'text-green-600', trend: '+15.3%', isUp: true },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-24 rounded-card shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-16">
                            <div className={`p-12 rounded-xl bg-opacity-10 bg-current ${stat.color}`}>
                                {React.cloneElement(stat.icon, { size: 24 })}
                            </div>
                            <div className={`flex items-center gap-4 text-sm font-bold ${stat.isUp ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.trend} {stat.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-primary mb-4">{stat.value}</h3>
                        <p className="text-sm text-muted font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-32">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-24 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-xl">Recent Activity</h3>
                        <button className="text-sm text-accent font-bold hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="p-24 flex items-center gap-16 hover:bg-secondary/20 transition-colors">
                                <div className={`p-10 rounded-full ${activity.type === 'donation' ? 'bg-blue-100 text-blue-600' :
                                        activity.type === 'volunteer' ? 'bg-green-100 text-green-600' :
                                            'bg-orange-100 text-orange-600'
                                    }`}>
                                    {activity.type === 'donation' ? <CreditCard size={20} /> :
                                        activity.type === 'volunteer' ? <Users size={20} /> :
                                            <FileText size={20} />}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-primary">
                                        {activity.type === 'donation' ? `${activity.user} donated ${activity.amount}` :
                                            activity.type === 'volunteer' ? `${activity.user} applied for ${activity.area}` :
                                                activity.user}
                                    </p>
                                    <p className="text-xs text-muted"> {activity.time}</p>
                                </div>
                                <ArrowUpRight size={18} className="text-gray-300" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-32">
                    <div className="bg-white p-24 rounded-card shadow-sm border border-gray-100">
                        <h3 className="font-bold text-xl mb-24">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-12">
                            <button className="flex flex-col items-center gap-12 p-16 rounded-xl hover:bg-secondary transition-colors border border-gray-50">
                                <div className="p-8 bg-accent/20 text-accent rounded-lg">
                                    <Plus size={20} />
                                </div>
                                <span className="text-xs font-bold text-primary">New Post</span>
                            </button>
                            <button className="flex flex-col items-center gap-12 p-16 rounded-xl hover:bg-secondary transition-colors border border-gray-50">
                                <div className="p-8 bg-primary text-white rounded-lg">
                                    <Flag size={20} />
                                </div>
                                <span className="text-xs font-bold text-primary">Create Campaign</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-primary p-24 rounded-card shadow-sm text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-8 mb-16 text-accent">
                                <AlertCircle size={20} />
                                <span className="font-bold text-sm uppercase tracking-widest">Urgent Notice</span>
                            </div>
                            <h4 className="font-bold text-lg mb-8">System Audit Required</h4>
                            <p className="text-sm text-gray-300 mb-20 line-clamp-2">
                                Monthly financial verification is due in 3 days. Please upload the generated reports.
                            </p>
                            <button className="bg-white text-primary px-16 py-8 rounded-lg text-xs font-bold hover:bg-accent transition-all">
                                Handle Now
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 p-16 opacity-10">
                            <AlertCircle size={80} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Plus = ({ size }) => <Users size={size} />; // Placeholder
const FileText = ({ size }) => <Users size={size} />; // Placeholder
const Flag = ({ size }) => <Users size={size} />; // Placeholder

export default AdminOverview;
