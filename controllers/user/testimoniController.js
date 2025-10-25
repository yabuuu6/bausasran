// controllers/user/testimoniController.js

const db = require("../../config/dbInit");

// ================================
// GET: Ambil semua testimoni
// ================================
exports.getAllTestimoni = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        r.ID_Review,
        r.Ulasan,
        r.Rating,
        r.Kategori,
        p.Nama AS NamaPengguna,
        pr.Nama AS NamaProduk,
        k.Judul AS NamaKegiatan
      FROM review r
      LEFT JOIN pengguna p ON r.ID_Pengguna = p.ID_Pengguna
      LEFT JOIN product pr ON r.ID_Product = pr.ID_Product
      LEFT JOIN kegiatan k ON r.ID_Kegiatan = k.ID_Kegiatan
      ORDER BY r.ID_Review DESC
    `);

    res.status(200).json({
      success: true,
      message: "Data testimoni berhasil diambil",
      data: rows,
    });
  } catch (error) {
    console.error("Error getAllTestimoni:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data testimoni",
      error: error.message,
    });
  }
};

// ================================
// GET: Ambil testimoni berdasarkan ID
// ================================
exports.getTestimoniById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT 
        r.ID_Review,
        r.Ulasan,
        r.Rating,
        r.Kategori,
        p.Nama AS NamaPengguna,
        pr.Nama AS NamaProduk,
        k.Judul AS NamaKegiatan
      FROM review r
      LEFT JOIN pengguna p ON r.ID_Pengguna = p.ID_Pengguna
      LEFT JOIN product pr ON r.ID_Product = pr.ID_Product
      LEFT JOIN kegiatan k ON r.ID_Kegiatan = k.ID_Kegiatan
      WHERE r.ID_Review = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Testimoni tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data testimoni berhasil diambil",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error getTestimoniById:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail testimoni",
      error: error.message,
    });
  }
};

// ================================
// POST: Tambah testimoni baru
// ================================
exports.createTestimoni = async (req, res) => {
  try {
    const { ID_Pengguna, Ulasan, Rating, Kategori, ID_Product, ID_Kegiatan } = req.body;

    // Validasi input
    if (!ID_Pengguna || !Ulasan || !Rating || !Kategori) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi (ID_Pengguna, Ulasan, Rating, Kategori)",
      });
    }

    // Validasi kategori
    if (Kategori !== "Product" && Kategori !== "Kegiatan") {
      return res.status(400).json({
        success: false,
        message: "Kategori harus bernilai 'Product' atau 'Kegiatan'",
      });
    }

    // Insert data
    await db.query(
      `
      INSERT INTO review (ID_Pengguna, Ulasan, Rating, Kategori, ID_Product, ID_Kegiatan)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [ID_Pengguna, Ulasan, Rating, Kategori, ID_Product || null, ID_Kegiatan || null]
    );

    res.status(201).json({
      success: true,
      message: "Testimoni berhasil ditambahkan",
    });
  } catch (error) {
    console.error("Error createTestimoni:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan testimoni",
      error: error.message,
    });
  }
};

// ================================
// GET: Ambil testimoni berdasarkan pengguna
// ================================
exports.getTestimoniByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT 
        r.ID_Review,
        r.Ulasan,
        r.Rating,
        r.Kategori,
        pr.Nama AS NamaProduk,
        k.Judul AS NamaKegiatan
      FROM review r
      LEFT JOIN product pr ON r.ID_Product = pr.ID_Product
      LEFT JOIN kegiatan k ON r.ID_Kegiatan = k.ID_Kegiatan
      WHERE r.ID_Pengguna = ?
      ORDER BY r.ID_Review DESC
    `,
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Data testimoni pengguna berhasil diambil",
      data: rows,
    });
  } catch (error) {
    console.error("Error getTestimoniByUser:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil testimoni pengguna",
      error: error.message,
    });
  }
};
