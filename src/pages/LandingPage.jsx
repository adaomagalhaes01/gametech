import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

// Lazy load non-critical components
const About = lazy(() => import('../components/About'));
const Product = lazy(() => import('../components/Product'));
const Services = lazy(() => import('../components/Services'));
const Team = lazy(() => import('../components/Team'));
const Footer = lazy(() => import('../components/Footer'));
const BudgetModal = lazy(() => import('../components/BudgetModal'));

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="relative bg-white">
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                    >
                        <div className="relative h-20 w-20">
                            <div className="absolute inset-0 rounded-full border-4 border-game-primary border-t-transparent animate-spin"></div>
                            <div className="absolute inset-2 rounded-full border-4 border-game-accent border-b-transparent animate-spin-slow"></div>
                            <div className="absolute inset-0 flex items-center justify-center font-tech font-bold text-xs tracking-tighter text-game-dark">GT</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Navbar onOpenModal={openModal} />
                    <main>
                        <Hero onOpenModal={openModal} />
                        <div className="relative">
                            <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40 -z-10 h-full w-full"></div>
                            <Suspense fallback={<div className="h-40 flex items-center justify-center text-game-purple">Carregando...</div>}>
                                <About />
                                <Product />
                                <Services onOpenModal={openModal} />
                                <Team />
                            </Suspense>
                        </div>
                    </main>
                    <Suspense fallback={null}>
                        <Footer />
                    </Suspense>

                    <AnimatePresence>
                        {isModalOpen && (
                            <Suspense fallback={null}>
                                <BudgetModal onClose={closeModal} />
                            </Suspense>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default LandingPage;
