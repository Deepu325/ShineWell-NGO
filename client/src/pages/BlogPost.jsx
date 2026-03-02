import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, MessageSquare } from 'lucide-react';
import api from '../services/api';

const BlogPost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await api.get(`/blogs/${slug}`);
                setBlog(data.data);
            } catch (err) {
                console.error('Error fetching blog');
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return <div className="pt-120 min-h-screen text-center">Loading story...</div>;
    if (!blog) return <div className="pt-120 min-h-screen text-center">Story not found.</div>;

    return (
        <article className="pb-120 bg-white min-h-screen">
            {/* Immersive Header */}
            <div className="relative pt-120 pb-80 bg-primary mb-80 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover opacity-20 blur-sm scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/80 to-primary"></div>
                </div>

                <div className="container-custom relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link to="/blog" className="inline-flex items-center gap-12 text-accent font-bold mb-48 hover:gap-16 transition-all group">
                            <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" /> Back to Chronicles
                        </Link>
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-24 block">Report from the Field</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-48 leading-[1.1] text-white">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-48 text-gray-400">
                            <div className="flex items-center gap-16">
                                <div className="w-56 h-56 bg-accent rounded-2xl flex items-center justify-center text-primary font-bold text-xl shadow-lg shadow-accent/20">
                                    {blog.author?.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-bold">{blog.author?.name}</p>
                                    <p className="text-xs uppercase tracking-widest text-accent">Field Volunteer</p>
                                </div>
                            </div>
                            <div className="h-40 w-1 bg-white/10 hidden md:block"></div>
                            <div className="flex items-center gap-12">
                                <Calendar size={20} className="text-accent" />
                                <span className="font-medium">{new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-80">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-2/3"
                    >
                        <div className="relative mb-80 rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
                            <img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div
                            className="prose prose-xl max-w-none prose-headings:font-heading prose-headings:text-primary prose-p:text-muted prose-p:leading-relaxed prose-strong:text-primary prose-blockquote:border-accent prose-blockquote:bg-secondary/50 prose-blockquote:p-32 prose-blockquote:rounded-2xl"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* Author Bio */}
                        <div className="mt-120 p-56 bg-secondary/50 rounded-[3rem] border border-gray-100 relative overflow-hidden group">
                            <div className="flex flex-col md:flex-row items-center gap-32 relative z-10">
                                <div className="w-120 h-120 bg-primary text-white flex items-center justify-center rounded-[2rem] text-4xl font-bold shadow-2xl group-hover:scale-105 transition-transform">
                                    {blog.author?.name.charAt(0)}
                                </div>
                                <div className="text-center md:text-left">
                                    <h4 className="text-2xl font-bold mb-8">{blog.author?.name}</h4>
                                    <p className="text-accent font-bold tracking-widest uppercase text-xs mb-16">Shine Well Editorial Team</p>
                                    <p className="text-muted leading-relaxed max-w-xl">
                                        Dedicated to bringing stories from the ground to our supporters. Believe in the power of words to drive social change and empower the voiceless.
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-32 opacity-5">
                                <MessageSquare size={160} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar / Actions */}
                    <aside className="lg:w-1/3">
                        <div className="sticky top-120 space-y-32">
                            <div className="card bg-primary text-white p-48 rounded-[3rem] shadow-2xl shadow-primary/20">
                                <h4 className="text-2xl font-bold mb-24">Liked this story?</h4>
                                <p className="text-gray-400 mb-40 leading-relaxed">Your support ensures we can continue our mission and bring more such impacts to life.</p>
                                <div className="space-y-16">
                                    <Link to="/donate" className="btn-accent w-full justify-center flex items-center gap-12 py-20 text-lg">
                                        Support Our Cause <Heart size={20} className="fill-current" />
                                    </Link>
                                    <Link to="/volunteer" className="btn-outline border-white/20 text-white hover:bg-white hover:text-primary w-full justify-center flex items-center gap-12 py-20 text-lg">
                                        Join the Team <Users size={20} />
                                    </Link>
                                </div>
                            </div>

                            <div className="card bg-white p-40 rounded-[3rem] border border-gray-100 shadow-xl">
                                <h4 className="font-bold text-xl mb-24">Share the Impact</h4>
                                <div className="flex gap-16">
                                    <button className="w-56 h-56 bg-secondary rounded-2xl flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all shadow-sm">
                                        <Facebook size={24} />
                                    </button>
                                    <button className="w-56 h-56 bg-secondary rounded-2xl flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all shadow-sm">
                                        <Twitter size={24} />
                                    </button>
                                    <button className="w-56 h-56 bg-secondary rounded-2xl flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all shadow-sm">
                                        <Share2 size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
};

// Simple utility to simulate Lucide icon in prose if needed
const Heart = ({ size, className }) => <span className={className}><MessageSquare size={size} /></span>;

export default BlogPost;
