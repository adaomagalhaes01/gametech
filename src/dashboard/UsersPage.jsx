import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Search, UserPlus, Edit2, Trash2, Shield, ShieldCheck, User, X, AlertTriangle, Save } from 'lucide-react';

const roleOptions = ['Administrador', 'Desenvolvedor', 'Editor', 'Moderador'];
const statusOptions = ['Ativo', 'Inativo'];

const initialUsers = [
    { id: 1, name: 'Admin GameTech', email: 'admin@gametech.ao', role: 'Administrador', status: 'Ativo', lastLogin: 'Agora' },
    { id: 2, name: 'Adalmercio', email: 'adalmercio@gametech.ao', role: 'Desenvolvedor', status: 'Ativo', lastLogin: 'Há 2 horas' },
    { id: 3, name: 'Diva Portela', email: 'diva@gametech.ao', role: 'Editor', status: 'Inativo', lastLogin: '3 dias atrás' },
    { id: 4, name: 'Joel Tech', email: 'joel@gametech.ao', role: 'Moderador', status: 'Ativo', lastLogin: 'Ontem' },
    { id: 5, name: 'Mauro Game', email: 'mauro@gametech.ao', role: 'Editor', status: 'Ativo', lastLogin: 'Há 5 horas' },
];

// ─── Modal Overlay ───────────────────────────────────────────────
const ModalOverlay = ({ children, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-game-dark/70 backdrop-blur-sm"
        />
        {children}
    </div>
);

// ─── Input Field ─────────────────────────────────────────────────
const FormField = ({ label, children }) => (
    <div>
        <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">{label}</label>
        {children}
    </div>
);

const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-game-purple transition-colors";
const selectClass = "w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-game-purple transition-colors appearance-none";

// ─── Add / Edit User Modal ──────────────────────────────────────
const UserFormModal = ({ onClose, onSave, user }) => {
    const isEdit = !!user;
    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || roleOptions[0],
        status: user?.status || statusOptions[0],
        password: '',
    });

    const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        if (!isEdit && !form.password) {
            alert('Por favor, defina uma senha para o novo usuário.');
            return;
        }
        onSave(form);
    };

    return (
        <ModalOverlay onClose={onClose}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md md:max-w-lg bg-game-dark border neon-border-purple rounded-2xl p-6 md:p-8 z-10"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>

                <h3 className="text-2xl font-tech font-bold text-white uppercase italic mb-1">
                    {isEdit ? 'Editar' : 'Adicionar'} <span className="text-game-purple">Usuário</span>
                </h3>
                <p className="text-white/50 text-sm mb-6">
                    {isEdit ? 'Atualize as informações do usuário.' : 'Preencha os dados para criar um novo usuário.'}
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <FormField label="Nome Completo *">
                        <input
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange('name')}
                            className={inputClass}
                            placeholder="Ex: João Silva"
                        />
                    </FormField>

                    <FormField label="Email *">
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange('email')}
                            className={inputClass}
                            placeholder="email@gametech.ao"
                        />
                    </FormField>

                    {!isEdit && (
                        <FormField label="Senha *">
                            <input
                                type="password"
                                required
                                value={form.password}
                                onChange={handleChange('password')}
                                className={inputClass}
                                placeholder="Defina uma senha segura"
                            />
                        </FormField>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Função *">
                            <select value={form.role} onChange={handleChange('role')} className={selectClass}>
                                {roleOptions.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Status *">
                            <select value={form.status} onChange={handleChange('status')} className={selectClass}>
                                {statusOptions.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </FormField>
                    </div>

                    <button type="submit" className="w-full btn-primary flex items-center justify-center gap-3 group mt-2">
                        {isEdit ? 'Salvar Alterações' : 'Cadastrar Usuário'}
                        {isEdit ? (
                            <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        ) : (
                            <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        )}
                    </button>
                </form>
            </motion.div>
        </ModalOverlay>
    );
};

// ─── Delete Confirmation Modal ──────────────────────────────────
const DeleteConfirmModal = ({ onClose, onConfirm, userName }) => (
    <ModalOverlay onClose={onClose}>
        <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-game-dark border border-red-500/30 rounded-2xl p-6 md:p-8 z-10 text-center"
        >
            <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-5 border border-red-500/20">
                <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            <h3 className="text-xl font-tech font-bold text-white mb-2">Eliminar Usuário</h3>
            <p className="text-white/50 text-sm mb-6">
                Tem certeza que deseja eliminar <span className="text-white font-semibold">{userName}</span>? Esta ação não pode ser desfeita.
            </p>

            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 hover:text-white transition-colors font-semibold text-sm"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors"
                >
                    Sim, Eliminar
                </button>
            </div>
        </motion.div>
    </ModalOverlay>
);

// ─── Main Page ──────────────────────────────────────────────────
const UsersPage = () => {
    const { isDarkMode } = useOutletContext();
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState(initialUsers);

    // modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    // ── handlers ────────────────────────────────────────────
    const handleAddUser = (form) => {
        const newUser = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            role: form.role,
            status: form.status,
            lastLogin: 'Nunca',
        };
        setUsers((prev) => [...prev, newUser]);
        setShowAddModal(false);
    };

    const handleEditUser = (form) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === editingUser.id
                    ? { ...u, name: form.name, email: form.email, role: form.role, status: form.status }
                    : u
            )
        );
        setEditingUser(null);
    };

    const handleDeleteUser = () => {
        setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
        setDeletingUser(null);
    };

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* ── Header ─────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-4xl font-tech font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Gestão de Usuários</h1>
                    <p className={isDarkMode ? 'text-white/60' : 'text-gray-500'}>Controle quem tem acesso ao painel administrativo.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center justify-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    <span>Adicionar Usuário</span>
                </button>
            </div>

            {/* ── Table Card ─────────────────────────────── */}
            <div className={`overflow-hidden rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                    <div className="relative flex-1 max-w-md">
                        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            placeholder="Buscar usuários..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`w-full ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-game-purple/50`}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className={isDarkMode ? 'bg-black/20' : 'bg-gray-50'}>
                            <tr>
                                <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Usuário</th>
                                <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Função</th>
                                <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Status</th>
                                <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Último Login</th>
                                <th className={`px-6 py-4 text-xs font-bold uppercase tracking-wider text-right ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Ações</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDarkMode ? 'divide-white/10' : 'divide-gray-100'}`}>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className={`${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-colors group`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-game-purple/10 flex items-center justify-center border border-game-purple/20">
                                                <User className="w-5 h-5 text-game-purple" />
                                            </div>
                                            <div>
                                                <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                                                <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {user.role === 'Administrador' ? (
                                                <ShieldCheck className="w-4 h-4 text-game-blue" />
                                            ) : (
                                                <Shield className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                                            )}
                                            <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === 'Ativo' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{user.lastLogin}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setEditingUser(user)}
                                                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/40 hover:text-game-purple' : 'hover:bg-gray-100 text-gray-400 hover:text-game-purple'}`}
                                                title="Editar"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeletingUser(user)}
                                                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/40 hover:text-red-500' : 'hover:bg-gray-100 text-gray-400 hover:text-red-500'}`}
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <p className={`text-sm ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Nenhum usuário encontrado.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Modals ─────────────────────────────────── */}
            <AnimatePresence>
                {showAddModal && (
                    <UserFormModal
                        key="add"
                        onClose={() => setShowAddModal(false)}
                        onSave={handleAddUser}
                    />
                )}
                {editingUser && (
                    <UserFormModal
                        key="edit"
                        user={editingUser}
                        onClose={() => setEditingUser(null)}
                        onSave={handleEditUser}
                    />
                )}
                {deletingUser && (
                    <DeleteConfirmModal
                        key="delete"
                        userName={deletingUser.name}
                        onClose={() => setDeletingUser(null)}
                        onConfirm={handleDeleteUser}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default UsersPage;
