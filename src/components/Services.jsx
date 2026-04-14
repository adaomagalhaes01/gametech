import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Services = ({ onOpenModal }) => {

    return (
        <section id="servicos" className="py-24 relative bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-game-primary font-tech text-xs uppercase tracking-[0.4em] mb-4 font-bold">WORKFLOW</h2>
                        <h3 className="section-title text-game-dark">
                            NOSSO <span className="text-game-primary">PROCESSO</span>
                        </h3>
                    </div>
                    <p className="text-game-dark/50 max-w-sm">Seguimos um processo estruturado para garantir qualidade e inovação em cada projeto desenvolvido.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                    {[
                        {
                            name: 'Planeamento',
                            desc: 'Definição de objetivos, pesquisa de mercado e design de conceitos inovadores.',
                            features: ['Análise de Público', 'Documentação', 'Prototipagem'],
                        },
                        {
                            name: 'Desenvolvimento',
                            desc: 'Criação de código, arte pixel art e integração de mecânicas de jogo fluidas.',
                            features: ['Construct 2/3', 'Design Visual', 'Programação'],
                        },
                        {
                            name: 'Testes & QA',
                            desc: 'Garantia de qualidade através de ciclos rigorosos de testes e feedback.',
                            features: ['Correção de Bugs', 'Balanceamento', 'Performance'],
                        },
                        {
                            name: 'Divulgação',
                            desc: 'Estratégias de marketing e parcerias para alcançar o público jovem angolano.',
                            features: ['Lançamento', 'Marketing Digital', 'Suporte'],
                        }
                    ].map((step, index) => (
                        <motion.div
                            key={step.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`bg-white p-10 flex flex-col relative overflow-hidden h-full border border-gray-100 border-r-0 last:border-r hover:bg-white hover:shadow-xl transition-all group`}
                        >
                            <div className="p-0 border-b border-gray-100 mb-8 pb-8">
                                <h4 className="text-[10px] font-tech text-game-primary uppercase tracking-[0.4em] mb-4 font-bold">ETAPA {(index + 1).toString().padStart(2, '0')}</h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-tech font-black text-game-dark italic tracking-tighter uppercase">{step.name}</span>
                                </div>
                            </div>

                            <p className="text-game-dark/60 text-sm mb-8 leading-relaxed">
                                {step.desc}
                            </p>

                            <div className="flex-grow">
                                <ul className="space-y-3">
                                    {step.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-3 text-game-dark/70 text-[12px] font-bold uppercase tracking-wider">
                                            <div className="w-1.5 h-1.5 bg-game-primary rounded-full"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <button
                        onClick={onOpenModal}
                        className="btn-primary flex items-center gap-4 group px-12"
                    >
                        SOLICITAR PARCERIA ESTRATÉGICA
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Services;
