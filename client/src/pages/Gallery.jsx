import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Info } from 'lucide-react';
import api from '../services/api';
import PageHero from '../components/PageHero';

const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/gallery');
            setGallery(data.data);
        } catch (err) {
            console.error('Failed to fetch gallery', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white">
            <PageHero
                badge="Impact Captured"
                title="Our Vibrant"
                titleAccent="Community"
                description="Witness the transformative power of your support through our documented moments of change, empowerment, and hope."
                image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            />

            <section className="layout-section">
                <div className="container-custom">

                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-muted">
                            <div className="w-14 h-14 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="font-medium">Discovering moments...</p>
                        </div>
                    ) : gallery.length === 0 ? (
                        <div className="py-20 text-center bg-secondary/10 rounded-panel border-2 border-dashed border-gray-200">
                            <p className="text-muted text-lg">No photos found in this category yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                            {gallery.map((item, idx) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="group relative aspect-square rounded-card overflow-hidden cursor-pointer shadow-card"
                                    onClick={() => setSelectedImage(item)}
                                >
                                    <img
                                        src={item.imageURL}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{item.category}</span>
                                        <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                                        <div className="flex items-center gap-2 text-white/70 text-xs">
                                            <Maximize2 size={12} /> View Story
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal (Copied from Section for consistency) */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/95 backdrop-blur-md p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-panel overflow-hidden max-w-5xl w-full max-h-full flex flex-col lg:flex-row shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="lg:w-2/3 h-[40vh] lg:h-auto bg-black">
                                <img
                                    src={selectedImage.imageURL}
                                    alt={selectedImage.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="lg:w-1/3 p-8 md:p-10 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full">{selectedImage.category}</span>
                                    <span className="text-muted text-xs font-medium">{new Date(selectedImage.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <h3 className="text-3xl font-heading font-bold text-primary mb-4">{selectedImage.title}</h3>
                                <div className="w-10 h-1 bg-accent mb-6" />
                                <div className="text-muted leading-relaxed overflow-y-auto mb-8 flex-grow pr-4 custom-scrollbar">
                                    <p>{selectedImage.description}</p>
                                </div>
                                <div className="bg-secondary/30 p-5 rounded-xl flex items-start gap-4 mt-auto">
                                    <Info size={20} className="text-accent shrink-0 mt-1" />
                                    <p className="text-xs text-muted leading-relaxed">This moment represents one of our many success stories. Every contribution helps us create more such moments.</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
