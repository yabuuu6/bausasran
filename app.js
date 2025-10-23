// 1. IMPORT DEPENDENSI
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');

// 2. IMPORT LOKAL
const initializeDatabase = require('./config/dbInit'); // Script "Buat Database"
const seedDatabase = require('./config/seeder');       // Script "Isi Data"
const db = require('./models');                        // Koneksi Sequelize

// Impor Rute (Kita matikan penggunaannya di bawah)
// const authRoutes = require('./routes/auth');
// const adminRoutes = require('./routes/admin');
// const indexRoutes = require('./routes/index');

// 3. KONFIGURASI EJS (VIEW ENGINE)
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 4. KONFIGURASI MIDDLEWARE DASAR
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


/* // --- FITUR DI BAWAH INI BELUM KITA SETUP ---
// (Kita aktifkan lagi nanti)

// require('dotenv').config(); 
// const session = require('express-session');
// const flash = require('connect-flash');
// ... (dst) ...
*/


// 7. MENGHUBUNGKAN RUTE (ROUTING)
// === DIMATIKAN SEMENTARA SESUAI PERMINTAAN ===
// app.use('/', authRoutes); 
// app.use('/admin', adminRoutes);
// app.use('/', indexRoutes); 
// ============================================


// 9. FUNGSI START SERVER (WORKFLOW OTOMATIS)
async function startServer() {
  try {
    // LANGKAH 1: Pastikan database 'bausasran' ada
    await initializeDatabase();
    console.log('✅ [SERVER 1/4] Inisialisasi Database Selesai.');

    // LANGKAH 2: Sinkronkan Model -> Buat Tabel JIKA BELUM ADA
    // Ini akan membaca semua file di folder /models dan membuat tabelnya.
    // 'alter: true' aman untuk development.
    await db.sequelize.sync({ alter: true });
    console.log('✅ [SERVER 2/4] Sinkronisasi Model & Tabel Selesai.');

    // LANGKAH 3: Isi Data Awal (Seeding)
    // Ini akan cek tabel 'pengguna', jika kosong, akan dibuatkan admin
    await seedDatabase();
    console.log('✅ [SERVER 3/4] Pengecekan Data Awal (Seed) Selesai.');
    
    // LANGKAH 4: Tes Koneksi dan Jalankan Server
    await db.sequelize.authenticate();
    console.log('✅ [SERVER 4/4] Koneksi Sequelize ke database berhasil.');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ GAGAL TOTAL memulai server:', error);
    process.exit(1); // Keluar jika koneksi DB gagal
  }
}

// 10. JALANKAN SERVER
startServer();
