import React from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';

// Shared store for budget requests
const STORAGE_KEY = 'gametech_budget_requests';

export const getBudgetRequests = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveBudgetRequest = (request) => {
    const existing = getBudgetRequests();
    const newRequest = {
        id: Date.now(),
        ...request,
        date: new Date().toISOString(),
        status: 'pendente',
    };
    existing.unshift(newRequest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return newRequest;
};

const BudgetModal = ({ onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            name: form.nome.value,
            email: form.email.value,
            phone: form.telefone.value,
            service: form.servico.value,
            description: form.descricao.value,
        };

        if (!data.name || !data.email || !data.description) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        saveBudgetRequest(data);
        alert('Pedido de orçamento enviado com sucesso! A equipa GameTech entrará em contacto.');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-game-dark/95 backdrop-blur-sm"
            ></motion.div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md md:max-w-lg bg-game-dark border neon-border-purple rounded-2xl p-6 md:p-8 z-10"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <h3 className="text-3xl font-tech font-bold text-white uppercase italic mb-2">Solicitar <span className="text-game-purple">Orçamento</span></h3>
                <p className="text-white/50 text-sm mb-8">Conte-nos sobre o seu projeto e criaremos algo épico juntos.</p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Seu Nome *</label>
                            <input
                                name="nome"
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-game-purple transition-colors"
                                placeholder="Ex: João Silva"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Email *</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-game-blue transition-colors"
                                    placeholder="email@exemplo.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Telefone</label>
                                <input
                                    name="telefone"
                                    type="tel"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-game-blue transition-colors"
                                    placeholder="+244 ..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Tipo de Serviço *</label>
                            <select
                                name="servico"
                                required
                                className="w-full bg-game-dark/80 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-game-purple transition-colors appearance-none"
                            >
                                <option>Plano Básico</option>
                                <option>Plano Intermediário</option>
                                <option>Plano Premium</option>
                                <option>Consultoria Gamer</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Descrição do Projeto *</label>
                            <textarea
                                name="descricao"
                                rows="4"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-game-purple transition-colors resize-none"
                                placeholder="Fale um pouco sobre o jogo que deseja criar..."
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary flex items-center justify-center gap-3 group"
                    >
                        Enviar Pedido
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default BudgetModal;
