import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { CreditCard, Search, Download, Filter } from 'lucide-react';

const AdminDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const { data } = await api.get('/donations');
                setDonations(data.data);
            } catch (err) {
                console.error('Error fetching donations');
            } finally {
                setLoading(false);
            }
        };
        fetchDonations();
    }, []);

    return (
        <div className="p-8 lg:p-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Donation Management</h1>
                    <p className="text-muted">Track and verify all contributions</p>
                </div>
                <button className="btn-primary flex items-center gap-8 px-24 font-bold">
                    Export CSV <Download size={18} />
                </button>
            </div>

            <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-24 border-b border-gray-100 flex gap-16">
                    <div className="relative flex-grow">
                        <Search className="absolute left-16 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, email or transaction ID..."
                            className="w-full pl-48 pr-16 py-12 bg-secondary rounded-xl outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    <button className="btn-outline px-16 py-12 flex items-center gap-8">
                        <Filter size={18} /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-secondary/50 border-b border-gray-100">
                            <tr>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Donor</th>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Amount</th>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Status</th>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Type</th>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Date</th>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="6" className="text-center py-48 text-muted">Loading donations...</td></tr>
                            ) : donations.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-48 text-muted">No donations found.</td></tr>
                            ) : donations.map((donation) => (
                                <tr key={donation._id} className="hover:bg-secondary/20 transition-colors">
                                    <td className="px-24 py-20">
                                        <p className="font-bold text-primary">{donation.name}</p>
                                        <p className="text-xs text-muted">{donation.email}</p>
                                    </td>
                                    <td className="px-24 py-20">
                                        <span className="font-bold text-primary">₹{donation.amount}</span>
                                    </td>
                                    <td className="px-24 py-20">
                                        <span className={`px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest ${donation.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            donation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {donation.status}
                                        </span>
                                    </td>
                                    <td className="px-24 py-20 border-r border-gray-100">
                                        <span className="text-sm font-medium">{donation.type}</span>
                                    </td>
                                    <td className="px-24 py-20">
                                        <p className="text-sm">{new Date(donation.createdAt).toLocaleDateString()}</p>
                                    </td>
                                    <td className="px-24 py-20">
                                        <button className="text-accent font-bold text-sm hover:underline">View Receipt</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDonations;
