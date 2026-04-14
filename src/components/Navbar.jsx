import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 border-b border-gray-100' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="font-tech font-black text-2xl tracking-tighter text-game-dark uppercase italic">
                        GAME <span className="text-game-primary">TECH</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-tech text-xs uppercase tracking-[0.2em] text-game-dark/70 hover:text-game-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link
                        to="/login"
                        className="font-tech text-xs uppercase tracking-[0.2em] text-game-dark hover:text-game-primary transition-colors"
                    >
                        Entrar
                    </Link>
                    <button
                        onClick={onOpenModal}
                        className="btn-primary py-2 px-6 text-xs"
                    >
                        Orçamento
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-game-dark hover:text-game-primary transition-colors">
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-[88px] h-[calc(100vh-88px)] bg-white z-40 md:hidden flex flex-col items-center justify-center gap-8 p-6"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-tech text-3xl uppercase tracking-tighter font-black text-game-dark hover:text-game-primary transition-all italic"
                            >
                                {link.name}
                            </a>
                        ))}
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="font-tech text-xl uppercase tracking-widest text-game-dark border border-gray-200 w-full text-center py-4"
                        >
                            Entrar
                        </Link>
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
