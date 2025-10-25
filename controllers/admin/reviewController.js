const db = require("../../config/database");

// ================================
// GET Semua Review
// ================================
exports.getAllReview = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM review ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error getAllReview:", err);
    res.status(500).json({ message: "Gagal mengambil data review" });
  }
};

// ================================
// GET Review Berdasarkan ID
// ================================
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM review WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Review tidak ditemukan" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error getReviewById:", err);
    res.status(500).json({ message: "Gagal mengambil detail review" });
  }
};

// ================================
// POST Tambah Review Baru
// ================================
exports.createReview = async (req, res) => {
  try {
    const { nama, email, komentar, rating } = req.body;

    if (!nama || !komentar) {
      return res.status(400).json({ message: "Nama dan komentar wajib diisi" });
    }

    await db.query(
      "INSERT INTO review (nama, email, komentar, rating) VALUES (?, ?, ?, ?)",
      [nama, email || null, komentar, rating || null]
    );

    res.status(201).json({ message: "Review berhasil ditambahkan" });
  } catch (err) {
    console.error("Error createReview:", err);
    res.status(500).json({ message: "Gagal menambahkan review" });
  }
};

// ================================
// PUT Update Review
// ================================
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, komentar, rating } = req.body;

    await db.query(
      "UPDATE review SET nama=?, email=?, komentar=?, rating=? WHERE id=?",
      [nama, email, komentar, rating, id]
    );

    res.status(200).json({ message: "Review berhasil diperbarui" });
  } catch (err) {
    console.error("Error updateReview:", err);
    res.status(500).json({ message: "Gagal memperbarui review" });
  }
};

// ================================
// DELETE Hapus Review
// ================================
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM review WHERE id = ?", [id]);
    res.status(200).json({ message: "Review berhasil dihapus" });
  } catch (err) {
    console.error("Error deleteReview:", err);
    res.status(500).json({ message: "Gagal menghapus review" });
  }
};
