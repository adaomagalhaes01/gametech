import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Gamepad2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('As senhas não coincidem!');
            return;
        }

        try {
            await axios.post(`${API_URL}/users`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: 'Editor',
                status: 'Ativo'
            });

            toast.success('Conta criada com sucesso! Faça login para continuar.');
            navigate('/login');
        } catch (error) {
            const msg = error.response?.data?.error || error.response?.data?.message || 'Erro ao criar conta. Verifique sua conexão.';
            toast.error(msg);
        }
    };

    return (
        <div className="min-h-screen grid-pattern flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-lg p-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-game-purple opacity-20 blur-3xl -mr-16 -mt-16 rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-game-blue opacity-20 blur-3xl -ml-16 -mb-16 rounded-full" />

                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-game-purple/20 rounded-2xl flex items-center justify-center mb-4 neon-border-purple">
                        <Gamepad2 className="w-8 h-8 text-game-purple" />
                    </div>
                    <h1 className="text-3xl font-tech font-bold text-white mb-2">Criar Conta</h1>
                    <p className="text-white/60 text-sm">Junte-se ao universo GameTech</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80 ml-1">Nome</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-game-purple transition-colors" />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-game-purple/50 transition-all"
                                    placeholder="Seu nome"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80 ml-1">E-mail</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-game-purple transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-game-purple/50 transition-all"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 ml-1">Senha</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-game-purple transition-colors" />
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-game-purple/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 ml-1">Confirmar Senha</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-game-purple transition-colors" />
                            <input
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-game-purple/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <p className="text-xs text-white/40 px-1">
                        Ao criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade.
                    </p>

                    <button
                        type="submit"
                        className="w-full btn-primary flex items-center justify-center gap-2 group mt-4"
                    >
                        <span>Finalizar Cadastro</span>
                        <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                </form>

                <p className="mt-8 text-center text-white/60 text-sm">
                    Já possui cadastro?{' '}
                    <Link to="/login" className="text-game-blue hover:text-game-blue/80 font-bold transition-colors">
                        Fazer Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
