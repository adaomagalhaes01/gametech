import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onOpenModal }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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

    const toggleMenu = () => setIsOpen(!isOpen);

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

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white hover:text-game-purple transition-colors">
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-[88px] h-[calc(100vh-88px)] bg-game-dark/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center gap-8 p-6"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-tech text-2xl uppercase tracking-[0.2em] text-white hover:text-game-purple transition-all"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                onOpenModal();
                                setIsOpen(false);
                            }}
                            className="btn-primary w-full py-4 text-lg font-tech mt-4"
                        >
                            Orçamento
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
