import React from 'react';
import { MessageSquare, Camera, Play, Share2, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-game-dark border-t border-white/5 pt-20 pb-10 relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-game-purple to-game-blue rounded-xl flex items-center justify-center font-tech font-bold text-white text-2xl">
                                GT
                            </div>
                            <span className="font-tech font-bold text-3xl tracking-tighter text-white">
                                GAME <span className="text-game-purple">TECH</span>
                            </span>
                        </div>
                        <p className="text-white/40 max-w-sm mb-8">
                            A vanguarda do desenvolvimento de jogos em Angola. Criamos mais do que códigos, criamos mundos onde você é o herói.
                        </p>
                        <div className="flex gap-4">
                            {[MessageSquare, Camera, Play, Share2].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-game-purple hover:border-game-purple transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h5 className="font-tech font-bold text-white uppercase tracking-[0.2em] mb-6">Links Rápidos</h5>
                        <ul className="space-y-4">
                            <li><a href="#sobre" className="text-white/40 hover:text-white transition-colors">Sobre Nós</a></li>
                            <li><a href="#jogo" className="text-white/40 hover:text-white transition-colors">Nossos Jogos</a></li>
                            <li><a href="#servicos" className="text-white/40 hover:text-white transition-colors">Preços</a></li>
                            <li><a href="#equipa" className="text-white/40 hover:text-white transition-colors">Equipa</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-tech font-bold text-white uppercase tracking-[0.2em] mb-6">Legal</h5>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-white/40 hover:text-white transition-colors">Privacidade</a></li>
                            <li><a href="#" className="text-white/40 hover:text-white transition-colors">Termos de Uso</a></li>
                            <li><a href="#" className="text-white/40 hover:text-white transition-colors">Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/20 text-xs uppercase tracking-widest">
                        © 2026 Game Tech Studio. Todos os direitos reservados.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:bg-game-purple hover:text-white hover:border-game-purple transition-all duration-300 group"
                    >
                        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-2/3 h-40 bg-game-purple/10 blur-[100px] rounded-full"></div>
        </footer>
    );
};

export default Footer;
