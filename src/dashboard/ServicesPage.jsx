import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Plus, Search, Briefcase, Settings, Trash2, Edit2, X, ChevronRight } from 'lucide-react';

const ServicesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const services = [
        { id: 1, name: 'Desenvolvimento de Jogos', category: 'Dev', price: 1500000, status: 'Ativo', clients: 4 },
        { id: 2, name: 'Manutenção de Consolas', category: 'Hardware', price: 25000, status: 'Ativo', clients: 12 },
        { id: 3, name: 'Hospedagem de Servidores', category: 'Cloud', price: 15000, status: 'Pausado', clients: 8 },
        { id: 4, name: 'Consultoria Gamer', category: 'Business', price: 50000, status: 'Ativo', clients: 2 },
    ];

    const formatKwanza = (val) => {
        return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(val);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-tech font-bold text-white mb-2">Serviços Tech</h1>
                    <p className="text-white/60">Gestão de serviços oferecidos pela GameTech Angola.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Novo Serviço</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        whileHover={{ y: -5 }}
                        className="glass-card relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-game-blue/10 flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-game-blue" />
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${service.status === 'Ativo' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {service.status}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-1 text-white">{service.name}</h3>
                        <p className="text-white/40 text-sm mb-4">{service.category}</p>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                            <div>
                                <p className="text-[10px] uppercase text-white/40 font-bold mb-1">Preço Base</p>
                                <p className="font-tech font-bold text-game-purple">{formatKwanza(service.price)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase text-white/40 font-bold mb-1">Clientes</p>
                                <p className="font-bold text-white">{service.clients}</p>
                            </div>
                        </div>

                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button className="p-2 bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Placeholder Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="glass-card w-full max-w-lg relative z-10 p-8"
                        >
                            <h2 className="text-2xl font-tech font-bold mb-6 text-white">Cadastrar Serviço</h2>
                            <div className="space-y-4">
                                <input type="text" placeholder="Nome do Serviço" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:ring-2 focus:ring-game-purple/50" />
                                <input type="text" placeholder="Categoria" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:ring-2 focus:ring-game-purple/50" />
                                <input type="number" placeholder="Preço (Kz)" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:ring-2 focus:ring-game-purple/50" />
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full btn-primary py-4 mt-4"
                                >
                                    Salvar Serviço
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ServicesPage;
