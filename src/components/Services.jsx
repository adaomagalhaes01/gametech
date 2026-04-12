import React from 'react';
import { motion } from 'framer-motion';
import { Check, Send } from 'lucide-react';

const Services = ({ onOpenModal }) => {
    const plans = [
        {
            name: 'Básico',
            price: '50.000',
            features: ['Desenvolvimento de jogos simples', '2D Mechanics', 'UI Padrão', '1 Cenário', 'Suporte via Email'],
            color: 'border-white/20',
            btnColor: 'bg-white/10 hover:bg-white hover:text-game-dark',
            iconColor: 'text-white'
        },
        {
            name: 'Intermediário',
            price: '120.000',
            features: ['Jogos com animações', 'UI Personalizada', 'Sistemas de Pontuação', '3 Cenários', 'Efeitos Especiais (VFX)'],
            color: 'neon-border-blue',
            btnColor: 'bg-game-blue text-white hover:bg-blue-400',
            iconColor: 'text-game-blue',
            popular: true
        },
        {
            name: 'Premium',
            price: '250.000',
            features: ['Jogos completos 2D/3D', 'Sistemas Avançados', 'Multiplayer Local', 'Cenários Ilimitados', 'IA de Oponentes'],
            color: 'neon-border-purple',
            btnColor: 'btn-primary',
            iconColor: 'text-game-purple'
        }
    ];

    return (
        <section id="servicos" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-game-purple font-tech text-sm uppercase tracking-widest mb-4">GAMING AS A SERVICE</h2>
                        <h3 className="text-4xl md:text-5xl font-tech font-black text-white uppercase italic">
                            NOSSOS <span className="text-game-blue">PLANOS</span>
                        </h3>
                    </div>
                    <p className="text-white/50 max-w-sm">Soluções flexíveis para criadores de todos os níveis. Escolha o plano que melhor se adapta à sua visão.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`glass-card p-0 flex flex-col relative overflow-hidden h-full border ${plan.color} ${plan.popular ? 'scale-105 z-10 md:-translate-y-4' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-game-blue text-game-dark font-tech font-bold text-[10px] uppercase tracking-tighter px-4 py-1 rotate-45 translate-x-10 translate-y-4 w-40 text-center">
                                    Mais Popular
                                </div>
                            )}

                            <div className="p-8 border-b border-white/10">
                                <h4 className="text-sm font-tech text-white/50 uppercase tracking-[0.3em] mb-2">{plan.name}</h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-tech font-black text-white italic">{plan.price}</span>
                                    <span className="text-white/50 font-tech text-xs uppercase tracking-tighter">Kz</span>
                                </div>
                            </div>

                            <div className="p-8 flex-grow">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-3 text-white/70 text-sm">
                                            <Check className={`${plan.iconColor} w-4 h-4`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-8 pt-0">
                                <button
                                    onClick={onOpenModal}
                                    className={`w-full py-4 font-tech font-bold uppercase tracking-widest transition-all duration-300 rounded-lg ${plan.btnColor} flex items-center justify-center gap-2 group`}
                                >
                                    Solicitar Orçamento
                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
