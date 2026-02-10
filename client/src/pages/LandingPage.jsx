import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Impact from '../components/Impact';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-ice-blue font-sans">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <Impact />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
