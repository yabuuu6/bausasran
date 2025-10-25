const db = require("../../config/database");

// ================================
// GET Semua Pengguna
// ================================

exports.getAllPengguna = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pengguna ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error getAllPengguna:", err);
    res.status(500).json({ message: "Gagal mengambil data pengguna" });
  }
};

// ================================
// GET Detail Pengguna berdasarkan ID
// ================================

exports.getPenggunaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM pengguna WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error getPenggunaById:", err);
    res.status(500).json({ message: "Gagal mengambil detail pengguna" });
  }
};

// ================================
// POST Tambah Pengguna
// ================================

exports.createPengguna = async (req, res) => {
  try {
    const { nama, email, password, role, foto } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ message: "Nama, email, dan password wajib diisi" });
    }

    await db.query(
      "INSERT INTO pengguna (nama, email, password, role, foto) VALUES (?, ?, ?, ?, ?)",
      [nama, email, password, role || "user", foto || null]
    );

    res.status(201).json({ message: "Pengguna berhasil ditambahkan" });
  } catch (err) {
    console.error("Error createPengguna:", err);
    res.status(500).json({ message: "Gagal menambahkan pengguna" });
  }
};

// ================================
// PUT Edit Pengguna
// ================================

exports.updatePengguna = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, password, role, foto } = req.body;

    await db.query(
      "UPDATE pengguna SET nama = ?, email = ?, password = ?, role = ?, foto = ? WHERE id = ?",
      [nama, email, password, role, foto, id]
    );

    res.status(200).json({ message: "Data pengguna berhasil diperbarui" });
  } catch (err) {
    console.error("Error updatePengguna:", err);
    res.status(500).json({ message: "Gagal memperbarui pengguna" });
  }
};

// ================================
// DELETE Hapus Pengguna
// ================================

exports.deletePengguna = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM pengguna WHERE id = ?", [id]);
    res.status(200).json({ message: "Pengguna berhasil dihapus" });
  } catch (err) {
    console.error("Error deletePengguna:", err);
    res.status(500).json({ message: "Gagal menghapus pengguna" });
  }
};
