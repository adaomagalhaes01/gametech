import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ onOpenModal }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Sobre', href: '#sobre' },
        { name: 'Jogo', href: '#jogo' },
        { name: 'Serviços', href: '#servicos' },
        { name: 'Equipa', href: '#equipa' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-game-dark/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img
                        src="/assets/logo-new.png"
                        alt="Game Tech Logo"
                        className="h-16 w-auto object-contain"
                        loading="eager"
                        decoding="async"
                    />
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-tech text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={onOpenModal}
                        className="btn-primary py-2 px-6 text-sm"
                    >
                        Orçamento
                    </button>
                </div>

                {/* Mobile Menu Button (Simplified for now) */}
                <div className="md:hidden">
                    <button className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
