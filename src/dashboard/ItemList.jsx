import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
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
    X,
    Save
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const ItemModal = ({ isOpen, onClose, onSave, item }) => {
    if (!isOpen) return null;
    const isEdit = !!item;

    const [form, setForm] = useState({
        name: item?.name || '',
        category: item?.category || 'aventura',
        price: item?.price || '',
        stock: item?.stock || '',
        description: item?.description || '',
        status: item?.status || 'Disponível'
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`${API_URL}/items/${item.id}`, form);
                toast.success('Jogo atualizado com sucesso!');
            } else {
                await axios.post(`${API_URL}/items`, form);
                toast.success('Jogo cadastrado com sucesso!');
            }
            onSave();
        } catch (error) {
            toast.error(`Erro ao ${isEdit ? 'atualizar' : 'cadastrar'} jogo.`);
        }
    };

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
                className="glass-card w-full max-w-2xl relative z-10 p-0 overflow-hidden shadow-2xl border-game-purple/20"
            >
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-2xl font-tech font-bold text-white uppercase italic">
                        {isEdit ? 'Editar' : 'Novo'} <span className="text-game-purple">Jogo Tech</span>
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Nome do Jogo/Produto</label>
                            <input
                                name="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 transition-all font-medium"
                                placeholder="Ex: Angola Quest"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Categoria</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full bg-[#0d0d1a] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 appearance-none cursor-pointer"
                            >
                                <option value="aventura">Aventura</option>
                                <option value="acção">Acção</option>
                                <option value="educativo">Educativo</option>
                                <option value="Corrida">Corrida</option>
                                <option value="Musical">Musical</option>
                                <option value="Simulação">Simulação</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Preço (Kz)</label>
                            <input
                                name="price"
                                type="number"
                                required
                                value={form.price}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 transition-all font-medium"
                                placeholder="0,00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Estoque</label>
                            <input
                                name="stock"
                                type="number"
                                required
                                value={form.stock}
                                onChange={handleChange}
                                className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 transition-all font-medium"
                                placeholder="Quantidade"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full bg-[#0d0d1a] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 appearance-none cursor-pointer"
                            >
                                <option value="Disponível">Disponível</option>
                                <option value="Últimas Unidades">Últimas Unidades</option>
                                <option value="Esgotado">Esgotado</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Descrição Técnica</label>
                        <textarea
                            name="description"
                            rows="4"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-game-purple/50 transition-all resize-none font-medium"
                            placeholder="Especificações do jogo..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-bold text-white hover:bg-white/5 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary flex items-center gap-2"
                        >
                            {isEdit ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                            <span>{isEdit ? 'Salvar Alterações' : 'Cadastrar Jogo'}</span>
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const ItemList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/items`);
            setItems(data);
            setLoading(false);
        } catch (error) {
            toast.error('Erro ao carregar catálogo.');
            setLoading(false);
        }
    };

    const formatKwanza = (val) => {
        return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(val);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja eliminar este jogo?')) return;
        try {
            await axios.delete(`${API_URL}/items/${id}`);
            toast.success('Jogo removido!');
            loadItems();
        } catch (error) {
            toast.error('Erro ao remover.');
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-tech font-bold text-white mb-2">Catálogo de Jogos</h1>
                    <p className="text-white/60">Gerencie os produtos digitais da GameTech.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Novo Jogo</span>
                </button>
            </div>

            <div className="glass-card !p-0 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md text-left">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou categoria..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border-white/10 text-white border rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-game-purple/50 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto text-left">
                    <table className="w-full text-left">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest text-left">Jogo</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest text-left">Categoria</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest text-left">Preço</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest text-left">Estoque</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest text-left">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/40 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 text-left">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-game-purple/10 flex items-center justify-center border border-game-purple/20">
                                                <Package className="w-5 h-5 text-game-purple" />
                                            </div>
                                            <span className="font-bold text-white text-sm">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-left text-left">
                                        <span className="text-white/60 text-sm font-medium">{item.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-left font-tech font-bold text-white text-sm">
                                        {formatKwanza(item.price)}
                                    </td>
                                    <td className="px-6 py-4 text-left text-xs text-white/60 font-medium">
                                        {item.stock} licenças
                                    </td>
                                    <td className="px-6 py-4 text-left">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'Disponível' ? 'bg-green-400/10 text-green-400 border border-green-400/20' :
                                            item.status === 'Últimas Unidades' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' :
                                                'bg-red-400/10 text-red-400 border border-red-400/20'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setEditingItem(item);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-game-purple transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-red-500 transition-colors"
                                            >
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
                    <ItemModal
                        isOpen={isModalOpen}
                        item={editingItem}
                        onClose={() => setIsModalOpen(false)}
                        onSave={() => {
                            setIsModalOpen(false);
                            loadItems();
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ItemList;
