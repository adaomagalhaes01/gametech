import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
    TrendingUp,
    Users,
    ShoppingCart,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Gamepad2,
    MessageSquare,
    Briefcase,
    User,
    Clock
} from 'lucide-react';
import { getBudgetRequests } from '../components/BudgetModal';

const StatCard = ({ label, value, icon: Icon, trend, trendValue, isDarkMode, onClick }) => (
    <motion.div
        whileHover={{ y: -5 }}
        onClick={onClick}
        className={`${isDarkMode ? 'glass-card' : 'bg-white p-6 rounded-xl shadow-sm border border-gray-100'} p-6 transition-all ${onClick ? 'cursor-pointer' : ''}`}
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-game-purple/10 text-game-purple border border-game-purple/10">
                <Icon className="w-6 h-6" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {trendValue}
            </div>
        </div>
        <p className={`${isDarkMode ? 'text-white/60' : 'text-gray-500'} text-sm mb-1`}>{label}</p>
        <h3 className={`text-2xl font-tech font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</h3>
    </motion.div>
);

const DashboardHome = () => {
    const { isDarkMode } = useOutletContext();
    const navigate = useNavigate();
    const [budgetRequests, setBudgetRequests] = useState([]);

    useEffect(() => {
        const loadRequests = () => setBudgetRequests(getBudgetRequests());
        loadRequests();
        const interval = setInterval(loadRequests, 5000);
        return () => clearInterval(interval);
    }, []);

    const formatKwanza = (val) => {
        return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(val);
    };

    const formatDate = (isoDate) => {
        const now = new Date();
        const date = new Date(isoDate);
        const diffMs = now - date;
        const diffMin = Math.floor(diffMs / 60000);
        const diffHour = Math.floor(diffMs / 3600000);

        if (diffMin < 1) return 'Agora mesmo';
        if (diffMin < 60) return `Há ${diffMin} min`;
        if (diffHour < 24) return `Há ${diffHour}h`;
        return date.toLocaleDateString('pt-AO');
    };

    const pendingCount = budgetRequests.filter(r => r.status === 'pendente').length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className={`text-4xl font-tech font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Painel de Controle</h1>
                <p className={`${isDarkMode ? 'text-white/60' : 'text-gray-500'} text-lg`}>Visão geral do sistema GameTech Angola.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Vendas Totais"
                    value={formatKwanza(1258420)}
                    icon={ShoppingCart}
                    trend="up"
                    trendValue="+12.5%"
                    isDarkMode={isDarkMode}
                />
                <StatCard
                    label="Novos Usuários"
                    value="2.450"
                    icon={Users}
                    trend="up"
                    trendValue="+5.2%"
                    isDarkMode={isDarkMode}
                />
                <StatCard
                    label="Saldo da Carteira"
                    value={formatKwanza(450200)}
                    icon={Wallet}
                    trend="down"
                    trendValue="-2.1%"
                    isDarkMode={isDarkMode}
                />
                <StatCard
                    label="Solicitações Pendentes"
                    value={String(pendingCount)}
                    icon={MessageSquare}
                    trend="up"
                    trendValue={`${budgetRequests.length} total`}
                    isDarkMode={isDarkMode}
                    onClick={() => navigate('/admin/messages')}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Últimas Solicitações de Orçamento */}
                <div className={`lg:col-span-2 ${isDarkMode ? 'glass-card' : 'bg-white p-8 rounded-xl shadow-sm border border-gray-100'} min-h-[400px]`}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Últimas Solicitações de Orçamento</h2>
                        <button onClick={() => navigate('/admin/messages')} className="text-game-purple text-sm font-bold hover:underline">Ver tudo</button>
                    </div>

                    {budgetRequests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <MessageSquare className="w-12 h-12 text-white/10 mb-4" />
                            <p className={`${isDarkMode ? 'text-white/40' : 'text-gray-400'} text-sm`}>Nenhuma solicitação de orçamento ainda.</p>
                            <p className={`${isDarkMode ? 'text-white/30' : 'text-gray-300'} text-xs mt-1`}>Envie um pedido pelo site para testar.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {budgetRequests.slice(0, 5).map((req) => (
                                <div
                                    key={req.id}
                                    onClick={() => navigate('/admin/messages')}
                                    className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/10' : 'bg-gray-50 border-gray-100 hover:border-gray-200'} rounded-xl border transition-colors cursor-pointer`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-game-purple/10 flex items-center justify-center">
                                            <User className="w-6 h-6 text-game-purple" />
                                        </div>
                                        <div>
                                            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{req.name}</p>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-3 h-3 text-game-blue" />
                                                <span className={`text-xs ${isDarkMode ? 'text-game-blue' : 'text-blue-600'}`}>{req.service}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[10px] ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`}>
                                            <Clock className="w-3 h-3 inline mr-1" />
                                            {formatDate(req.date)}
                                        </span>
                                        <div className="mt-1">
                                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${req.status === 'pendente' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                                                {req.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    <div className={`${isDarkMode ? 'glass-card' : 'bg-white p-8 rounded-xl shadow-sm border border-gray-100'}`}>
                        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Serviços Ativos</h2>
                        <div className="space-y-4">
                            {[
                                { name: 'Manutenção PC', count: 12, icon: Briefcase },
                                { name: 'Instalação de Jogos', count: 45, icon: Gamepad2 },
                                { name: 'Suporte Tech', count: 8, icon: Briefcase },
                            ].map((service, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-game-blue/10 flex items-center justify-center">
                                            <service.icon className="w-4 h-4 text-game-blue" />
                                        </div>
                                        <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-600'}`}>{service.name}</span>
                                    </div>
                                    <span className={`text-xs font-bold ${isDarkMode ? 'text-game-blue' : 'text-gray-900'}`}>{service.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${isDarkMode ? 'glass-card' : 'bg-white p-8 rounded-xl shadow-sm border border-gray-100'}`}>
                        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Jogadores Online</h2>
                        <div className="space-y-4">
                            {[
                                { name: 'António Luanda', level: 99, status: 'Em Jogo' },
                                { name: 'Maria Benguela', level: 85, status: 'No Menu' },
                                { name: 'João Huambo', level: 150, status: 'Em Jogo' },
                            ].map((player, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
                                    <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'} flex items-center justify-center border`}>
                                        <Users className="w-5 h-5 text-white/40" />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{player.name}</p>
                                        <p className="text-white/40 text-xs">Nível {player.level}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${player.status === 'Em Jogo' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
