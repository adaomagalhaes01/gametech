import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
    const cards = [
        {
            title: 'Missão',
            desc: 'Desenvolver jogos que transcendam o entretenimento, criando conexões reais e experiências memoráveis.',
            icon: <Target className="w-8 h-8 text-game-purple" />,
            color: 'border-game-purple/30'
        },
        {
            title: 'Visão',
            desc: 'Ser a principal referência em desenvolvimento de jogos inovadores no mercado africano e global.',
            icon: <Eye className="w-8 h-8 text-game-blue" />,
            color: 'border-game-blue/30'
        },
        {
            title: 'Valores',
            desc: 'Inovação constante, integridade criativa e foco absoluto na experiência do jogador.',
            icon: <ShieldCheck className="w-8 h-8 text-white" />,
            color: 'border-white/30'
        }
    ];

    return (
        <section id="sobre" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h2 className="text-game-blue font-tech text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-game-blue inline-block"></span>
                            QUEM SOMOS
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-tech font-bold text-white mb-6 uppercase">
                            REDEFININDO O <span className="text-game-purple">GAME DESIGN</span>
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed mb-8">
                            A Game Tech nasceu da paixão por tecnologia e narrativa. Somos um estúdio focado em criar mundos digitais que desafiam o status quo e levam a diversão a um novo patamar tecnológico.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-3xl font-tech font-bold text-game-purple">10+</span>
                                <span className="text-xs text-white/50 uppercase">Especialistas</span>
                            </div>
                            <div className="h-10 w-[1px] bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-tech font-bold text-game-blue">4</span>
                                <span className="text-xs text-white/50 uppercase">Cenários Epic</span>
                            </div>
                            <div className="h-10 w-[1px] bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-tech font-bold text-white">24/7</span>
                                <span className="text-xs text-white/50 uppercase">Suporte</span>
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
                        <div className="relative z-10 rounded-2xl overflow-hidden neon-border-purple">
                            <img src="/assets/hero-bg.png" alt="Office" className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" decoding="async" />
                            <div className="absolute inset-0 bg-game-purple/20 mix-blend-overlay"></div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-game-purple/30 blur-2xl rounded-full"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-game-blue/30 blur-2xl rounded-full"></div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className={`glass-card border ${card.color} hover:bg-white/10`}
                        >
                            <div className="mb-6 p-3 bg-white/5 inline-block rounded-lg">
                                {card.icon}
                            </div>
                            <h4 className="text-2xl font-tech font-bold text-white mb-4 uppercase">{card.title}</h4>
                            <p className="text-white/60 leading-relaxed">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
