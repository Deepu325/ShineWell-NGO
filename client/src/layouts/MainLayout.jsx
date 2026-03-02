import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Navigation Spacer to prevent content overlapping */}
            <div className="h-[72px] md:h-[88px] bg-primary"></div>
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" />
        </div>
    );
};

export default MainLayout;
