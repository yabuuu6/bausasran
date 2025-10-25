const db = require("../../config/database");

exports.getDashboard = async (req, res) => {
  try {
    // 1. Ambil data user yang login (dari middleware verifyToken)
    const adminUser = req.user;

    // 2. Ambil semua data statistik
    const queries = [
      db.query("SELECT COUNT(*) AS total FROM pengguna"),
      db.query("SELECT COUNT(*) AS total FROM product"),
      db.query("SELECT COUNT(*) AS total FROM kegiatan"),
      db.query("SELECT COUNT(*) AS total FROM prestasi"),
      db.query("SELECT COUNT(*) AS total FROM review"),
    ];
    const results = await Promise.all(queries);

    const dashboardData = {
      statistik: {
        pengguna: results[0][0][0]?.total || 0,
        produk: results[1][0][0]?.total || 0,
        kegiatan: results[2][0][0]?.total || 0,
        prestasi: results[3][0][0]?.total || 0,
        review: results[4][0][0]?.total || 0,
      },
    };
    
    // 3. Ambil data terbaru
    const [latestPengguna] = await db.query("SELECT * FROM pengguna ORDER BY ID_Pengguna DESC LIMIT 5");
    const [latestKegiatan] = await db.query("SELECT * FROM kegiatan ORDER BY ID_Kegiatan DESC LIMIT 5");
    
    dashboardData.terbaru = {
      pengguna: latestPengguna,
      kegiatan: latestKegiatan,
    };

    // 4. RENDER HALAMAN EJS
    res.render("admin/dashboard", {
      // !!! INI PERUBAHANNYA !!!
      layout: false, // <-- Beri tahu EJS untuk TIDAK pakai layout
      // !!! ----------------- !!!
      user: adminUser, // Data user (untuk "Selamat Datang, Admin")
      data: dashboardData // Data statistik & tabel
    });

  } catch (error) {
    console.error("❌ Error di dashboardController:", error);
    res.status(500).send("Terjadi kesalahan saat memuat dashboard admin");
  }
};