import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Search,
    Bell,
    Gamepad2,
    Database,
    Briefcase,
    MessageSquare,
    Moon,
    Sun
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const navigate = useNavigate();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Painel de Controle', path: '/admin' },
        { icon: Database, label: 'Lista de Jogos', path: '/admin/items' },
        { icon: Briefcase, label: 'Serviços Tech', path: '/admin/services' },
        { icon: MessageSquare, label: 'Solicitações/Mensagens', path: '/admin/messages' },
        { icon: Users, label: 'Usuários', path: '/admin/users' },
        { icon: Settings, label: 'Configurações', path: '/admin/settings' },
    ];

    const getNavLinkClass = ({ isActive }) => {
        const base = "flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ";
        if (isActive) {
            return base + "bg-game-purple text-white shadow-[0_0_15px_rgba(138,43,226,0.5)]";
        }
        if (isDarkMode) {
            return base + "text-white/60 hover:bg-white/5 hover:text-white";
        }
        return base + "text-gray-500 hover:bg-gray-100 hover:text-gray-900";
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-game-dark text-white' : 'bg-gray-100 text-gray-900'} flex transition-colors duration-300`}>
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className={`fixed left-0 top-0 h-full ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} backdrop-blur-xl border-r z-50 flex flex-col`}
            >
                <div className={`p-6 flex items-center gap-4 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    <div className="min-w-[40px] h-10 bg-game-purple/20 rounded-xl flex items-center justify-center neon-border-purple">
                        <Gamepad2 className="w-6 h-6 text-game-purple" />
                    </div>
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className={`text-xl font-tech font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} whitespace-nowrap`}
                            >
                                GameTech Admin
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={getNavLinkClass}
                        >
                            <item.icon className="w-6 h-6 min-w-[24px]" />
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="font-medium whitespace-nowrap text-sm"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    ))}
                </nav>

                <div className={`p-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    <button
                        onClick={() => navigate('/login')}
                        className={`flex items-center gap-4 p-3 w-full rounded-xl transition-all duration-300 ${isDarkMode ? 'text-white/60 hover:bg-red-500/10 hover:text-red-500' : 'text-gray-500 hover:bg-red-50 hover:text-red-600'}`}
                    >
                        <LogOut className="w-6 h-6 min-w-[24px]" />
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="font-medium text-sm"
                                >
                                    Sair
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main
                className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}
            >
                {/* Header */}
                <header className={`h-20 ${isDarkMode ? 'bg-game-dark/50' : 'bg-white/80'} backdrop-blur-md border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between px-8 sticky top-0 z-40`}>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-white/5 text-white/60 hover:text-white' : 'bg-gray-100 text-gray-400 hover:text-gray-900'}`}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="relative hidden md:block">
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                className={`${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-100 border-gray-200 text-gray-900'} border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-game-purple/50 w-64`}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-white/60 hover:text-game-blue' : 'text-gray-400 hover:text-gray-900'}`}
                        >
                            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                        </button>
                        <button className={`relative p-2 transition-colors ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-game-purple rounded-full"></span>
                        </button>
                        <div className={`flex items-center gap-3 pl-6 border-l ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                            <div className="text-right hidden sm:block">
                                <p className={`text-sm font-bold leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin</p>
                                <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Angola | Kz</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-game-purple to-game-blue p-[2px]">
                                <div className={`w-full h-full rounded-full ${isDarkMode ? 'bg-game-dark text-white' : 'bg-white text-gray-900'} flex items-center justify-center`}>
                                    <span className="font-bold text-sm">AD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    <Outlet context={{ isDarkMode }} />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
