import { createConnection } from 'mysql2/promise';

async function initializeDatabase() {
  const connection = await createConnection({
    host: 'mysql_db',
    port: '3307',
    user: 'testuser',
    password: 'testuser123',
  });

  // Verifica se o banco de dados existe
  const [rows] = await connection.query(`SHOW DATABASES LIKE 'nestjs_content_creator_server';`);

  if (rows.length === 0) {
    // Cria o banco de dados se não existir
    await connection.query('CREATE DATABASE nestjs_content_creator_server;');
    console.log('Database "nestjs_content_creator_server" created successfully.');
  } else {
    console.log('Database "nestjs_content_creator_server" already exists.');
  }

  await connection.end();
}

initializeDatabase().catch(err => {
  console.error('Error initializing database:', err);
  process.exit(1);
});