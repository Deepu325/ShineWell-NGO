import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FileText, Plus, Edit2, Trash2, Camera, X, Loader2, Save, Eye, Globe, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        featuredImage: null,
        isPublished: false,
        tags: ''
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await api.get('/blogs');
            setBlogs(data.data);
        } catch (err) {
            toast.error('Failed to load blog posts');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, featuredImage: file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            featuredImage: null,
            isPublished: false,
            tags: ''
        });
        setPreviewUrl(null);
        setEditingItem(null);
        setIsModalOpen(false);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            excerpt: item.excerpt,
            content: item.content,
            featuredImage: null,
            isPublished: item.isPublished,
            tags: item.tags ? item.tags.join(', ') : ''
        });
        setPreviewUrl(item.featuredImage);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('excerpt', formData.excerpt);
        data.append('content', formData.content);
        data.append('isPublished', formData.isPublished);

        // Handle tags
        if (formData.tags) {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim());
            tagsArray.forEach(tag => data.append('tags[]', tag));
        }

        if (formData.featuredImage) {
            data.append('featuredImage', formData.featuredImage);
        }

        try {
            if (editingItem) {
                await api.put(`/blogs/${editingItem._id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Blog post updated');
            } else {
                if (!formData.featuredImage) {
                    toast.error('Please upload a featured image');
                    setSubmitting(false);
                    return;
                }
                await api.post('/blogs', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Blog post published');
            }
            fetchBlogs();
            resetForm();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Action failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/blogs/${id}`);
                toast.success('Post deleted');
                fetchBlogs();
            } catch (err) {
                toast.error('Deletion failed');
            }
        }
    };

    return (
        <div className="p-8 lg:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Blog Management</h1>
                    <p className="text-muted">Publish and edit impact stories from across the field</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-accent flex items-center gap-2 px-6 font-bold shadow-lg shadow-accent/20"
                >
                    Create New Post <Plus size={18} />
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-muted">
                    <Loader2 size={40} className="animate-spin mb-4" />
                    <p>Loading your stories...</p>
                </div>
            ) : blogs.length === 0 ? (
                <div className="flex flex-col items-center py-24 bg-white rounded-card border-2 border-dashed border-gray-200 text-center px-8">
                    <FileText size={64} className="text-gray-300 mb-6" />
                    <h3 className="text-xl font-bold text-primary mb-2">No stories published yet</h3>
                    <p className="text-muted mb-8 max-w-sm">Start by sharing an impact story or a news update with your community.</p>
                    <button onClick={() => setIsModalOpen(true)} className="btn-primary px-8">Write your first story</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="group bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all duration-300">
                            <div className="h-60 overflow-hidden relative">
                                <img
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-1 ${blog.isPublished ? 'bg-green-100/90 text-green-700' : 'bg-yellow-100/90 text-yellow-700'
                                    }`}>
                                    {blog.isPublished ? <Globe size={10} /> : <Lock size={10} />}
                                    {blog.isPublished ? 'Published' : 'Draft'}
                                </div>
                            </div>
                            <div className="p-7 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-primary mb-3 line-clamp-1 group-hover:text-accent transition-colors">{blog.title}</h3>
                                <p className="text-sm text-muted mb-5 line-clamp-2 leading-relaxed">{blog.excerpt}</p>

                                <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-muted uppercase tracking-widest">
                                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span className="text-accent">{blog.author?.name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="p-2 text-primary hover:bg-secondary rounded-lg transition-colors"
                                            title="Edit Story"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Story"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-card shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-primary">{editingItem ? 'Edit Story' : 'New Impact Story'}</h2>
                            <button onClick={resetForm} className="p-2 text-muted hover:text-primary transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest">Story Title</label>
                                        <input
                                            type="text"
                                            required
                                            className="input-field py-3"
                                            placeholder="Catchy, impactful title..."
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    {/* Excerpt */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-primary uppercase tracking-widest">Short Excerpt</label>
                                        <textarea
                                            rows="3"
                                            required
                                            className="input-field py-3 resize-none"
                                            placeholder="A brief summary for the preview card..."
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        ></textarea>
                                    </div>

                                    {/* Status & Tags */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-primary uppercase tracking-widest">Status</label>
                                            <div className="flex items-center gap-3 h-14">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
                                                    className={`w-12 h-6 rounded-full relative transition-colors ${formData.isPublished ? 'bg-accent' : 'bg-gray-200'}`}
                                                >
                                                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.isPublished ? 'translate-x-6' : ''}`} />
                                                </button>
                                                <span className="text-sm font-bold text-primary">{formData.isPublished ? 'Public' : 'Draft'}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-primary uppercase tracking-widest">Tags</label>
                                            <input
                                                type="text"
                                                className="input-field py-3 text-sm"
                                                placeholder="Health, Education..."
                                                value={formData.tags}
                                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Featured Image */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-primary uppercase tracking-widest">Featured Image</label>
                                    <div
                                        onClick={() => document.getElementById('featuredImageInput').click()}
                                        className={`aspect-video md:aspect-auto h-full min-h-[240px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group transition-all ${previewUrl ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent hover:bg-secondary'
                                            }`}
                                    >
                                        {previewUrl ? (
                                            <>
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <Camera className="text-white" size={40} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 text-muted group-hover:text-accent group-hover:scale-110 transition-all">
                                                    <Camera size={28} />
                                                </div>
                                                <p className="text-sm font-bold text-muted px-6 text-center leading-tight">Click to upload <br />featured image</p>
                                                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">16:9 Landscape Photos</p>
                                            </>
                                        )}
                                        <input
                                            id="featuredImageInput"
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-primary uppercase tracking-widest">Full Story Content</label>
                                <textarea
                                    rows="10"
                                    required
                                    className="input-field p-6 text-sm leading-relaxed font-serif"
                                    placeholder="Write the full story here. You can use Markdown for formatting..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-4 pt-8 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-8 py-3 rounded-xl text-primary font-bold hover:bg-secondary transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-accent px-12 py-3 flex items-center gap-2 shadow-xl shadow-accent/20"
                                >
                                    {submitting ? (
                                        <><Loader2 size={18} className="animate-spin" /> Processing...</>
                                    ) : (
                                        <><Save size={18} /> {editingItem ? 'Update Story' : 'Publish Story'}</>
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

export default AdminBlogs;
