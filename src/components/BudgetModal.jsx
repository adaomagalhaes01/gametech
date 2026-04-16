import React from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const BudgetModal = ({ onClose }) => {
    const handleSubmit = async (e) => {
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
            toast.error('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const loadingToast = toast.loading('Enviando solicitação...');
        try {
            await axios.post(`${API_URL}/budget`, data, { timeout: 10000 });
            toast.dismiss(loadingToast);
            toast.success('Solicitação enviada com sucesso! Entraremos em contacto.', {
                duration: 5000,
                style: {
                    background: '#0d0d1a',
                    color: '#fff',
                    border: '1px solid rgba(0, 163, 255, 0.2)',
                },
                iconTheme: {
                    primary: '#00A3FF',
                    secondary: '#fff',
                },
            });
            onClose();
        } catch (error) {
            toast.dismiss(loadingToast);
            const msg = error.response?.data?.message || 'Erro ao conectar ao servidor. Verifique se o backend está ligado.';
            toast.error(msg);
            console.error(error);
        }
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
                className="relative w-full max-w-lg bg-game-dark border border-white/10 p-8 z-10 shadow-2xl shadow-game-primary/20 rounded-2xl backdrop-blur-xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-game-primary transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <h3 className="text-3xl font-tech font-black text-white mb-2 uppercase italic">SOLICITAR <span className="text-game-primary">SERVIÇO</span></h3>
                <p className="text-white/40 text-[10px] mb-8 font-bold uppercase tracking-widest">Preencha os dados e a nossa equipa entrará em contacto.</p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1 font-bold font-tech text-left">Seu Nome *</label>
                            <input
                                name="nome"
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-game-primary transition-colors rounded-xl"
                                placeholder="INSIRA SEU NOME"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1 font-bold font-tech text-left">Email *</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-game-primary transition-colors rounded-xl"
                                    placeholder="EMAIL@EXEMPLO.COM"
                                />
                            </div>
                            <div>
                                <label className="block text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1 font-bold font-tech text-left">Telefone</label>
                                <input
                                    name="telefone"
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-game-primary transition-colors rounded-xl"
                                    placeholder="+244 ..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1 font-bold font-tech text-left">Plano de Interesse *</label>
                            <select
                                name="servico"
                                required
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-game-primary transition-colors appearance-none rounded-xl"
                            >
                                <option className="bg-game-dark">Pacote Básico</option>
                                <option className="bg-game-dark">Pacote Intermediário</option>
                                <option className="bg-game-dark">Pacote Premium</option>
                                <option className="bg-game-dark">Consultoria Geral</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1 font-bold font-tech text-left">Detalhes do Projeto *</label>
                            <textarea
                                name="descricao"
                                rows="3"
                                required
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-game-primary transition-colors resize-none rounded-xl"
                                placeholder="DESCREVA O QUE VOCÊ PRECISA..."
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-game-primary text-white flex items-center justify-center gap-3 group py-4 text-lg font-tech font-bold uppercase tracking-widest hover:bg-white hover:text-game-primary transition-all rounded-xl shadow-[0_0_20px_rgba(0,163,255,0.3)]"
                    >
                        ENVIAR SOLICITAÇÃO
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default BudgetModal;
