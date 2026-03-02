import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FileText, Plus, Edit2, Trash2, ExternalLink, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await api.get('/blogs');
            setBlogs(data.data);
        } catch (err) {
            toast.error('Failed to load blogs');
        } finally {
            setLoading(false);
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
        <div className="p-32">
            <div className="flex justify-between items-center mb-32">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Blog Management</h1>
                    <p className="text-muted">Publish and edit impact stories</p>
                </div>
                <button className="btn-accent flex items-center gap-8 px-24 font-bold">
                    Create New Post <Plus size={18} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
                {loading ? (
                    <p className="col-span-full text-center py-80 text-muted">Loading stories...</p>
                ) : blogs.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center py-80 bg-white rounded-card border-2 border-dashed border-gray-200">
                        <FileText size={48} className="text-gray-300 mb-16" />
                        <p className="text-muted mb-24">No blog posts found.</p>
                        <button className="btn-primary px-32">Write your first story</button>
                    </div>
                ) : blogs.map((blog) => (
                    <div key={blog._id} className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="h-200 overflow-hidden relative">
                            <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
                            <div className={`absolute top-16 right-16 px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {blog.isPublished ? 'Published' : 'Draft'}
                            </div>
                        </div>
                        <div className="p-24 flex-grow">
                            <h3 className="text-xl font-bold text-primary mb-8 line-clamp-1">{blog.title}</h3>
                            <p className="text-sm text-muted mb-16 line-clamp-2">{blog.excerpt}</p>
                            <div className="flex items-center gap-12 text-xs text-muted mb-24">
                                <span className="flex items-center gap-4"><Edit2 size={12} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                <span>By {blog.author?.name}</span>
                            </div>
                            <div className="flex justify-between gap-12 pt-16 border-t border-gray-100 mt-auto">
                                <div className="flex gap-8">
                                    <button className="p-8 text-primary hover:bg-secondary rounded-lg transition-colors" title="Edit">
                                        <Edit2 size={18} />
                                    </button>
                                    <button className="p-8 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete" onClick={() => handleDelete(blog._id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <a
                                    href={`/blog/${blog.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-8 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                                    title="View on site"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminBlogs;
