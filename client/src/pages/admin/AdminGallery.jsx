import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Image, Plus, Edit2, Trash2, Camera, X, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminGallery = () => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'event',
        image: null
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const { data } = await api.get('/gallery');
            setGallery(data.data);
        } catch (err) {
            toast.error('Failed to load gallery items');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', category: 'event', image: null });
        setPreviewUrl(null);
        setEditingItem(null);
        setIsModalOpen(false);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            category: item.category,
            image: null
        });
        setPreviewUrl(item.imageURL);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (editingItem) {
                await api.put(`/gallery/${editingItem._id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Gallery item updated');
            } else {
                if (!formData.image) {
                    toast.error('Please select an image');
                    setSubmitting(false);
                    return;
                }
                await api.post('/gallery', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Gallery item added');
            }
            fetchGallery();
            resetForm();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Action failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await api.delete(`/gallery/${id}`);
                toast.success('Image deleted');
                fetchGallery();
            } catch (err) {
                toast.error('Deletion failed');
            }
        }
    };

    return (
        <div className="p-6 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Gallery Management</h1>
                    <p className="text-muted">Showcase the NGO's impact through photos</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-accent flex items-center gap-2 px-6 font-bold shadow-lg shadow-accent/20"
                >
                    Add Photos <Plus size={18} />
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-muted">
                    <Loader2 size={40} className="animate-spin mb-4" />
                    <p>Loading gallery items...</p>
                </div>
            ) : gallery.length === 0 ? (
                <div className="flex flex-col items-center py-24 bg-white rounded-card border-2 border-dashed border-gray-200">
                    <Image size={64} className="text-gray-300 mb-4" />
                    <p className="text-muted text-lg mb-6">Your gallery is empty.</p>
                    <button onClick={() => setIsModalOpen(true)} className="btn-primary px-8">Upload your first photo</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {gallery.map((item) => (
                        <div key={item._id} className="group bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all duration-300">
                            <div className="aspect-square overflow-hidden relative">
                                <img
                                    src={item.imageURL}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary/80 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-primary mb-2 line-clamp-1">{item.title}</h3>
                                <p className="text-xs text-muted mb-4 line-clamp-2 flex-grow">{item.description}</p>
                                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 mt-auto">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 text-primary hover:bg-secondary rounded-lg transition-colors"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-card shadow-elevated w-full max-w-2xl max-h-full overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-primary">{editingItem ? 'Edit Gallery Item' : 'Add New Photos'}</h2>
                            <button onClick={resetForm} className="p-2 text-muted hover:text-primary transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Image Upload Component */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-primary uppercase tracking-widest">Photo</label>
                                    <div
                                        onClick={() => document.getElementById('imageInput').click()}
                                        className={`aspect-square md:aspect-auto h-full min-h-[200px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group transition-all ${previewUrl ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent hover:bg-secondary'
                                            }`}
                                    >
                                        {previewUrl ? (
                                            <>
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <Camera className="text-white" size={32} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3 text-muted group-hover:text-accent group-hover:scale-110 transition-all">
                                                    <Camera size={24} />
                                                </div>
                                                <p className="text-sm font-medium text-muted px-4 text-center">Click to upload photo</p>
                                                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">PNG, JPG or WebP up to 5MB</p>
                                            </>
                                        )}
                                        <input
                                            id="imageInput"
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest">Title</label>
                                        <input
                                            type="text"
                                            required
                                            className="input-field py-3"
                                            placeholder="e.g., Summer Education Camp 2024"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest">Category</label>
                                        <select
                                            className="input-field py-3 appearance-none bg-white"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="event">Event</option>
                                            <option value="volunteer">Volunteer Work</option>
                                            <option value="community">Community</option>
                                            <option value="education">Education</option>
                                            <option value="healthcare">Healthcare</option>
                                            <option value="livelihood">Livelihood</option>
                                            <option value="environment">Environment</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-primary uppercase tracking-widest">Short Description</label>
                                <textarea
                                    rows="3"
                                    required
                                    className="input-field py-3 resize-none"
                                    placeholder="Describe the moment and its impact..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2.5 rounded-xl text-primary font-bold hover:bg-secondary transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-primary px-8 py-2.5 flex items-center gap-2 shadow-lg shadow-primary/10"
                                >
                                    {submitting ? (
                                        <><Loader2 size={18} className="animate-spin" /> {editingItem ? 'Updating...' : 'Uploading...'}</>
                                    ) : (
                                        <>{editingItem ? 'Update Photo' : 'Upload to Gallery'}</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminGallery;
