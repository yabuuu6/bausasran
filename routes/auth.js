const express = require("express");
const router = express.Router();
const authController = require("../controllers/user/authController");
// const userController = require('../controllers/user/indexController'); // (Jika masih dipakai untuk hal lain)

// ================================
// RUTE PUBLIK (Tidak perlu login)
// ================================

// Menampilkan halaman login
router.get("/login", (req, res) => {
  // Render file di views/partials/login.ejs
  // 'error: req.query.error' adalah trik untuk menampilkan pesan error jika ada
  res.render("partials/login", { error: req.query.error });
});

// Memproses data login
router.post("/login", authController.login);

// Mendaftarkan pengguna baru
router.post("/register", authController.register);

// Logout
router.post("/logout", authController.logout);


// ================================
// RUTE AMAN (Harus login)
// ================================

// Mendapatkan profil pengguna yang sedang login
// Rute ini dilindungi oleh 'verifyToken'. Hanya user yang punya token valid bisa akses.
router.get(
  "/profile",
  authController.verifyToken, // 1. Cek token
  authController.getProfile      // 2. Jika lolos, ambil profil
);

// ================================
// RUTE KHUSUS ADMIN (Hanya Admin)
// ================================

// Contoh rute yang hanya bisa diakses oleh Admin
router.get(
  "/admin/check",
  authController.verifyToken, // 1. Cek token
  authController.verifyAdmin, // 2. Cek apakah rolenya "Admin"
  (req, res) => {
    // 3. Jika lolos semua, kirim respons
    res.status(200).json({ 
      message: "Akses diterima. Anda adalah Admin.",
      user: req.user 
    });
  }
);

module.exports = router;