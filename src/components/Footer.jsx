import React from 'react';
import { MessageSquare, Camera, Play, Share2, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10 relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="font-tech font-black text-3xl tracking-tighter text-game-dark uppercase italic">
                                GAME <span className="text-game-primary">TECH</span>
                            </span>
                        </div>
                        <p className="text-game-dark/40 max-w-sm mb-8">
                            Inovando o cenário de jogos digitais em Angola através de educação, entretenimento e valorização da cultura local.
                        </p>
                        <div className="flex gap-4">
                            {[MessageSquare, Camera, Play, Share2].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center text-game-dark/50 hover:text-white hover:bg-game-primary hover:border-game-primary transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h5 className="font-tech font-black text-game-dark uppercase tracking-widest mb-6 italic">Links Rápidos</h5>
                        <ul className="space-y-4">
                            <li><a href="#sobre" className="text-game-dark/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">A Empresa</a></li>
                            <li><a href="#jogo" className="text-game-dark/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">O Jogo</a></li>
                            <li><a href="#servicos" className="text-game-dark/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">Processo</a></li>
                            <li><a href="#equipa" className="text-game-dark/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">Equipa</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-tech font-black text-game-dark uppercase tracking-widest mb-6 italic">Legal</h5>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-game-dark/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">Privacidade</a></li>
                            <li><a href="#" className="text-game-dark/40 hover:text-game-primary transition-colors text-sm font-bold uppercase tracking-widest">Termos</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-game-dark/20 text-[10px] uppercase tracking-[0.4em] font-bold">
                        © 2026 GameTech Angola • Transformando o Futuro Digital
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="w-12 h-12 border-2 border-game-dark flex items-center justify-center text-game-dark hover:bg-game-primary hover:text-white hover:border-game-primary transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
