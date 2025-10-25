  const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/database");
require("dotenv").config();

// ================================
// MIDDLEWARE: VERIFY JWT TOKEN (DIRUBAH UNTUK WEB/EJS)
// ================================
exports.verifyToken = (req, res, next) => {
  try {
    // 1. Prioritaskan pembacaan token dari cookie
    const token = req.cookies.token;

    if (!token) {
      // Jika tidak ada token, tendang ke halaman login
      return res.redirect('/login?error=Silakan login terlebih dahulu');
    }

    // 2. Verifikasi token
    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
      if (err) {
        // Token tidak valid (kadaluarsa, dll), hapus cookie & tendang ke login
        res.clearCookie('token');
        return res.redirect('/login?error=Sesi tidak valid, silakan login kembali');
      }
      
      // 3. Simpan data user ke 'req.user' untuk dipakai di controller/middleware lain
      req.user = { id: decoded.id, username: decoded.username, role: decoded.role };
      next(); // Lanjutkan ke middleware atau controller berikutnya
    });
  } catch (error) {
    console.error('Error verifyToken:', error);
    res.clearCookie('token');
    return res.redirect('/login?error=Terjadi kesalahan autentikasi');
  }
};

// ================================
// MIDDLEWARE: Verifikasi Admin (DIRUBAH UNTUK WEB/EJS)
// ================================
exports.verifyAdmin = (req, res, next) => {
  // Middleware ini harus dijalankan SETELAH verifyToken
  if (!req.user) {
    return res.redirect('/login?error=Sesi Anda tidak ditemukan');
  }

  // Cek Role dari data token yang sudah disimpan
  if (req.user.role !== "Admin") {
    // Jika BUKAN admin, tendang!
    return res.redirect('/login?error=Akses ditolak. Hanya Admin yang diizinkan.');
  }

  // Jika dia Admin, lolos
  next();
};

// ================================
// LOGIN USER / ADMIN (DIRUBAH TOTAL UNTUK WEB/EJS)
// ================================
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.redirect('/login?error=Username dan password wajib diisi');
    }

    // Cek user di database
    const [users] = await db.query("SELECT * FROM pengguna WHERE username = ?", [username]);
    if (users.length === 0) {
      return res.redirect('/login?error=Username tidak ditemukan');
    }

    const user = users[0];

    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.redirect('/login?error=Password salah');
    }

    // PENGECEKAN ROLE (Sesuai permintaan Anda)
    if (user.Role !== "Admin") {
      return res.redirect('/login?error=Akses ditolak. Akun Anda bukan Admin.');
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.ID_Pengguna, username: user.Username, role: user.Role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" } // Token berlaku 1 hari
    );

    // SIMPAN TOKEN KE COOKIE
    res.cookie('token', token, {
      httpOnly: true, // Mencegah token diakses via JavaScript (XSS)
      secure: process.env.NODE_ENV === 'production', // Hanya kirim via HTTPS di produksi
      maxAge: 24 * 60 * 60 * 1000 // 1 hari (dalam milidetik)
    });

    // REDIRECT KE DASHBOARD ADMIN
    res.redirect('/admin/dashboard');

  } catch (error) {
    console.error("Error login:", error);
    res.redirect('/login?error=Terjadi kesalahan pada server');
  }
};

// ================================
// LOGOUT USER (DIRUBAH UNTUK WEB/EJS)
// ================================
exports.logout = async (req, res) => {
  try {
    // Hapus cookie 'token'
    res.clearCookie('token');
    // Redirect kembali ke halaman login
    res.redirect('/login');
  } catch (error) {
    console.error("Error logout:", error);
    res.redirect('/login?error=Gagal logout');
  }
};


// ================================
// REGISTER & PROFILE (Biarkan sebagai API JSON, asumsi dipakai admin)
// ================================

exports.register = async (req, res) => {
  // ... (Kode register Anda sudah benar, tidak perlu diubah)
  try {
    const { nama, jabatan, deskripsi, username, password, role } = req.body;
    if (!nama || !username || !password) {
      return res.status(400).json({ message: "Nama, username, dan password wajib diisi." });
    }
    const [cekUser] = await db.query("SELECT * FROM pengguna WHERE username = ?", [username]);
    if (cekUser.length > 0) {
      return res.status(400).json({ message: "Username sudah digunakan." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO pengguna (Nama, Jabatan, Deskripsi, Role, Password, Username) VALUES (?, ?, ?, ?, ?, ?)`,
      [nama, jabatan || null, deskripsi || null, role || "User", hashedPassword, username]
    );
    res.status(201).json({ message: "Registrasi berhasil." });
  } catch (error) {
    console.error("Error register:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi." });
  }
};

exports.getProfile = async (req, res) => {
  // ... (Kode getProfile Anda sudah benar, tidak perlu diubah)
  try {
    const { id } = req.user; 
    const [rows] = await db.query(
      "SELECT ID_Pengguna, Nama, Jabatan, Deskripsi, Role, Username FROM pengguna WHERE ID_Pengguna = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Data pengguna tidak ditemukan." });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error getProfile:", error);
    res.status(500).json({ message: "Gagal mengambil profil pengguna." });
  }
};

// (Middleware verifyUser tidak terpakai di alur ini, tapi biarkan saja)
exports.verifyUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Akses ditolak: pengguna tidak terautentikasi" });
  }
  if (req.user.role !== "User") {
    return res.status(403).json({ message: "Akses ditolak: hanya user yang dapat mengakses" });
  }
  next();
};