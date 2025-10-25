const { render } = require("ejs");

// 1. Definisikan fungsi untuk me-render halaman dashboard publik
const renderPublicDashboard = (req, res) => {
  try {
    // Render file yang ada di 'views/dashboard_public.ejs'
    res.render('dashboard_public');
  } catch (error) {
    // Menangkap jika ada error saat rendering
    console.error("Gagal me-render dashboard_public:", error);
    res.status(500).send("Terjadi kesalahan pada server");
  }
};
// controllers/user/indexController.js
const renderLoginPage = (req, res) => {
  res.render("login", {
    title: "Login Admin",
  });
};

// 2. Export HANYA fungsi tersebut
module.exports = {
  renderPublicDashboard,
  renderLoginPage
};