import React from 'react';
import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ProfileSelector from './ProfileSelector';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/20 bg-white/10 backdrop-blur-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="p-1 bg-gradient-to-br from-deep-emerald to-emerald-500 rounded-lg text-white">
                        <Activity size={24} />
                    </div>
                    <span className="self-center text-xl font-bold whitespace-nowrap text-deep-emerald">SwasthyaSathi</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4">
                    <ProfileSelector />
                    <button type="button" className="text-white bg-deep-emerald hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-3 py-1 text-center shadow-lg hover:shadow-xl transition-all duration-300 hidden md:block">
                        Get Started
                    </button>
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-1 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                    <ul className="flex flex-col p-2 md:p-0 mt-2 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <a href="/" className="block py-1 px-2 text-white bg-deep-emerald rounded md:bg-transparent md:text-deep-emerald md:p-0" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/chat" className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-deep-emerald md:p-0 transition-colors">💬 Chat</a>
                        </li>
                        <li>
                            <a href="/symptom-checker" className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-deep-emerald md:p-0 transition-colors">🤒 Symptoms</a>
                        </li>
                        <li>
                            <a href="/vaccination" className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-deep-emerald md:p-0 transition-colors">💉 Vaccines</a>
                        </li>
                        <li>
                            <a href="/climate-alerts" className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-deep-emerald md:p-0 transition-colors">⚠️ Alerts</a>
                        </li>
                        <li>
                            <a href="/disease-outbreaks" className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-deep-emerald md:p-0 transition-colors">🔔 Outbreaks</a>
                        </li>
                        <li>
                            <a href="/healthcare-finder" className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-deep-emerald md:p-0 transition-colors">🏥 Hospitals</a>
                        </li>
                        <li>
                            <a href="/admin-dashboard" className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-deep-emerald md:p-0 transition-colors">📊 Dashboard</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
