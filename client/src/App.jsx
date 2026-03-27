import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';

// Pages (to be implemented)
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Impact from './pages/Impact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Gallery from './pages/Gallery';

import ThankYou from './pages/ThankYou';
import Volunteer from './pages/Volunteer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

// Admin Pages (to be implemented)
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                <Route path="/programs" element={<MainLayout><Programs /></MainLayout>} />
                <Route path="/impact" element={<MainLayout><Impact /></MainLayout>} />
                <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
                <Route path="/blog/:slug" element={<MainLayout><BlogPost /></MainLayout>} />
                <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                <Route path="/donate" element={<MainLayout><Donate /></MainLayout>} />
                <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />

                <Route path="/thank-you" element={<MainLayout><ThankYou /></MainLayout>} />
                <Route path="/volunteer" element={<MainLayout><Volunteer /></MainLayout>} />
                <Route path="/privacy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
                <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
