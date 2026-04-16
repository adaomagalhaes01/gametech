import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './dashboard/Login';
import Register from './dashboard/Register';
import AdminLayout from './dashboard/AdminLayout';
import DashboardHome from './dashboard/DashboardHome';
import ItemList from './dashboard/ItemList';
import ServicesPage from './dashboard/ServicesPage';
import MessagesPage from './dashboard/MessagesPage';
import UsersPage from './dashboard/UsersPage';
import SettingsPage from './dashboard/SettingsPage';
import ProfilePage from './dashboard/ProfilePage';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="items" element={<ItemList />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
