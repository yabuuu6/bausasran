const db = require("../../config/database");

// ================================
// GET Semua Produk
// ================================
exports.getAllProduk = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM product ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error getAllProduk:", err);
    res.status(500).json({ message: "Gagal mengambil data produk" });
  }
};

// ================================
// GET Produk Berdasarkan ID
// ================================
exports.getProdukById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM product WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error getProdukById:", err);
    res.status(500).json({ message: "Gagal mengambil detail produk" });
  }
};

// ================================
// POST Tambah Produk Baru
// ================================
exports.createProduk = async (req, res) => {
  try {
    const { nama_produk, kategori, harga, deskripsi, foto } = req.body;

    if (!nama_produk || !harga) {
      return res.status(400).json({ message: "Nama produk dan harga wajib diisi" });
    }

    await db.query(
      "INSERT INTO product (nama_produk, kategori, harga, deskripsi, foto) VALUES (?, ?, ?, ?, ?)",
      [nama_produk, kategori || "Lainnya", harga, deskripsi || null, foto || null]
    );

    res.status(201).json({ message: "Produk berhasil ditambahkan" });
  } catch (err) {
    console.error("Error createProduk:", err);
    res.status(500).json({ message: "Gagal menambahkan produk" });
  }
};

// ================================
// PUT Update Produk
// ================================
exports.updateProduk = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_produk, kategori, harga, deskripsi, foto } = req.body;

    await db.query(
      "UPDATE product SET nama_produk=?, kategori=?, harga=?, deskripsi=?, foto=? WHERE id=?",
      [nama_produk, kategori, harga, deskripsi, foto, id]
    );

    res.status(200).json({ message: "Produk berhasil diperbarui" });
  } catch (err) {
    console.error("Error updateProduk:", err);
    res.status(500).json({ message: "Gagal memperbarui produk" });
  }
};

// ================================
// DELETE Hapus Produk
// ================================
exports.deleteProduk = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM product WHERE id = ?", [id]);
    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    console.error("Error deleteProduk:", err);
    res.status(500).json({ message: "Gagal menghapus produk" });
  }
};
