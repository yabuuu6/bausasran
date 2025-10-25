const bcrypt = require('bcrypt');
// Sesuaikan path ini jika file 'database.js' Anda ada di tempat lain
const db = require('./config/database'); 

// --- KONFIGURASI ADMIN ---
const NAMA_ADMIN = "Administrator";
const USERNAME_ADMIN = "admin123";
const PASSWORD_PLAIN = "admin123"; // Ganti ini jika mau
const ROLE_ADMIN = "Admin";
// -------------------------

/**
 * Fungsi untuk membuat user admin pertama kali.
 */
async function buatUserAdmin() {
  console.log("Memulai proses pembuatan admin...");

  try {
    // 1. Cek apakah user admin sudah ada
    console.log(`Mengecek apakah user '${USERNAME_ADMIN}' sudah ada...`);
    const [cekUser] = await db.query("SELECT * FROM pengguna WHERE username = ?", [USERNAME_ADMIN]);

    if (cekUser.length > 0) {
      console.warn("========================================");
      console.warn("PERINGATAN: User admin sudah ada.");
      console.warn(`Username: ${cekUser[0].username}`);
      console.warn("Proses dihentikan.");
      console.warn("========================================");
      return; // Hentikan proses
    }

    // 2. Jika belum ada, hash password
    console.log(`User belum ada. Menghash password: '${PASSWORD_PLAIN}'...`);
    const hashedPassword = await bcrypt.hash(PASSWORD_PLAIN, 10);
    console.log("Password berhasil di-hash.");

    // 3. Masukkan ke database
    console.log("Menyimpan user ke database...");
    const query = `
      INSERT INTO pengguna (Nama, username, password, Role, Jabatan) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    await db.query(query, [
      NAMA_ADMIN,
      USERNAME_ADMIN,
      hashedPassword,
      ROLE_ADMIN,
      "Pengelola Sistem" // Jabatan (opsional)
    ]);

    console.log("\n========================================");
    console.log("✅ SUKSES!");
    console.log("User admin berhasil dibuat.");
    console.log("Silakan login dengan kredensial berikut:");
    console.log(`   Username: ${USERNAME_ADMIN}`);
    console.log(`   Password: ${PASSWORD_PLAIN}`);
    console.log("========================================");

  } catch (error) {
    console.error("\n❌ GAGAL: Terjadi kesalahan saat membuat user admin:");
    console.error(error.message);
  } finally {
    // 4. Tutup koneksi database agar script bisa berhenti
    if (db && db.end) {
      await db.end();
      console.log("\nKoneksi database ditutup.");
    }
  }
}

// Panggil fungsi utamanya
buatUserAdmin();