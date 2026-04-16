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
    Clock,
    BarChart3,
    PieChart as PieChartIcon
} from 'lucide-react';
import axios from 'axios';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const API_URL = 'http://localhost:5000/api';

const visitorData = [
    { name: 'Seg', visitors: 400 },
    { name: 'Ter', visitors: 300 },
    { name: 'Qua', visitors: 600 },
    { name: 'Qui', visitors: 800 },
    { name: 'Sex', visitors: 500 },
    { name: 'Sáb', visitors: 900 },
    { name: 'Dom', visitors: 1100 },
];

const StatCard = ({ label, value, icon: Icon, trend, trendValue, onClick }) => (
    <motion.div
        whileHover={{ y: -5 }}
        onClick={onClick}
        className={`glass-card p-6 transition-all border border-white/5 shadow-xl ${onClick ? 'cursor-pointer' : ''}`}
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-game-purple/10 text-game-purple border border-game-purple/10 group-hover:bg-game-purple/20 transition-colors">
                <Icon className="w-6 h-6" />
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {trendValue}
            </div>
        </div>
        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">{label}</p>
        <h3 className="text-2xl font-tech font-bold text-white tracking-tighter italic">{value}</h3>
    </motion.div>
);

const DashboardHome = () => {
    const navigate = useNavigate();
    const [budgetRequests, setBudgetRequests] = useState([]);
    const [stats, setStats] = useState({
        usersCount: 0,
        itemsCount: 0,
    });

    useEffect(() => {
        loadDashboardData();
        const interval = setInterval(loadDashboardData, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadDashboardData = async () => {
        try {
            const [budgetsRes, usersRes, itemsRes] = await Promise.all([
                axios.get(`${API_URL}/budget`),
                axios.get(`${API_URL}/users`),
                axios.get(`${API_URL}/items`),
            ]);
            setBudgetRequests(budgetsRes.data);
            setStats({
                usersCount: usersRes.data.length,
                itemsCount: itemsRes.data.length,
            });
        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
        }
    };

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

    const calculatePackageData = () => {
        if (budgetRequests.length === 0) return [
            { name: 'Básico', value: 33, color: '#00A3FF' },
            { name: 'Intermediário', value: 33, color: '#8A2BE2' },
            { name: 'Premium', value: 34, color: '#FF007A' },
        ];

        const counts = {};
        budgetRequests.forEach(req => {
            const service = req.service || 'Outros';
            counts[service] = (counts[service] || 0) + 1;
        });

        const colors = ['#00A3FF', '#8A2BE2', '#FF007A', '#FACC15', '#10B981'];
        return Object.entries(counts).map(([name, count], index) => ({
            name,
            value: Math.round((count / budgetRequests.length) * 100),
            color: colors[index % colors.length]
        }));
    };

    const dynamicPackageData = calculatePackageData();
    const pendingCount = budgetRequests.filter(r => r.status === 'pendente').length;

    return (
        <div className="space-y-8">
            <div className="text-left">
                <h1 className="text-4xl font-tech font-bold text-white mb-2 uppercase italic tracking-tighter">
                    Dashboard <span className="text-game-purple text-3xl opacity-50">/ Analytics</span>
                </h1>
                <p className="text-white/60 text-lg font-medium opacity-80">Visão geral do sistema em tempo real.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Volume Previsto"
                    value={formatKwanza(budgetRequests.length * 75000)}
                    icon={ShoppingCart}
                    trend="up"
                    trendValue="+14%"
                />
                <StatCard
                    label="Team Staff"
                    value={stats.usersCount}
                    icon={Users}
                    trend="up"
                    trendValue={`+${stats.usersCount > 0 ? '1' : '0'} active`}
                />
                <StatCard
                    label="Catálogo Live"
                    value={stats.itemsCount}
                    icon={Gamepad2}
                    trend="up"
                    trendValue="Operational"
                />
                <StatCard
                    label="Inbox Pendente"
                    value={String(pendingCount)}
                    icon={MessageSquare}
                    trend="up"
                    trendValue={`${budgetRequests.length} total`}
                    onClick={() => navigate('/admin/messages')}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visitantes */}
                <div className="lg:col-span-2 glass-card border-white/5 shadow-2xl overflow-hidden relative text-left">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-game-blue/5 blur-[80px] -ml-16 -mt-16"></div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-game-blue/10 text-game-blue border border-game-blue/20">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-white uppercase italic tracking-tight">Visitantes no <span className="text-game-blue">Site</span></h2>
                        </div>
                    </div>

                    <div className="h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={visitorData}>
                                <defs>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }}
                                />
                                <Tooltip
                                    cursor={{ stroke: 'rgba(0, 163, 255, 0.2)', strokeWidth: 2 }}
                                    contentStyle={{ backgroundColor: '#0d0d1a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visitors"
                                    stroke="#00A3FF"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorVisitors)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Serviços */}
                <div className="glass-card border-white/5 shadow-2xl relative overflow-hidden text-left">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-game-purple/5 blur-[80px] -mr-16 -mb-16"></div>
                    <div className="flex items-center gap-3 mb-8 relative z-10">
                        <div className="p-3 rounded-xl bg-game-purple/10 text-game-purple border border-game-purple/20">
                            <PieChartIcon className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white uppercase italic tracking-tight">Serviços <span className="text-game-purple">Procurados</span></h2>
                    </div>

                    <div className="h-[200px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={dynamicPackageData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {dynamicPackageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0d0d1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <p className="text-2xl font-tech font-bold text-white tracking-tighter">100%</p>
                        </div>
                    </div>

                    <div className="space-y-2 mt-6 relative z-10">
                        {dynamicPackageData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest truncate max-w-[120px]">{item.name}</span>
                                </div>
                                <span className="text-xs font-black text-white">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Solicitações */}
                <div className="lg:col-span-2 glass-card border-white/5 shadow-2xl text-left">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-game-purple/10 text-game-purple border border-game-purple/10">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-white uppercase italic tracking-tight">Solicitações <span className="text-game-purple">Recentes</span></h2>
                        </div>
                        <button onClick={() => navigate('/admin/messages')} className="text-[10px] font-black uppercase tracking-widest text-game-purple hover:text-white transition-colors">Ver Dashboard CRM</button>
                    </div>

                    {budgetRequests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center opacity-30">
                            <MessageSquare className="w-12 h-12 mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest text-white/40">Caixa de entrada vazia</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {budgetRequests.slice(0, 4).map((req) => (
                                <div
                                    key={req.id}
                                    onClick={() => navigate('/admin/messages')}
                                    className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-game-purple/10 flex items-center justify-center border border-game-purple/20 group-hover:border-game-purple/50 transition-colors">
                                            <User className="w-5 h-5 text-game-purple" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm truncate max-w-[120px]">{req.name}</p>
                                            <p className="text-[10px] text-game-blue font-bold uppercase tracking-tight">{req.service}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[9px] text-white/20 font-bold uppercase">{formatDate(req.created_at)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Status */}
                <div className="glass-card border-white/5 shadow-2xl text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-game-blue/5 blur-[80px] -mr-16 -mt-16"></div>
                    <h2 className="text-xl font-bold text-white mb-8 uppercase italic tracking-tight relative z-10">Status de <span className="text-game-blue">Operação</span></h2>
                    <div className="space-y-6 relative z-10">
                        {[
                            { name: 'Server Uptime', progress: 99.9, color: '#00A3FF' },
                            { name: 'API Latency', progress: 12, color: '#8A2BE2' },
                            { name: 'Database Load', progress: 5, color: '#FF007A' },
                        ].map((s, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-white/40">{s.name}</span>
                                    <span className="text-white">{s.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${s.progress}%` }}
                                        className="h-full"
                                        style={{ backgroundColor: s.color }}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-game-purple/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-[10px] text-white/40 leading-relaxed font-bold uppercase tracking-widest relative z-10">
                                Sistema operacional.<br />Sem anomalias detectadas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
