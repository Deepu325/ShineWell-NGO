import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Maximize2, X, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const GALLERY_IMAGES = [
    {
        src: '/images/gallery/field-work-1.jpg',
        alt: 'Shinewell community outreach program',
        label: 'Community Outreach',
    },
    {
        src: '/images/gallery/field-work-2.jpg',
        alt: 'Education support for underprivileged children',
        label: 'Education',
    },
    {
        src: '/images/gallery/field-work-3.jpg',
        alt: 'Healthcare awareness in rural areas',
        label: 'Healthcare',
    },
    {
        src: '/images/gallery/field-work-4.jpg',
        alt: 'Volunteer-driven field activities',
        label: 'Field Work',
    },
    {
        src: '/images/gallery/field-work-5.jpg',
        alt: 'Empowering women through skill training',
        label: 'Empowerment',
    },
    {
        src: '/images/gallery/field-work-6.jpg',
        alt: 'Food and supply distribution drive',
        label: 'Distribution',
    },
    {
        src: '/images/gallery/field-work-7.jpg',
        alt: 'Community development initiatives',
        label: 'Development',
    },
    {
        src: '/images/gallery/field-work-8.jpg',
        alt: 'On-ground impact and engagement',
        label: 'Impact',
    },
    {
        src: '/images/gallery/field-work-9.jpg',
        alt: 'NGO field operations across India',
        label: 'Operations',
    },
];

const GallerySection = () => {
    const trackRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const duplicatedImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

    return (
        <section className="py-16 md:py-24 lg:py-32 overflow-hidden bg-secondary/10">
            <div className="max-w-[1200px] mx-auto px-6 md:px-8 mb-12 md:mb-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div className="max-w-xl">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
                            Our Impact in Action
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
                            Moments of{' '}
                            <span className="text-accent underline decoration-accent/20 underline-offset-8">
                                Change
                            </span>
                        </h2>
                        <p className="text-muted mt-4 text-lg leading-relaxed">
                            Real stories, real impact — captured from the field.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="p-3 rounded-full border-2 border-primary/10 hover:border-accent hover:text-accent text-primary transition-all duration-300"
                            aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
                        >
                            {isPaused ? <Play size={18} /> : <Pause size={18} />}
                        </button>
                        <Link
                            to="/gallery"
                            className="inline-flex items-center justify-center rounded-btn font-bold transition-all duration-300 active:scale-95 whitespace-nowrap min-h-[44px] bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:-translate-y-0.5 px-6 py-2 text-sm group"
                        >
                            View Full Gallery{' '}
                            <ArrowRight
                                size={18}
                                className="ml-2 group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sliding Track */}
            <div
                className="gallery-wrapper"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    ref={trackRef}
                    className={`gallery-track ${isPaused ? 'paused' : ''}`}
                >
                    {duplicatedImages.map((image, index) => (
                        <div
                            key={index}
                            className="gallery-item group"
                            onClick={() => setSelectedImage(image)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                                draggable={false}
                            />
                            <div className="gallery-overlay">
                                <span className="gallery-label">{image.label}</span>
                                <div className="flex items-center gap-1.5 text-white/80 text-xs">
                                    <Maximize2 size={12} /> View
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/95 backdrop-blur-md p-6"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>
                    <div
                        className="max-w-4xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="w-full max-h-[75vh] object-contain rounded-panel"
                        />
                        <p className="text-white text-center mt-4 font-heading text-lg">
                            {selectedImage.alt}
                        </p>
                        <p className="text-accent text-center text-sm font-bold uppercase tracking-widest mt-1">
                            {selectedImage.label}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GallerySection;
