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
                            <span className="font-tech font-black text-3xl tracking-tighter text-white uppercase italic">
                                GAME <span className="text-game-primary">TECH</span>
                            </span>
                        </div>
                        <p className="text-white/40 max-w-sm mb-8">
                            Inovando o cenário de jogos digitais em Angola através de educação, entretenimento e valorização da cultura local.
                        </p>
                        <div className="flex gap-4">
                            {[MessageSquare, Camera, Play, Share2].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-game-primary hover:border-game-primary transition-all duration-300 rounded-lg">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h5 className="font-tech font-black text-white uppercase tracking-widest mb-6 italic">Links Rápidos</h5>
                        <ul className="space-y-4">
                            <li><a href="#sobre" className="text-white/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">A Empresa</a></li>
                            <li><a href="#jogo" className="text-white/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">O Jogo</a></li>
                            <li><a href="#servicos" className="text-white/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">Processo</a></li>
                            <li><a href="#equipa" className="text-white/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">Equipa</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-tech font-black text-white uppercase tracking-widest mb-6 italic">Legal</h5>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-white/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">Privacidade</a></li>
                            <li><a href="#" className="text-white/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">Termos</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold text-center md:text-left">
                        © 2026 GameTech Angola • Transformando o Futuro Digital
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-game-primary hover:text-white hover:border-game-primary transition-all duration-300 shadow-2xl shadow-game-primary/10"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
