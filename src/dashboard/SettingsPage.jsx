import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Settings, Bell, Shield, Globe, Monitor, Save, Database, Key } from 'lucide-react';

const SettingsPage = () => {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-4xl font-tech font-bold text-white mb-2">Configurações</h1>
                <p className="text-white/60">Ajuste as preferências globais do painel administrativo.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                    <button className="w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all bg-game-purple text-white shadow-[0_0_15px_rgba(138,43,226,0.5)]">
                        <Monitor className="w-5 h-5" />
                        <span className="font-bold">Geral</span>
                    </button>
                    <button className="w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all hover:bg-white/5 text-white/60">
                        <Bell className="w-5 h-5" />
                        <span className="font-bold">Notificações</span>
                    </button>
                    <button className="w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all hover:bg-white/5 text-white/60">
                        <Key className="w-5 h-5" />
                        <span className="font-bold">Segurança</span>
                    </button>
                    <button className="w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all hover:bg-white/5 text-white/60">
                        <Database className="w-5 h-5" />
                        <span className="font-bold">Backup & Dados</span>
                    </button>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="glass-card p-8 space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white">Informações do Site</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/40 uppercase">Título do Site</label>
                                    <input type="text" defaultValue="GameTech Angola" className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/40 uppercase">E-mail de Suporte</label>
                                    <input type="email" defaultValue="suporte@gametech.ao" className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/40 uppercase">Moeda Padrão</label>
                                    <select className="w-full appearance-none bg-[#0d0d1a] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 cursor-pointer">
                                        <option value="AOA">Kwanza (AOA)</option>
                                        <option value="USD">Dólar (USD)</option>
                                        <option value="EUR">Euro (EUR)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-8 border-t border-white/10">
                            <h3 className="text-xl font-bold text-white">Preferências do Painel</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-sm text-white">Auto-salvamento</p>
                                        <p className="text-white/40 text-xs">Salvar alterações automaticamente ao sair do campo.</p>
                                    </div>
                                    <div className="w-12 h-6 bg-game-purple rounded-full relative">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-sm text-white">Logs de Atividade</p>
                                        <p className="text-white/40 text-xs">Registrar todas as ações realizadas pelos administradores.</p>
                                    </div>
                                    <div className="w-12 h-6 bg-white/10 rounded-full relative">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                                <Save className="w-5 h-5" />
                                <span>Salvar Configurações</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
