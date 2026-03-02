import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, MessageSquare } from 'lucide-react';
import api from '../services/api';
import PageHero from '../components/PageHero';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await api.get('/blogs');
                setBlogs(data.data);
            } catch (err) {
                console.error('Error fetching blogs');
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-primary font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading our stories...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <PageHero
                badge="Our Chronicles"
                title="Voices from the"
                titleAccent="Frontlines"
                description="Read about the lives we're changing, the challenges we face, and the progress we're making together in our mission for dignity."
                image="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
            />

            <section className="layout-section">
                <div className="container-custom">
                    {/* Featured Post */}
                    {blogs.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-20 lg:mb-32 rounded-panel overflow-hidden shadow-hero group border border-gray-100 bg-white"
                        >
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-3/5 aspect-video lg:aspect-auto overflow-hidden">
                                    <img
                                        src={blogs[0].featuredImage}
                                        alt={blogs[0].title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                </div>
                                <div className="lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-xs text-accent font-bold mb-6 uppercase tracking-widest">
                                        <span className="bg-accent/10 px-4 py-1.5 rounded-full">Featured Story</span>
                                        <span className="flex items-center gap-2 text-muted"><Calendar size={14} /> {new Date(blogs[0].createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight group-hover:text-accent transition-colors">
                                        <Link to={`/blog/${blogs[0].slug}`}>{blogs[0].title}</Link>
                                    </h2>
                                    <p className="text-lg text-muted mb-8 line-clamp-4 leading-relaxed">
                                        {blogs[0].excerpt}
                                    </p>
                                    <Link to={`/blog/${blogs[0].slug}`} className="btn-primary w-fit group/btn">
                                        Read Full Story <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {blogs.slice(1).map((blog, idx) => (
                            <motion.div
                                key={blog._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (idx % 3) * 0.1 }}
                                className="group flex flex-col bg-white rounded-card overflow-hidden border border-border hover:shadow-floating transition-all duration-300"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={blog.featuredImage}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-accent mb-4">
                                        <span className="flex items-center gap-2"><Calendar size={12} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-2 text-muted"><User size={12} /> {blog.author?.name || 'Team Shine'}</span>
                                    </div>
                                    <h3 className="text-xl font-heading font-bold mb-4 group-hover:text-accent transition-colors leading-tight line-clamp-2">
                                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                                    </h3>
                                    <p className="text-muted mb-6 line-clamp-3 leading-relaxed text-sm">
                                        {blog.excerpt}
                                    </p>
                                    <Link to={`/blog/${blog.slug}`} className="text-primary font-bold flex items-center gap-2 group/link mt-auto text-sm">
                                        Keep Reading <ArrowRight size={16} className="text-accent group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {blogs.length === 0 && !loading && (
                        <div className="text-center py-20">
                            <MessageSquare size={64} className="mx-auto text-accent mb-6 opacity-20" />
                            <h3 className="text-2xl font-heading font-bold mb-2">No stories found yet.</h3>
                            <p className="text-muted">Stay tuned as we document our impact on the frontlines.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
