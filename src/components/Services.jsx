import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Services = ({ onOpenModal }) => {

    return (
        <section id="servicos" className="py-24 relative bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-game-primary font-tech text-xs uppercase tracking-[0.4em] mb-4 font-bold">NOSSOS PLANOS</h2>
                    <h3 className="section-title text-game-dark">
                        ESCOLHA O SEU <span className="text-game-primary">PACOTE</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: 'Básico',
                            price: '50.000 Kz',
                            desc: 'Ideal para pequenos projetos e protótipos rápidos.',
                            features: ['Análise de Público', 'Documentação Básica', '1 Ciclo de Feedback'],
                        },
                        {
                            name: 'Intermediário',
                            price: '120.000 Kz',
                            desc: 'Para quem busca um desenvolvimento mais robusto e completo.',
                            features: ['Design Visual Customizado', 'Programação Avançada', '3 Ciclos de Feedback'],
                            popular: true
                        },
                        {
                            name: 'Premium',
                            price: '250.000 Kz',
                            desc: 'A solução definitiva para grandes projetos e escala máxima.',
                            features: ['Lançamento Estratégico', 'Suporte Prioritário', 'Marketing Digital'],
                        }
                    ].map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-8 flex flex-col relative overflow-hidden h-full rounded-2xl border-2 ${plan.popular ? 'border-game-primary shadow-2xl scale-105 z-10 bg-white' : 'border-gray-100 bg-gray-50/50'} transition-all group`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-game-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter shadow-[0_0_15px_rgba(0,163,255,0.5)]">
                                    Mais Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h4 className="text-xl font-tech font-black text-game-dark uppercase italic mb-2 group-hover:text-game-primary transition-colors">{plan.name}</h4>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-tech font-black text-game-primary">{plan.price}</span>
                                </div>
                                <p className="text-game-dark/50 text-sm mt-4 leading-relaxed line-clamp-2">
                                    {plan.desc}
                                </p>
                            </div>

                            <div className="flex-grow mb-8 text-left">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-3 text-game-dark/70 text-[10px] font-bold uppercase tracking-wider">
                                            <div className="w-1.5 h-1.5 bg-game-primary rounded-full shadow-[0_0_5px_rgba(0,163,255,1)]"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={onOpenModal}
                                className={`w-full py-4 font-tech font-bold uppercase tracking-widest transition-all ${plan.popular ? 'bg-game-primary text-white hover:bg-game-dark' : 'bg-game-dark text-white hover:bg-game-primary'}`}
                            >
                                SOLICITAR PLANO
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
