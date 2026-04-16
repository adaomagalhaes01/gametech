import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Camera, Save, Shield, Smartphone } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const ProfilePage = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('gametech_user') || '{}'));
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        photo: user.photo || '',
        password: '',
        confirmPassword: ''
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password && formData.password !== formData.confirmPassword) {
            return toast.error('As senhas não coincidem!');
        }

        setIsLoading(true);
        try {
            const { data } = await axios.put(`${API_URL}/users/profile/${user.id}`, {
                name: formData.name,
                email: formData.email,
                photo: formData.photo,
                password: formData.password || undefined
            });

            const updatedUser = { ...user, ...data.user };
            localStorage.setItem('gametech_user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            toast.success('Perfil atualizado com sucesso!');
            // Force refresh of layout
            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new Event('profileUpdate'));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao atualizar perfil.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-left">
                <h1 className="text-4xl font-tech font-bold text-white mb-2 uppercase italic tracking-tighter">
                    Configurações de <span className="text-game-purple">Perfil</span>
                </h1>
                <p className="text-white/60">Gerencie suas informações pessoais e segurança.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Avatar Column */}
                <div className="glass-card flex flex-col items-center p-8 space-y-6">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-full border-4 border-game-purple/30 overflow-hidden shadow-[0_0_30px_rgba(138,43,226,0.2)]">
                            {formData.photo ? (
                                <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-game-dark flex items-center justify-center">
                                    <User className="w-20 h-20 text-white/10" />
                                </div>
                            )}
                        </div>
                        <label className="absolute bottom-2 right-2 p-3 bg-game-purple rounded-xl cursor-pointer hover:scale-110 transition-transform shadow-lg">
                            <Camera className="w-5 h-5 text-white" />
                            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                        </label>
                    </div>

                    <div className="text-center">
                        <h2 className="text-xl font-bold text-white">{user.name}</h2>
                        <span className="px-3 py-1 bg-game-purple/10 text-game-purple border border-game-purple/20 rounded-full text-[10px] font-black uppercase tracking-widest mt-2 inline-block">
                            {user.role}
                        </span>
                    </div>

                    <div className="w-full pt-6 border-t border-white/5 space-y-4">
                        <div className="flex items-center gap-3 text-white/40">
                            <Shield className="w-4 h-4" />
                            <span className="text-xs uppercase font-bold tracking-widest">Acesso Verificado</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/40">
                            <Mail className="w-4 h-4" />
                            <span className="text-xs">{user.email}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Form Column */}
                <div className="lg:col-span-2 glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Nome Completo</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-game-purple transition-colors" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-game-purple/50 transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">E-mail Corporativo</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-game-purple transition-colors" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-game-purple/50 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                <Lock className="w-4 h-4 text-game-purple" />
                                Alterar Senha
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Nova Senha</label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Deixe em branco para manter"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-game-purple/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">Confirmar Nova Senha</label>
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="Repita a nova senha"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-game-purple/50 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary flex items-center gap-3 px-8 group"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                )}
                                <span>Salvar Alterações</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
