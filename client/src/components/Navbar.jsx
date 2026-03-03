import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Programs', path: '/programs' },
        { name: 'Impact', path: '/impact' },
        { name: 'Volunteer', path: '/volunteer' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-normal ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
            <div className="container-custom flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <Heart className="text-accent h-5 w-5 fill-accent" />
                    </div>
                    <span className={`text-xl font-heading font-bold tracking-tight ${scrolled ? 'text-primary' : 'text-white'}`}>
                        Shine Well <span className="text-accent">NGO</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-12">
                    <div className="flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-bold tracking-wide transition-all duration-300 relative group/link ${scrolled
                                    ? (location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path)) ? 'text-accent' : 'text-primary/70 hover:text-primary')
                                    : (location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path)) ? 'text-accent' : 'text-white/80 hover:text-white')
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover/link:w-full ${location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path)) ? 'w-full' : ''}`} />
                            </Link>
                        ))}
                    </div>
                    <Link to="/donate" className="btn-accent btn-sm shadow-xl shadow-accent/10">
                        Donate Now
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-primary hover:bg-secondary' : 'text-white hover:bg-white/10'}`} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl py-8 flex flex-col items-center gap-6 animate-fade-in border-t border-gray-100">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-base font-bold tracking-wide ${location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path)) ? 'text-accent' : 'text-primary'}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/donate" className="btn-accent btn-sm" onClick={() => setIsOpen(false)}>
                        Donate Now
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
