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
                className="relative w-full max-w-md md:max-w-xl bg-white border-2 border-game-dark p-8 md:p-12 z-10 shadow-[20px_20px_0px_0px_rgba(255,70,85,1)]"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-game-dark/40 hover:text-game-primary transition-colors"
                >
                    <X className="w-8 h-8" />
                </button>

                <h3 className="section-title text-game-dark mb-4">ENTRAR EM <span className="text-game-primary">CONTATO</span></h3>
                <p className="text-game-dark/50 text-sm mb-10 font-bold uppercase tracking-widest">Faça parte da história da Cenouralândia.</p>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="relative">
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-game-dark/40 mb-2 font-bold font-tech">Seu Nome *</label>
                            <input
                                name="nome"
                                type="text"
                                required
                                className="w-full bg-gray-50 border-2 border-game-dark px-4 py-4 text-game-dark focus:outline-none focus:border-game-primary transition-colors"
                                placeholder="LUNA O'HARE"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.3em] text-game-dark/40 mb-2 font-bold font-tech">Email *</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full bg-gray-50 border-2 border-game-dark px-4 py-4 text-game-dark focus:outline-none focus:border-game-primary transition-colors"
                                    placeholder="LUNA@VALEMAGICO.COM"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.3em] text-game-dark/40 mb-2 font-bold font-tech">Interesse *</label>
                                <select
                                    name="servico"
                                    required
                                    className="w-full bg-gray-50 border-2 border-game-dark px-4 py-4 text-game-dark focus:outline-none focus:border-game-primary transition-colors appearance-none"
                                >
                                    <option>Quero Jogar Demo</option>
                                    <option>Investimento</option>
                                    <option>Feedback Multimídia</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-game-dark/40 mb-2 font-bold font-tech">Mensagem *</label>
                            <textarea
                                name="descricao"
                                rows="4"
                                required
                                className="w-full bg-gray-50 border-2 border-game-dark px-4 py-4 text-game-dark focus:outline-none focus:border-game-primary transition-colors resize-none"
                                placeholder="FALE SOBRE SEU INTERESSE NO PROJETO..."
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary flex items-center justify-center gap-3 group py-6 text-xl"
                    >
                        ENVIAR MENSAGEM
                        <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default BudgetModal;
