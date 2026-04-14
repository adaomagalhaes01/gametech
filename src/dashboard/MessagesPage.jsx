import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Search, MessageSquare, Trash2, User, Phone, Mail, Briefcase, Clock, CheckCircle, AlertCircle, Archive } from 'lucide-react';
import { getBudgetRequests } from '../components/BudgetModal';

const MessagesPage = () => {
    const { isDarkMode } = useOutletContext();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadMessages();
        // Poll for new messages every 5 seconds
        const interval = setInterval(loadMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    const loadMessages = () => {
        const requests = getBudgetRequests();
        setMessages(requests);
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

    const updateStatus = (id, newStatus) => {
        const STORAGE_KEY = 'gametech_budget_requests';
        const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const updated = all.map(m => m.id === id ? { ...m, status: newStatus } : m);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        loadMessages();
        if (selectedMessage && selectedMessage.id === id) {
            setSelectedMessage({ ...selectedMessage, status: newStatus });
        }
    };

    const deleteMessage = (id) => {
        const STORAGE_KEY = 'gametech_budget_requests';
        const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const filtered = all.filter(m => m.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        if (selectedMessage && selectedMessage.id === id) {
            setSelectedMessage(null);
        }
        loadMessages();
    };

    const filtered = messages.filter(m => {
        if (!search) return true;
        const q = search.toLowerCase();
        return m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q) || m.service?.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q);
    });

    const getCardClass = (msg) => {
        const base = "p-4 rounded-xl border cursor-pointer transition-all ";
        if (selectedMessage?.id === msg.id) {
            return base + "bg-game-purple/10 border-game-purple";
        }
        return base + (isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm');
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className={`text-4xl font-tech font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Solicitações de Orçamento</h1>
                <p className={isDarkMode ? 'text-white/60' : 'text-gray-500'}>Pedidos de orçamento enviados por clientes através do site.</p>
            </div>

            {filtered.length === 0 && !search ? (
                <div className={`${isDarkMode ? 'glass-card' : 'bg-white border border-gray-100 shadow-sm'} p-16 flex flex-col items-center justify-center text-center rounded-xl`}>
                    <div className="w-24 h-24 rounded-3xl bg-game-purple/10 flex items-center justify-center mb-6">
                        <MessageSquare className="w-12 h-12 text-game-purple/40" />
                    </div>
                    <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Nenhuma solicitação ainda</h3>
                    <p className={`${isDarkMode ? 'text-white/40' : 'text-gray-400'} text-sm max-w-md`}>
                        As solicitações de orçamento feitas pelos clientes no site aparecerão aqui automaticamente. Clique em "Solicitar Orçamento" no site principal para testar.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Lista */}
                    <div className="flex-1 space-y-4">
                        <div className="relative">
                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Pesquisar por nome, email ou serviço..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={`w-full ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 shadow-sm text-gray-900'} border rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-game-purple/50 outline-none`}
                            />
                        </div>

                        <p className={`text-xs ${isDarkMode ? 'text-white/30' : 'text-gray-400'} px-1`}>
                            {filtered.length} solicitação{filtered.length !== 1 ? 'ões' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
                        </p>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
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
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-game-purple/10 flex items-center justify-center">
                                                    <User className="w-5 h-5 text-game-purple" />
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{msg.name}</h4>
                                                    <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{msg.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${badge.color}`}>
                                                    {badge.label}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-3 h-3 text-game-blue" />
                                                <span className={`text-xs font-medium ${isDarkMode ? 'text-game-blue' : 'text-blue-600'}`}>{msg.service}</span>
                                            </div>
                                            <span className={`text-[10px] ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>
                                                <Clock className="w-3 h-3 inline mr-1" />
                                                {formatDate(msg.date)}
                                            </span>
                                        </div>
                                        <p className={`mt-2 text-xs truncate ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{msg.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Detalhes */}
                    <div className={`w-full lg:w-[480px] min-h-[500px] rounded-xl ${isDarkMode ? 'glass-card' : 'bg-white border border-gray-100 shadow-lg'} relative`}>
                        {selectedMessage ? (
                            <div className="p-8 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-game-blue' : 'text-blue-600'}`}>Solicitação de Orçamento</span>
                                        <h2 className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMessage.name}</h2>
                                    </div>
                                    {(() => {
                                        const badge = getStatusBadge(selectedMessage.status);
                                        return (
                                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${badge.color}`}>
                                                {badge.label}
                                            </div>
                                        );
                                    })()}
                                </div>

                                {/* Info Grid */}
                                <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-game-purple" />
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Email</p>
                                            <p className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMessage.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-game-blue" />
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Telefone</p>
                                            <p className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMessage.phone || 'Não informado'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-game-purple" />
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Serviço</p>
                                            <p className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMessage.service}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-game-blue" />
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-bold">Data</p>
                                            <p className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedMessage.date)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Descrição */}
                                <div>
                                    <h4 className={`text-xs uppercase font-bold mb-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Descrição do Projeto</h4>
                                    <div className={`p-5 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} text-sm leading-relaxed ${isDarkMode ? 'text-white/80' : 'text-gray-600'}`}>
                                        {selectedMessage.description}
                                    </div>
                                </div>

                                {/* Ações */}
                                <div className="space-y-4 pt-4">
                                    <div className="flex gap-3">
                                        {selectedMessage.status === 'pendente' && (
                                            <button
                                                onClick={() => updateStatus(selectedMessage.id, 'respondido')}
                                                className="flex-1 btn-primary flex items-center justify-center gap-2 py-3"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Marcar como Respondido
                                            </button>
                                        )}
                                        {selectedMessage.status === 'respondido' && (
                                            <button
                                                onClick={() => updateStatus(selectedMessage.id, 'arquivado')}
                                                className="flex-1 py-3 rounded-xl bg-white/5 text-white/60 font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Archive className="w-4 h-4" />
                                                Arquivar
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteMessage(selectedMessage.id)}
                                            className="p-3 rounded-xl bg-white/5 text-red-500 hover:bg-red-500/10 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {selectedMessage.email && (
                                        <a
                                            href={`mailto:${selectedMessage.email}?subject=Re: Orçamento GameTech - ${selectedMessage.service}`}
                                            className={`block text-center py-3 rounded-xl border ${isDarkMode ? 'border-white/10 text-white/60 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'} transition-colors font-bold text-sm`}
                                        >
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            Responder por Email
                                        </a>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                                    <MessageSquare className="w-10 h-10 text-white/20" />
                                </div>
                                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Selecione uma solicitação</h3>
                                <p className={`${isDarkMode ? 'text-white/40' : 'text-gray-400'} text-sm`}>Clique numa solicitação ao lado para ver os detalhes do pedido de orçamento.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesPage;
