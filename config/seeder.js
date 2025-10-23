// ISI YANG BENAR UNTUK: config/seeder.js

const db = require('../models');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    // 1. Cek apakah tabel pengguna masih kosong (khususnya Admin)
    const adminCount = await db.pengguna.count({
      where: { Role: 'Admin' }
    });

    // 2. Jika tidak ada admin (count === 0), kita isi data awal
    if (adminCount === 0) {
      console.log('ℹ️ [SEEDER] Database kosong. Memulai proses seeding data awal...');
      
      // Hash password default. (Pastikan Anda sudah 'npm install bcrypt')
      const hashedPassword = await bcrypt.hash('admin123', 10); 

      // 3. Buat Pengguna Admin default
      await db.pengguna.create({
        Nama: 'Admin Utama',
        Jabatan: 'Administrator',
        Deskripsi: 'Akun admin default',
        Role: 'Admin',
        password: hashedPassword,
        username: 'admin' 
      });

      console.log("✅ [SEEDER] Berhasil membuat Admin default (username: 'admin', pass: 'admin123')");

      // 4. (Opsional) Buat data master lain yang wajib ada
      await db.groupsection.findOrCreate({ where: { Nama: 'Default Hero' } });
      await db.groupfoto.findOrCreate({ where: { Nama: 'Uncategorized' } });
      await db.groupparameter.findOrCreate({ where: { Nama: 'Default Specs' } });

      console.log('✅ [SEEDER] Berhasil membuat data master default.');

    } else {
      // 5. Jika data sudah ada, lewati
      console.log('ℹ️ [SEEDER] Data sudah ada. Melewati proses seeding.');
    }

  } catch (error) {
    console.error('❌ [SEEDER] GAGAL menjalankan seeder:', error);
  }
}

module.exports = seedDatabase;