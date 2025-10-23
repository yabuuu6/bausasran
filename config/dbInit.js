const mysql = require('mysql2/promise');
// Langsung ambil konfigurasi 'development'
const config = require('./config.json')['development'];

async function initializeDatabase() {
  let connection;
  try {
    // 1. Terhubung ke MySQL Server (tanpa memilih database)
    console.log(`Menghubungkan ke MySQL Server di port ${config.port}...`);
    connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password
    });

    // 2. Jalankan perintah CREATE DATABASE IF NOT EXISTS
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);

    console.log(`Database '${config.database}' sudah siap.`);

  } catch (error) {
    console.error('Error saat inisialisasi database:', error);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

// Bagian ini penting agar kita bisa menjalankannya dari Langkah 4
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;