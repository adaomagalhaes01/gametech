import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Gamepad2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        navigate('/admin');
    };

    return (
        <div className="min-h-screen grid-pattern flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card w-full max-w-md p-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-game-purple opacity-20 blur-3xl -mr-16 -mt-16 rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-game-blue opacity-20 blur-3xl -ml-16 -mb-16 rounded-full" />

                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-game-purple/20 rounded-2xl flex items-center justify-center mb-4 neon-border-purple">
                        <Gamepad2 className="w-8 h-8 text-game-purple" />
                    </div>
                    <h1 className="text-3xl font-tech font-bold text-white mb-2">GameTech</h1>
                    <p className="text-white/60 text-sm">Acesse seu painel administrativo</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 ml-1">E-mail</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-game-purple transition-colors" />
                            <input
                                type="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-game-purple/50 transition-all"
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 ml-1">Senha</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-game-purple transition-colors" />
                            <input
                                type="password"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-game-purple/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-game-purple focus:ring-game-purple" />
                            <span className="text-white/60">Lembrar-me</span>
                        </label>
                        <a href="#" className="text-game-blue hover:text-game-blue/80 transition-colors">Esqueceu a senha?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary flex items-center justify-center gap-2 group"
                    >
                        <span>Entrar no Sistema</span>
                        <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="mt-8 text-center text-white/60 text-sm">
                    Não tem uma conta?{' '}
                    <Link to="/register" className="text-game-purple hover:text-game-purple/80 font-bold transition-colors">
                        Crie uma agora
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
