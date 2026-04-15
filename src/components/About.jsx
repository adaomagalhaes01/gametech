import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Zap } from 'lucide-react';

const About = () => {

    return (
        <section id="sobre" className="py-24 relative overflow-hidden bg-game-dark">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h2 className="text-game-primary font-tech text-xs uppercase tracking-[0.4em] mb-4 flex items-center gap-2 font-bold">
                            <span className="w-12 h-[2px] bg-game-primary inline-block"></span>
                            A EMPRESA
                        </h2>
                        <h3 className="section-title text-white mb-8 uppercase italic tracking-tighter">
                            LIDERANDO A REVOLUÇÃO <span className="text-game-primary">DIGITAL EM ANGOLA</span>
                        </h3>
                        <div className="space-y-6 text-white/60 text-lg leading-relaxed mb-8">
                            <p>
                                A GameTech é uma startup angolana focada no desenvolvimento de jogos digitais interativos, com o objetivo de promover inovação, entretenimento e educação através da tecnologia.
                            </p>
                            <p className="bg-white/5 p-6 border-l-4 border-game-primary text-white/80">
                                "Nosso foco está na criação de jogos acessíveis ao público angolano, valorizando a cultura local e impulsionando o potencial de crescimento do mercado nacional."
                            </p>
                            <p>
                                Do ponto de vista social e económico, contribuímos para a formação de jovens, criação de empregos e o desenvolvimento da indústria digital no país, tornando-nos uma referência no setor.
                            </p>
                        </div>
                        <div className="flex items-center gap-12">
                            <div className="flex flex-col">
                                <span className="text-4xl font-tech font-black text-white">100%</span>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Angolana</span>
                            </div>
                            <div className="h-12 w-[1px] bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-tech font-black text-game-primary">+Impacto</span>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Social</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 border border-white/10 p-2 bg-white/5 backdrop-blur-md rotate-2 hover:rotate-0 transition-transform duration-500 rounded-xl overflow-hidden shadow-2xl shadow-game-primary/10">
                            <img src="/assets/game_construct.jpg" alt="GameTech Development Environment" className="w-full h-[500px] object-cover opacity-80" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-game-primary/10 -z-10 rounded-full blur-3xl"></div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/5">
                    {[
                        {
                            title: 'Missão',
                            desc: 'Promover inovação e educação através de jogos digitais que valorizam a cultura local.',
                            icon: <Target className="w-8 h-8 text-game-primary" />,
                        },
                        {
                            title: 'Visão',
                            desc: 'Tornar-se a principal referência no setor de jogos digitais em Angola e na África Austral.',
                            icon: <Eye className="w-8 h-8 text-game-primary" />,
                        },
                        {
                            title: 'Impacto',
                            desc: 'Gerar empregos e capacitar jovens no setor tecnológico e criativo de Angola.',
                            icon: <Zap className="w-8 h-8 text-game-primary" />,
                        }
                    ].map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-12 border-r border-white/5 last:border-r-0 hover:bg-white/5 transition-colors group"
                        >
                            <div className="mb-8 text-game-primary group-hover:scale-110 transition-transform">
                                {card.icon}
                            </div>
                            <h4 className="text-xl font-tech font-black text-white mb-4 uppercase italic tracking-tighter">{card.title}</h4>
                            <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
