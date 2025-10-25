// controllers/user/pageController.js

const db = require("../../config/dbInit"); // koneksi MySQL

// ================================
// GET Home Page
// ================================
exports.getHomePage = async (req, res) => {
  try {
    // ambil data dinamis seperti produk, kegiatan, galeri, testimoni
    const [produk] = await db.query("SELECT * FROM product LIMIT 4");
    const [kegiatan] = await db.query("SELECT * FROM kegiatan WHERE Status='Upcoming' LIMIT 3");
    const [galeri] = await db.query("SELECT * FROM foto ORDER BY ID_Foto DESC LIMIT 6");
    const [testimoni] = await db.query("SELECT * FROM review ORDER BY ID_Review DESC LIMIT 5");

    res.status(200).json({
      title: "Home Page",
      message: "Selamat datang di halaman utama!",
      produk,
      kegiatan,
      galeri,
      testimoni,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};

// ================================
// GET Login Page
// ================================
exports.getLoginPage = async (req, res) => {
  try {
    res.status(200).json({
      title: "Login",
      message: "Silakan login untuk melanjutkan.",
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal memuat halaman login", error });
  }
};

// ================================
// GET Register Page
// ================================
exports.getRegisterPage = async (req, res) => {
  try {
    res.status(200).json({
      title: "Register",
      message: "Silakan daftar akun baru.",
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal memuat halaman register", error });
  }
};

// ================================
// ANGGOTA (List & Detail)
// ================================
exports.getAnggotaList = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pengguna WHERE Role = 'User'");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data anggota", error });
  }
};

exports.getAnggotaDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM pengguna WHERE ID_Pengguna = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Anggota tidak ditemukan" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail anggota", error });
  }
};

// ================================
// PRESTASI (List & Detail)
// ================================
exports.getPrestasiList = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM kegiatan WHERE Kategori = 'Prestasi'");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data prestasi", error });
  }
};

exports.getPrestasiDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM kegiatan WHERE ID_Kegiatan = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Prestasi tidak ditemukan" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail prestasi", error });
  }
};

// ================================
// KEGIATAN (List & Detail)
// ================================
exports.getKegiatanList = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM kegiatan ORDER BY Tanggal DESC");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data kegiatan", error });
  }
};

exports.getKegiatanDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM kegiatan WHERE ID_Kegiatan = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Kegiatan tidak ditemukan" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail kegiatan", error });
  }
};

// ================================
// GALERI
// ================================
exports.getGaleriList = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT f.ID_Foto, f.Foto, gf.Nama AS GroupFoto
      FROM foto f
      LEFT JOIN groupfoto gf ON f.ID_GroupFoto = gf.ID_GroupFoto
      ORDER BY f.ID_Foto DESC
    `);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data galeri", error });
  }
};

// ================================
// PRODUK (List, Detail, Match)
// ================================
exports.getProdukList = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM product ORDER BY ID_Product DESC");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data produk", error });
  }
};

exports.getProdukDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM product WHERE ID_Product = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail produk", error });
  }
};

exports.getProdukMatch = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const [rows] = await db.query("SELECT * FROM product WHERE Nama LIKE ?", [`%${keyword}%`]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mencocokkan produk", error });
  }
};

// ================================
// TESTIMONI (List & Tambah)
// ================================
exports.getTestimoniList = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, p.Nama AS NamaPengguna
      FROM review r
      LEFT JOIN pengguna p ON r.ID_Pengguna = p.ID_Pengguna
      ORDER BY r.ID_Review DESC
    `);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data testimoni", error });
  }
};

exports.createTestimoni = async (req, res) => {
  try {
    const { ID_Pengguna, Ulasan, Rating, Kategori, ID_Product, ID_Kegiatan } = req.body;
    await db.query(
      `INSERT INTO review (ID_Pengguna, Ulasan, Rating, Kategori, ID_Product, ID_Kegiatan) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [ID_Pengguna, Ulasan, Rating, Kategori, ID_Product || null, ID_Kegiatan || null]
    );
    res.status(201).json({ message: "Testimoni berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah testimoni", error });
  }
};
