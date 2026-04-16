import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Settings, Bell, Shield, Globe, Monitor, Save, Database, Key, RefreshCcw } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        site_name: 'GameTech Angola',
        contact_email: 'suporte@gametech.ao',
        currency: 'Kz'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/settings`);
            const settingsMap = {};
            data.forEach(s => {
                settingsMap[s.setting_key] = s.setting_value;
            });
            setSettings({
                site_name: settingsMap.site_name || 'GameTech Angola',
                contact_email: settingsMap.contact_email || 'suporte@gametech.ao',
                currency: settingsMap.currency || 'Kz'
            });
            setLoading(false);
        } catch (error) {
            toast.error('Erro ao carregar configurações.');
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await Promise.all([
                axios.put(`${API_URL}/settings/site_name`, { value: settings.site_name }),
                axios.put(`${API_URL}/settings/contact_email`, { value: settings.contact_email }),
                axios.put(`${API_URL}/settings/currency`, { value: settings.currency }),
            ]);
            toast.success('Configurações salvas com sucesso!');
        } catch (error) {
            toast.error('Erro ao salvar algumas configurações.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-4xl font-tech font-bold text-white mb-2 uppercase italic tracking-tighter">
                    Configurações <span className="text-game-purple text-3xl opacity-50">/ Sistema</span>
                </h1>
                <p className="text-white/60">Ajuste as preferências globais do painel administrativo.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                    <button className="w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all bg-game-purple/20 border border-game-purple/50 text-white shadow-[0_0_20px_rgba(138,43,226,0.2)]">
                        <Monitor className="w-5 h-5 text-game-purple" />
                        <span className="font-bold text-sm uppercase tracking-widest">Geral</span>
                    </button>
                    <button className="w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all hover:bg-white/5 border border-transparent text-white/40 group">
                        <Bell className="w-5 h-5 group-hover:text-white transition-colors" />
                        <span className="font-bold text-sm uppercase tracking-widest group-hover:text-white transition-colors">Notificações</span>
                    </button>
                    <button className="w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all hover:bg-white/5 border border-transparent text-white/40 group">
                        <Key className="w-5 h-5 group-hover:text-white transition-colors" />
                        <span className="font-bold text-sm uppercase tracking-widest group-hover:text-white transition-colors">Segurança</span>
                    </button>
                    <button className="w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all hover:bg-white/5 border border-transparent text-white/40 group">
                        <Database className="w-5 h-5 group-hover:text-white transition-colors" />
                        <span className="font-bold text-sm uppercase tracking-widest group-hover:text-white transition-colors">Backup & Dados</span>
                    </button>
                </div>

                <div className="md:col-span-2 space-y-6 text-left">
                    <div className="glass-card shadow-2xl border-white/5 p-8 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-game-purple/5 blur-[100px] -mr-32 -mt-32"></div>

                        <div className="space-y-6 relative z-10">
                            <h3 className="text-xl font-bold text-white uppercase italic">Informações do <span className="text-game-blue">Site</span></h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Título do Site</label>
                                    <input
                                        type="text"
                                        value={settings.site_name}
                                        onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                                        className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">E-mail de Suporte</label>
                                    <input
                                        type="email"
                                        value={settings.contact_email}
                                        onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                                        className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Moeda Padrão</label>
                                    <div className="relative">
                                        <select
                                            value={settings.currency}
                                            onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                            className="w-full appearance-none bg-[#0d0d1a] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 cursor-pointer font-medium"
                                        >
                                            <option value="Kz">Kwanza (AOA)</option>
                                            <option value="US$">Dólar (USD)</option>
                                            <option value="€">Euro (EUR)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-8 border-t border-white/10 relative z-10">
                            <h3 className="text-xl font-bold text-white uppercase italic">Preferências do <span className="text-game-purple">Painel</span></h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 group hover:bg-white/10 transition-colors">
                                    <div>
                                        <p className="font-bold text-sm text-white uppercase tracking-wider">Auto-salvamento</p>
                                        <p className="text-white/40 text-[10px] uppercase tracking-wide">Salvar alterações automaticamente ao sair do campo.</p>
                                    </div>
                                    <div className="w-10 h-5 bg-game-purple/40 rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 group hover:bg-white/10 transition-colors">
                                    <div>
                                        <p className="font-bold text-sm text-white uppercase tracking-wider">Logs de Atividade</p>
                                        <p className="text-white/40 text-[10px] uppercase tracking-wide">Registrar todas as ações realizadas pelos administradores.</p>
                                    </div>
                                    <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-3 h-3 bg-white/30 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 relative z-10">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="btn-primary w-full flex items-center justify-center gap-2 py-4 relative group overflow-hidden"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                {saving ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                <span className="uppercase tracking-widest font-bold">{saving ? 'A Guardar...' : 'Salvar Configurações'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
