const express = require("express");
const router = express.Router();
const authController = require("../controllers/user/authController");

// ================================
// RUTE AUTENTIKASI WEB
// ================================

// Menampilkan halaman login
router.get("/login", (req, res) => {
  // Ambil pesan error dari URL query (jika ada, hasil redirect)
  const { error } = req.query;
  // Render file EJS dan kirimkan variabel error
  res.render("partials/login", { error: error });
});

// Memproses data login (dari form)
router.post("/login", authController.login);

// Logout (pakai GET agar bisa dipanggil dari link <a> di dashboard)
router.get("/logout", authController.logout);


// ================================
// RUTE API (JSON) (Biarkan jika masih dipakai)
// ================================

// Mendaftarkan pengguna baru (via API)
router.post("/register", authController.register);

// Mendapatkan profil pengguna (via API, butuh token)
router.get(
  "/profile",
  authController.verifyToken, // Middleware ini tetap bisa baca token (dari cookie)
  authController.getProfile
);

// Contoh rute cek Admin (via API, butuh token)
router.get(
  "/admin/check",
  authController.verifyToken,
  authController.verifyAdmin,
  (req, res) => {
    res.status(200).json({ 
      message: "Akses diterima. Anda adalah Admin.",
      user: req.user 
    });
  }
);

module.exports = router;