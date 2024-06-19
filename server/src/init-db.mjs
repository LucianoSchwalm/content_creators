import { createConnection } from 'mysql2/promise';

async function initializeDatabase() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root_password1',
  });

  // Verifica se o banco de dados existe
  const [rows] = await connection.query(`SHOW DATABASES LIKE 'desafio_pratico_nestjs';`);

  if (rows.length === 0) {
    // Cria o banco de dados se não existir
    await connection.query('CREATE DATABASE desafio_pratico_nestjs;');
    console.log('Database "desafio_pratico_nestjs" created successfully.');
  } else {
    console.log('Database "desafio_pratico_nestjs" already exists.');
  }

  await connection.end();
}

initializeDatabase().catch(err => {
  console.error('Error initializing database:', err);
  process.exit(1);
});