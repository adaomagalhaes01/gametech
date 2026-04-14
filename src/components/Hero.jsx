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
        <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center bg-white">
            {/* Background Layer (Slow Parallax) */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-white/40 z-10 transition-colors duration-500"></div>
                <img
                    src="/assets/game_forest.jpg"
                    alt="Game Backdrop"
                    className="w-full h-full object-cover scale-110 opacity-20 grayscale"
                    loading="lazy"
                />
            </motion.div>

            {/* Content Layer (Medium Parallax) */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col lg:flex-row items-center justify-between">
                <motion.div
                    style={{ y: textY }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="max-w-3xl text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="inline-block px-4 py-1 bg-game-primary/10 border-l-4 border-game-primary text-game-primary font-tech text-xs uppercase tracking-[0.3em] mb-6"
                    >
                        Inovação & Jogos Digitais
                    </motion.div>
                    <h1 className="text-4xl md:text-7xl font-tech font-black text-game-dark leading-none mb-6 italic uppercase tracking-tighter">
                        GAMETECH
                        <br />
                        <span className="text-2xl md:text-4xl block mt-2 text-game-dark/60 italic">Inovando o Futuro Digital</span>
                    </h1>
                    <p className="text-base md:text-lg text-game-dark/70 font-sans mb-10 max-w-xl leading-relaxed">
                        Startup angolana dedicada a transformar educação e entretenimento através de tecnologia de ponta e cultura local.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button
                            onClick={() => document.getElementById('sobre').scrollIntoView()}
                            className="btn-primary"
                        >
                            Conhecer Empresa
                        </button>
                        <button
                            onClick={() => document.getElementById('jogo').scrollIntoView()}
                            className="btn-secondary"
                        >
                            Ver Nosso Jogo
                        </button>
                    </div>
                </motion.div>

                {/* Character/Game UI Layer (Fast Parallax) */}
                <motion.div
                    style={{ y: charY }}
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="hidden lg:block relative w-[600px] h-[400px]"
                >
                    <div className="absolute inset-0 bg-game-primary/5 blur-[120px] rounded-full"></div>
                    <div className="relative z-10 p-2 bg-white border-2 border-game-dark shadow-[20px_20px_0px_0px_rgba(255,70,85,1)]">
                        <img
                            src="/assets/game_forest.jpg"
                            alt="Jornada da Coelha Gameplay"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-game-primary text-white font-tech text-[10px] px-2 py-1 uppercase font-bold">LIVE ALPHA 0.1</div>
                    </div>
                    {/* Elementos decorativos estilo Riot */}
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-game-accent/20 blur-2xl"></div>
                </motion.div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 grid-pattern pointer-events-none opacity-20 z-10"></div>

            <div className="absolute bottom-10 left-6 z-20 hidden md:block">
                <div className="flex flex-col gap-2">
                    <div className="w-1 h-12 bg-game-primary"></div>
                    <span className="font-tech text-[10px] uppercase tracking-[0.5em] vertical-text text-game-dark/40">SCROLL</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
