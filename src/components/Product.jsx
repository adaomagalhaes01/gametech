import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Ghost, Map, Sword } from 'lucide-react';

const Product = () => {
    const scenarios = [
        { name: 'Vale das Flores', img: '/assets/game_forest.jpg' },
        { name: 'Montanha de Cristal', img: '/assets/game_action.jpg' },
        { name: 'Grutas Sombrias', img: 'https://images.unsplash.com/photo-1509023467864-1ecbb39636c8?auto=format&fit=crop&q=80&w=400' },
        { name: 'Castelo do Sombrio', img: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=400' },
    ];

    return (
        <section id="jogo" className="py-24 bg-game-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-game-primary font-tech text-xs uppercase tracking-[0.4em] mb-4 font-bold"
                    >
                        Showcase Product
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="section-title text-white"
                    >
                        JORNADA DA COELHA: <span className="text-game-primary">O SEGREDO DAS CENOURAS</span>
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] bg-white/5 border border-white/10 relative group overflow-hidden rounded-2xl">
                            <img
                                src="/assets/game_action.jpg"
                                alt="Gameplay Jornada da Coelha"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-game-dark/80 to-transparent"></div>

                            {/* HUD Mockup */}
                            <div className="absolute top-6 left-6 flex gap-2">
                                <div className="w-8 h-8 bg-game-primary border-2 border-white flex items-center justify-center font-pixel text-white text-[10px]">3</div>
                                <div className="h-8 w-32 bg-white/10 backdrop-blur-md border border-white/20 flex items-center px-2">
                                    <div className="h-2 w-full bg-game-primary shadow-[0_0_10px_rgba(0,163,255,0.8)]"></div>
                                </div>
                            </div>
                        </div>
                        {/* Shadow Effect */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border border-game-primary/30 -z-10 bg-game-primary/5 rounded-2xl blur-sm"></div>
                    </motion.div>

                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex gap-6"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-game-primary/20 text-game-primary flex items-center justify-center rounded-xl border border-game-primary/30">
                                <Leaf size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-tech font-black text-white uppercase italic mb-2 tracking-tighter">O Vale Mágico</h4>
                                <p className="text-white/40 leading-relaxed">Em Cenouralândia, as cenouras mágicas dão vida e proteção. Explore cenários vibrantes desenhados à mão com estética pixel art retro.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex gap-6"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-white/5 text-white flex items-center justify-center rounded-xl border border-white/10">
                                <Ghost size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-tech font-black text-white uppercase italic mb-2 tracking-tighter">A Sombra de Sombrio</h4>
                                <p className="text-white/40 leading-relaxed">Enfrente o espírito Sombrio e seus capangas que querem dominar a floresta. Cada fase esconde segredos sobre o passado do vale.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-6"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-game-accent/20 text-game-accent flex items-center justify-center rounded-xl border border-game-accent/30">
                                <Sword size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-tech font-black text-white uppercase italic mb-2 tracking-tighter">Mecânicas Precisas</h4>
                                <p className="text-white/40 leading-relaxed">Plataforma 2D clássica com controles responsivos, saltos desafiadores e colecionáveis raros espalhados por cada mundo.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-0 rounded-2xl overflow-hidden border border-white/5">
                    {scenarios.map((s, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="relative aspect-video group cursor-pointer overflow-hidden"
                        >
                            <img src={s.img} alt={s.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-500" />
                            <div className="absolute inset-0 bg-game-dark/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="font-tech font-black text-xl text-white uppercase italic tracking-tighter">{s.name}</span>
                                <div className="w-12 h-1 bg-game-primary mt-2 shadow-[0_0_10px_rgba(0,163,255,0.8)]"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Product;
