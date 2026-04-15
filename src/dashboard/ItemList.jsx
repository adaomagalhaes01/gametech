import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    Gamepad2,
    Package,
    Layers,
    X
} from 'lucide-react';

const RegisterModal = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="glass-card w-full max-w-2xl relative z-10 p-0 overflow-hidden shadow-2xl"
            >
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-2xl font-tech font-bold text-white">Novo Jogo Tech</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-white/60">Nome do Jogo/Produto</label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 transition-all"
                                placeholder="Ex: Angola Quest"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-white/60">Categoria</label>
                            <select className="w-full bg-[#0d0d1a] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 appearance-none cursor-pointer">
                                <option value="aventura">Aventura</option>
                                <option value="acção">Acção</option>
                                <option value="educativo">Educativo</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-white/60">Preço (Kz)</label>
                            <input
                                type="number"
                                className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 transition-all"
                                placeholder="0,00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-white/60">Estoque</label>
                            <input
                                type="number"
                                className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 transition-all"
                                placeholder="Quantidade"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-white/60">Descrição Técnica</label>
                        <textarea
                            rows="4"
                            className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 transition-all"
                            placeholder="Especificações do jogo..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-bold text-white hover:bg-white/5"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            Cadastrar Jogo
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const ItemList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatKwanza = (val) => {
        return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(val);
    };

    const items = [
        { id: 1, name: 'Angola Quest: Aventura', category: 'Aventura', price: 15000.00, stock: 45, status: 'Disponível' },
        { id: 2, name: 'Luanda Racer 2024', category: 'Corrida', price: 25000.00, stock: 12, status: 'Disponível' },
        { id: 3, name: 'Kizomba Rhythm', category: 'Musical', price: 12000.00, stock: 85, status: 'Disponível' },
        { id: 4, name: 'Tech Master Pro', category: 'Simulação', price: 55000.00, stock: 5, status: 'Últimas Unidades' },
        { id: 5, name: 'Batalha do Huambo', category: 'Acção', price: 30000.00, stock: 0, status: 'Esgotado' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-tech font-bold text-white mb-2">Catálogo de Jogos</h1>
                    <p className="text-white/60">Gerencie os produtos digitais da GameTech.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Novo Jogo</span>
                </button>
            </div>

            <div className="glass-card !p-0 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou categoria..."
                            className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-game-purple/50 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-wider">Jogo</th>
                                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-wider">Categoria</th>
                                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-wider">Preço</th>
                                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-wider">Estoque</th>
                                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-game-purple/10 flex items-center justify-center">
                                                <Package className="w-5 h-5 text-game-purple" />
                                            </div>
                                            <span className="font-medium text-white">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-white/60">{item.category}</span>
                                    </td>
                                    <td className="px-6 py-4 font-tech font-bold text-white">
                                        {formatKwanza(item.price)}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-white/60">
                                        {item.stock} licenças
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'Disponível' ? 'bg-green-400/10 text-green-400' :
                                            item.status === 'Últimas Unidades' ? 'bg-yellow-400/10 text-yellow-400' :
                                                'bg-red-400/10 text-red-400'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-game-purple transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <RegisterModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSave={() => setIsModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ItemList;
