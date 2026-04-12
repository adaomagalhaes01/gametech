import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Car, MapPin, Trophy } from 'lucide-react';

const Product = () => {
    const scenarios = [
        { name: 'Luanda', img: '/assets/luanda.png' },
        { name: 'Talatona', img: '/assets/talatona.png' },
        { name: 'Camama', img: '/assets/luanda.png' }, // Reusing or simulating
        { name: 'Viana', img: '/assets/talatona.png' },
    ];

    return (
        <section id="jogo" className="py-24 bg-game-dark/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-game-purple font-tech text-sm uppercase tracking-[0.4em] mb-4"
                    >
                        Nosso Produto Flagship
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-tech font-black text-white uppercase italic"
                    >
                        Angola <span className="text-game-blue">Traffic Dash</span>
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-video rounded-3xl overflow-hidden neon-border-blue relative group">
                            <img src="/assets/luanda.png" alt="Gameplay" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                            <div className="absolute inset-0 bg-gradient-to-t from-game-dark via-transparent to-transparent opacity-60"></div>

                            {/* Simulated UI Bits */}
                            <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 flex items-center gap-2">
                                <Coins className="text-yellow-400 w-5 h-5" />
                                <span className="font-tech text-white">12,450</span>
                            </div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-4 border-game-blue border-t-transparent animate-spin"></div>
                                <div className="text-white">
                                    <p className="text-xs uppercase opacity-60">Localização</p>
                                    <p className="font-tech font-bold uppercase">Baía de Luanda</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-game-blue/20 blur-3xl rounded-full"></div>
                        <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-game-purple/20 blur-3xl rounded-full"></div>
                    </motion.div>

                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex gap-6"
                        >
                            <div className="flex-shrink-0 w-14 h-14 bg-game-purple/20 flex items-center justify-center rounded-xl neon-border-purple">
                                <Car className="text-game-purple w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-xl font-tech font-bold text-white uppercase mb-2">Aventuras de Taxi</h4>
                                <p className="text-white/60">Assume o controle de um taxi lendário e navega pelas ruas movimentadas de Angola. Velocidade e estratégia são essenciais.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex gap-6"
                        >
                            <div className="flex-shrink-0 w-14 h-14 bg-game-blue/20 flex items-center justify-center rounded-xl neon-border-blue">
                                <Coins className="text-game-blue w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-xl font-tech font-bold text-white uppercase mb-2">Coleciona Moedas</h4>
                                <p className="text-white/60">Recolhe moedas espalhadas pelo mapa para desbloquear upgrades, novos veículos e cenários exclusivos da nossa terra.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-6"
                        >
                            <div className="flex-shrink-0 w-14 h-14 bg-white/10 flex items-center justify-center rounded-xl border border-white/30">
                                <MapPin className="text-white w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-xl font-tech font-bold text-white uppercase mb-2">Cenários Reais</h4>
                                <p className="text-white/60">Explora Luanda, Talatona, Camama e Viana com uma fidelidade visual impressionante e estilo artístico único.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {scenarios.map((s, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 group cursor-pointer"
                        >
                            <img src={s.img} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125" loading="lazy" decoding="async" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <span className="font-tech font-bold text-lg tracking-widest text-white uppercase">{s.name}</span>
                            </div>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-game-blue transition-all duration-300 group-hover:w-3/4"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Product;
