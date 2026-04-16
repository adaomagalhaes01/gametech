import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Search, MessageSquare, Trash2, User, Phone, Mail, Briefcase, Clock, CheckCircle, AlertCircle, Archive, Edit2, X, Save } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const MessageEditModal = ({ isOpen, onClose, onSave, message }) => {
    if (!isOpen || !message) return null;

    const [form, setForm] = useState({
        name: message.name || '',
        email: message.email || '',
        phone: message.phone || '',
        service: message.service || '',
        description: message.description || '',
        status: message.status || 'pendente'
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/budget/${message.id}`, form);
            toast.success('Solicitação atualizada!');
            onSave();
        } catch (error) {
            toast.error('Erro ao atualizar solicitação.');
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="glass-card w-full max-w-2xl relative z-10 p-0 overflow-hidden shadow-2xl border-white/5"
            >
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white uppercase tracking-tighter italic">Editar <span className="text-game-blue">Solicitação</span></h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Nome do Cliente</label>
                            <input
                                name="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-blue/50 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-blue/50 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Telefone</label>
                            <input
                                name="phone"
                                type="text"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-blue/50 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Serviço Pretendido</label>
                            <input
                                name="service"
                                type="text"
                                required
                                value={form.service}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-blue/50 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Status</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full bg-[#0d0d1a] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-blue/50 appearance-none cursor-pointer font-medium"
                            >
                                <option value="pendente">Pendente</option>
                                <option value="respondido">Respondido</option>
                                <option value="arquivado">Arquivado</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Descrição detalhada</label>
                        <textarea
                            name="description"
                            rows="4"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-blue/50 transition-all resize-none font-medium"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-bold text-white hover:bg-white/5 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary flex items-center justify-center gap-2 px-8"
                        >
                            <Save className="w-5 h-5" />
                            <span>Salvar Alterações</span>
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const MessagesPage = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMessages();
        const interval = setInterval(loadMessages, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadMessages = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/budget`);
            setMessages(data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
            setLoading(false);
        }
    };

    const formatDate = (isoDate) => {
        const now = new Date();
        const date = new Date(isoDate);
        const diffMs = now - date;
        const diffMin = Math.floor(diffMs / 60000);
        const diffHour = Math.floor(diffMs / 3600000);
        const diffDay = Math.floor(diffMs / 86400000);

        if (diffMin < 1) return 'Agora mesmo';
        if (diffMin < 60) return `Há ${diffMin} min`;
        if (diffHour < 24) return `Há ${diffHour}h`;
        if (diffDay < 7) return `Há ${diffDay} dia${diffDay > 1 ? 's' : ''}`;
        return date.toLocaleDateString('pt-AO');
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pendente':
                return { label: 'Pendente', color: 'bg-yellow-500/10 text-yellow-500', icon: AlertCircle };
            case 'respondido':
                return { label: 'Respondido', color: 'bg-green-500/10 text-green-500', icon: CheckCircle };
            case 'arquivado':
                return { label: 'Arquivado', color: 'bg-gray-500/10 text-gray-500', icon: Archive };
            default:
                return { label: 'Pendente', color: 'bg-yellow-500/10 text-yellow-500', icon: AlertCircle };
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`${API_URL}/budget/${id}/status`, { status: newStatus });
            toast.success('Status atualizado!');
            loadMessages();
            if (selectedMessage && selectedMessage.id === id) {
                setSelectedMessage({ ...selectedMessage, status: newStatus });
            }
        } catch (error) {
            toast.error('Erro ao atualizar status.');
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Tem certeza que deseja eliminar esta solicitação?')) return;
        try {
            await axios.delete(`${API_URL}/budget/${id}`);
            toast.success('Solicitação eliminada!');
            if (selectedMessage && selectedMessage.id === id) {
                setSelectedMessage(null);
            }
            loadMessages();
        } catch (error) {
            toast.error('Erro ao eliminar.');
        }
    };

    const filtered = messages.filter(m => {
        if (!search) return true;
        const q = search.toLowerCase();
        return m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q) || m.service?.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q);
    });

    const getCardClass = (msg) => {
        const base = "p-4 rounded-xl border cursor-pointer transition-all text-left ";
        if (selectedMessage?.id === msg.id) {
            return base + "bg-game-purple/10 border-game-purple shadow-[0_0_15px_rgba(138,43,226,0.1)]";
        }
        return base + "bg-white/5 border-white/5 hover:border-white/20";
    };

    return (
        <div className="space-y-8">
            <div className="text-left">
                <h1 className="text-4xl font-tech font-bold text-white mb-2 uppercase italic tracking-tighter">
                    Solicitações <span className="text-game-blue text-3xl opacity-50">/ CRM</span>
                </h1>
                <p className="text-white/60">Pedidos de orçamento enviados por clientes através do site.</p>
            </div>

            {filtered.length === 0 && !search ? (
                <div className="glass-card p-16 flex flex-col items-center justify-center text-center rounded-2xl border-white/5 shadow-2xl">
                    <div className="w-24 h-24 rounded-3xl bg-game-purple/10 flex items-center justify-center mb-6 border border-game-purple/20">
                        <MessageSquare className="w-12 h-12 text-game-purple" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase italic">Nenhuma solicitação ainda</h3>
                    <p className="text-white/40 text-sm max-w-md">
                        As solicitações de orçamento feitas pelos clientes no site aparecerão aqui automaticamente.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Lista */}
                    <div className="flex-1 space-y-4">
                        <div className="relative text-left">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="text"
                                placeholder="Pesquisar por nome, email ou serviço..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border-white/10 text-white border rounded-2xl py-4 pl-14 pr-4 text-sm focus:ring-2 focus:ring-game-purple/50 outline-none transition-all"
                            />
                        </div>

                        <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest px-1 text-left">
                            {filtered.length} solicitação{filtered.length !== 1 ? 'ões' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
                        </p>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {filtered.map((msg) => {
                                const badge = getStatusBadge(msg.status);
                                return (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={() => setSelectedMessage(msg)}
                                        className={getCardClass(msg)}
                                    >
                                        <div className="flex items-center justify-between mb-3 text-left">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-game-purple/10 flex items-center justify-center border border-game-purple/20">
                                                    <User className="w-5 h-5 text-game-purple" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-white">{msg.name}</h4>
                                                    <p className="text-[10px] text-white/40 uppercase font-medium">{msg.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase ${badge.color} border border-current opacity-70`}>
                                                    {badge.label}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-left">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-3 h-3 text-game-blue" />
                                                <span className="text-[10px] font-bold uppercase text-game-blue">{msg.service}</span>
                                            </div>
                                            <span className="text-[10px] text-white/20 font-medium">
                                                <Clock className="w-3 h-3 inline mr-1" />
                                                {formatDate(msg.created_at)}
                                            </span>
                                        </div>
                                        <p className="mt-3 text-xs truncate text-white/40 italic">"{msg.description}"</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Detalhes */}
                    <div className="w-full lg:w-[520px] min-h-[500px] rounded-2xl glass-card relative border-white/5 shadow-2xl text-left overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-game-blue/5 blur-[100px] -mr-32 -mt-32"></div>
                        {selectedMessage ? (
                            <div className="p-8 space-y-8 relative z-10">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-game-blue tracking-widest">Solicitação de Orçamento</span>
                                        <h2 className="text-3xl font-tech font-bold mt-1 text-white uppercase italic tracking-tighter">{selectedMessage.name}</h2>
                                    </div>
                                    {(() => {
                                        const badge = getStatusBadge(selectedMessage.status);
                                        return (
                                            <div className={`px-4 py-1 rounded-xl text-[10px] font-bold uppercase ${badge.color} border border-current shadow-sm`}>
                                                {badge.label}
                                            </div>
                                        );
                                    })()}
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-game-purple/10 text-game-purple">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Email</p>
                                            <p className="text-sm text-white font-medium">{selectedMessage.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-game-blue/10 text-game-blue">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Telefone</p>
                                            <p className="text-sm text-white font-medium">{selectedMessage.phone || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-game-purple/10 text-game-purple">
                                            <Briefcase className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Serviço</p>
                                            <p className="text-sm text-white font-medium">{selectedMessage.service}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-game-blue/10 text-game-blue">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Recebido em</p>
                                            <p className="text-sm text-white font-medium">{formatDate(selectedMessage.created_at)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Descrição */}
                                <div className="space-y-3">
                                    <h4 className="text-[10px] uppercase font-black tracking-widest text-white/20">Descrição do Projeto</h4>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-sm leading-relaxed text-white/80 font-medium italic shadow-inner">
                                        "{selectedMessage.description}"
                                    </div>
                                </div>

                                {/* Ações */}
                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setIsEditModalOpen(true)}
                                            className="flex-1 py-4 rounded-2xl bg-white/5 text-white/80 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/5 group"
                                        >
                                            <Edit2 className="w-4 h-4 group-hover:text-game-blue transition-colors" />
                                            <span>Editar Detalhes</span>
                                        </button>

                                        <button
                                            onClick={() => deleteMessage(selectedMessage.id)}
                                            className="p-4 rounded-2xl bg-white/5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/5"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex gap-3">
                                        {selectedMessage.status === 'pendente' && (
                                            <button
                                                onClick={() => updateStatus(selectedMessage.id, 'respondido')}
                                                className="flex-1 btn-primary flex items-center justify-center gap-3 py-4 rounded-2xl shadow-xl shadow-game-purple/20"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                                <span className="uppercase tracking-widest font-black text-xs">Marcar como Respondido</span>
                                            </button>
                                        )}
                                        {selectedMessage.status === 'respondido' && (
                                            <button
                                                onClick={() => updateStatus(selectedMessage.id, 'arquivado')}
                                                className="flex-1 py-4 rounded-2xl bg-game-blue/20 text-game-blue font-bold hover:bg-game-blue/30 transition-all flex items-center justify-center gap-3 border border-game-blue/30"
                                            >
                                                <Archive className="w-5 h-5" />
                                                <span className="uppercase tracking-widest font-black text-xs">Arquivar Solicitação</span>
                                            </button>
                                        )}
                                    </div>

                                    {selectedMessage.email && (
                                        <a
                                            href={`mailto:${selectedMessage.email}?subject=Re: Orçamento GameTech - ${selectedMessage.service}`}
                                            className="block text-center py-4 rounded-2xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all font-black text-xs uppercase tracking-widest"
                                        >
                                            <Mail className="w-4 h-4 inline mr-3 opacity-50" />
                                            Responder via Email Oficial
                                        </a>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-50">
                                <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                                    <MessageSquare className="w-12 h-12 text-white/20" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase italic">Selecione uma solicitação</h3>
                                <p className="text-white/40 text-sm max-w-[200px]">Selecione um cliente na lista à esquerda para visualizar e gerenciar o pedido.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <AnimatePresence>
                {isEditModalOpen && selectedMessage && (
                    <MessageEditModal
                        isOpen={isEditModalOpen}
                        message={selectedMessage}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={() => {
                            setIsEditModalOpen(false);
                            loadMessages();
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default MessagesPage;
