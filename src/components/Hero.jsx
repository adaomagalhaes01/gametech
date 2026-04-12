import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = ({ onOpenModal }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const charY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center">
            {/* Background Layer (Slow Parallax) */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-game-dark/40 z-10"></div>
                <img
                    src="/assets/hero-bg.png"
                    alt="Gaming City"
                    className="w-full h-full object-cover scale-110"
                    loading="lazy"
                    decoding="async"
                />
            </motion.div>

            {/* Content Layer (Medium Parallax) */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center justify-between">
                <motion.div
                    style={{ y: textY }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="max-w-2xl text-center md:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="inline-block px-4 py-1 bg-game-purple/20 border border-game-purple/50 rounded-full text-game-purple font-tech text-xs uppercase tracking-[0.3em] mb-6"
                    >
                        Nivelando o Futuro
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-tech font-black text-white leading-tight mb-4 italic uppercase">
                        GAME <span className="text-game-purple drop-shadow-[0_0_15px_rgba(138,43,226,0.8)]">TECH</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 font-sans mb-10 max-w-lg leading-relaxed">
                        Criando experiências digitais através de jogos. Transformamos ideias em universos interativos e imersivos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => document.getElementById('servicos').scrollIntoView()}
                            className="btn-primary"
                        >
                            Ver nossos serviços
                        </button>
                        <button
                            onClick={onOpenModal}
                            className="btn-secondary"
                        >
                            Solicitar Orçamento
                        </button>
                    </div>
                </motion.div>

                {/* Character Layer (Fast Parallax) */}
                <motion.div
                    style={{ y: charY }}
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="hidden lg:block relative w-[500px] h-[600px]"
                >
                    <div className="absolute inset-0 bg-game-purple/20 blur-[100px] rounded-full animate-glow-pulse"></div>
                    <img
                        src="/assets/hero-character-new.png"
                        alt="Game Character"
                        className="w-full h-full object-contain relative z-10 animate-float"
                        loading="eager"
                        decoding="async"
                    />
                </motion.div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30 z-10"></div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-game-dark to-transparent z-20"></div>
        </section>
    );
};

export default Hero;
