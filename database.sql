-- Database GameTech Angola
CREATE DATABASE IF NOT EXISTS gametech_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gametech_db;

-- 1. Tabela de Usuários (Painel Administrativo)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Administrador', 'Desenvolvedor', 'Editor', 'Moderador') DEFAULT 'Editor',
    status ENUM('Ativo', 'Inativo') DEFAULT 'Ativo',
    last_login DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabela de Solicitações de Orçamento (Modal do Site)
CREATE TABLE IF NOT EXISTS budget_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    service VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pendente', 'respondido', 'arquivado') DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Tabela de Itens/Jogos (Catálogo)
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    stock INT DEFAULT 0,
    description TEXT,
    status ENUM('Disponível', 'Últimas Unidades', 'Esgotado') DEFAULT 'Disponível',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Inserção de Dados Iniciais para Teste
INSERT INTO users (name, email, password, role, status) VALUES 
('Admin GameTech', 'admin@gametech.ao', '$2y$10$abcdefghijklmnopqrstuv', 'Administrador', 'Ativo'),
('Adalmercio', 'adalmercio@gametech.ao', '$2y$10$abcdefghijklmnopqrstuv', 'Desenvolvedor', 'Ativo');

INSERT INTO items (name, category, price, stock, status) VALUES 
('Angola Quest: Aventura', 'Aventura', 15000.00, 45, 'Disponível'),
('Luanda Racer 2024', 'Corrida', 25000.00, 12, 'Disponível'),
('Kizomba Rhythm', 'Musical', 12000.00, 85, 'Disponível'),
('Tech Master Pro', 'Simulação', 55000.00, 5, 'Últimas Unidades'),
('Batalha do Huambo', 'Acção', 30000.00, 0, 'Esgotado');

INSERT INTO budget_requests (name, email, phone, service, description, status) VALUES 
('Carlos Silva', 'carlos@email.com', '923000111', 'Pacote Intermediário', 'Gostaria de desenvolver um jogo educativo para crianças.', 'pendente');
