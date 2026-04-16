import db from '../server/config/db.js';

async function addUsers() {
    try {
        console.log('Adicionando novos usuários...');

        // Atualizar Adalmercio
        await db.query('UPDATE users SET name = "Adalmercio Almeida", role = "Desenvolvedor" WHERE email LIKE "adalmercio%"');

        // Inserir outros
        const users = [
            ['Dionísio Casule', 'dionisio@gametech.ao', 'gametech2024', 'Moderador', 'Ativo'],
            ['Tonilson Felipe', 'tonilson@gametech.ao', 'gametech2024', 'Editor', 'Ativo']
        ];

        for (const user of users) {
            try {
                await db.query(
                    'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
                    user
                );
                console.log(`Usuário ${user[0]} adicionado.`);
            } catch (e) {
                if (e.code === 'ER_DUP_ENTRY') {
                    console.log(`Usuário ${user[0]} já existe.`);
                } else {
                    throw e;
                }
            }
        }

        console.log('Processo concluído!');
        process.exit(0);
    } catch (error) {
        console.error('Erro:', error);
        process.exit(1);
    }
}

addUsers();
