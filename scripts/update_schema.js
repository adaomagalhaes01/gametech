import db from '../server/config/db.js';

async function updateSchema() {
    try {
        console.log('Atualizando schema da tabela users...');
        await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS photo TEXT DEFAULT NULL');
        console.log('Schema atualizado com sucesso!');
        process.exit(0);
    } catch (error) {
        console.error('Erro ao atualizar schema:', error);
        process.exit(1);
    }
}

updateSchema();
