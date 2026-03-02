import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Users, Mail, Phone, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminVolunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        try {
            const { data } = await api.get('/volunteers');
            setVolunteers(data.data);
        } catch (err) {
            toast.error('Failed to load volunteers');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/volunteers/${id}/status`, { status });
            toast.success(`Status updated to ${status}`);
            fetchVolunteers();
        } catch (err) {
            toast.error('Update failed');
        }
    };

    return (
        <div className="p-32">
            <div className="mb-32">
                <h1 className="text-3xl font-bold text-primary">Volunteer Management</h1>
                <p className="text-muted">Review and onboard new changemakers</p>
            </div>

            <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-secondary/50 border-b border-gray-100">
                            <tr>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Volunteer</th>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Interests</th>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Status</th>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Applied On</th>
                                <th className="px-24 py-16 text-xs uppercase tracking-widest font-bold text-muted">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-48 text-muted">Loading applications...</td></tr>
                            ) : volunteers.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-48 text-muted">No applications found.</td></tr>
                            ) : volunteers.map((v) => (
                                <tr key={v._id} className="hover:bg-secondary/20 transition-colors">
                                    <td className="px-24 py-20">
                                        <p className="font-bold text-primary">{v.name}</p>
                                        <div className="flex flex-col text-xs text-muted mt-4 gap-4">
                                            <span className="flex items-center gap-4"><Mail size={12} /> {v.email}</span>
                                            <span className="flex items-center gap-4"><Phone size={12} /> {v.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-24 py-20">
                                        <span className="bg-primary/5 text-primary text-xs font-bold px-12 py-4 rounded-full uppercase tracking-widest">
                                            {v.interestArea}
                                        </span>
                                        {v.message && <p className="text-xs text-muted mt-8 line-clamp-1 italic">"{v.message}"</p>}
                                    </td>
                                    <td className="px-24 py-20">
                                        <span className={`px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest ${v.status === 'active' ? 'bg-green-100 text-green-700' :
                                                v.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    v.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-red-100 text-red-700'
                                            }`}>
                                            {v.status}
                                        </span>
                                    </td>
                                    <td className="px-24 py-20 text-sm text-muted">
                                        {new Date(v.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-24 py-20">
                                        <div className="flex gap-8">
                                            {v.status === 'pending' && (
                                                <button
                                                    onClick={() => updateStatus(v._id, 'contacted')}
                                                    className="bg-blue-50 text-blue-600 p-8 rounded-lg hover:bg-blue-100 transition-colors"
                                                    title="Mark as Contacted"
                                                >
                                                    <Clock size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => updateStatus(v._id, 'active')}
                                                className="bg-green-50 text-green-600 p-8 rounded-lg hover:bg-green-100 transition-colors"
                                                title="Approve"
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(v._id, 'rejected')}
                                                className="bg-red-50 text-red-600 p-8 rounded-lg hover:bg-red-100 transition-colors"
                                                title="Reject"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </div>
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

export default AdminVolunteers;
