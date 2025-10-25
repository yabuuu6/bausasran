const db = require("../../config/database");

// ================================
// GET Semua Prestasi
// ================================

exports.getAllPrestasi = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM prestasi ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error getAllPrestasi:", err);
    res.status(500).json({ message: "Gagal mengambil data prestasi" });
  }
};

// ================================
// GET Detail Prestasi berdasarkan ID
// ================================

exports.getPrestasiById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM prestasi WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Prestasi tidak ditemukan" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error getPrestasiById:", err);
    res.status(500).json({ message: "Gagal mengambil detail prestasi" });
  }
};

// ================================
// POST Tambah Prestasi
// ================================

exports.createPrestasi = async (req, res) => {
  try {
    const { nama_prestasi, penyelenggara, tahun, deskripsi, foto } = req.body;

    if (!nama_prestasi || !penyelenggara || !tahun) {
      return res
        .status(400)
        .json({ message: "Nama prestasi, penyelenggara, dan tahun wajib diisi" });
    }

    await db.query(
      "INSERT INTO prestasi (nama_prestasi, penyelenggara, tahun, deskripsi, foto) VALUES (?, ?, ?, ?, ?)",
      [nama_prestasi, penyelenggara, tahun, deskripsi || null, foto || null]
    );

    res.status(201).json({ message: "Prestasi berhasil ditambahkan" });
  } catch (err) {
    console.error("Error createPrestasi:", err);
    res.status(500).json({ message: "Gagal menambahkan prestasi" });
  }
};

// ================================
// PUT Edit Prestasi
// ================================

exports.updatePrestasi = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_prestasi, penyelenggara, tahun, deskripsi, foto } = req.body;

    await db.query(
      "UPDATE prestasi SET nama_prestasi=?, penyelenggara=?, tahun=?, deskripsi=?, foto=? WHERE id=?",
      [nama_prestasi, penyelenggara, tahun, deskripsi, foto, id]
    );

    res.status(200).json({ message: "Prestasi berhasil diperbarui" });
  } catch (err) {
    console.error("Error updatePrestasi:", err);
    res.status(500).json({ message: "Gagal memperbarui prestasi" });
  }
};

// ================================
// DELETE Hapus Prestasi
// ================================

exports.deletePrestasi = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM prestasi WHERE id = ?", [id]);
    res.status(200).json({ message: "Prestasi berhasil dihapus" });
  } catch (err) {
    console.error("Error deletePrestasi:", err);
    res.status(500).json({ message: "Gagal menghapus prestasi" });
  }
};
