const db = require("../../config/dbInit");

// ================================
// GET Semua Kegiatan
// ================================
exports.getAllKegiatan = async (req, res) => {
  try {
    const connection = await db();
    const [rows] = await connection.query("SELECT * FROM kegiatan ORDER BY ID_Kegiatan DESC");
    await connection.end();

    res.status(200).json({
      success: true,
      message: "Daftar kegiatan berhasil diambil",
      data: rows,
    });
  } catch (error) {
    console.error("❌ Error getAllKegiatan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil daftar kegiatan",
      error: error.message,
    });
  }
};

// ================================
// GET Detail Kegiatan berdasarkan ID
// ================================
exports.getKegiatanById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db();

    const [[kegiatan]] = await connection.query("SELECT * FROM kegiatan WHERE ID_Kegiatan = ?", [id]);
    await connection.end();

    if (!kegiatan) {
      return res.status(404).json({
        success: false,
        message: "Kegiatan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Detail kegiatan berhasil diambil",
      data: kegiatan,
    });
  } catch (error) {
    console.error("❌ Error getKegiatanById:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail kegiatan",
      error: error.message,
    });
  }
};

// ================================
// POST Tambah Kegiatan Baru
// ================================
exports.createKegiatan = async (req, res) => {
  try {
    const { judul, deskripsi, tanggal, lokasi, foto } = req.body;

    if (!judul || !deskripsi || !tanggal || !lokasi) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi (judul, deskripsi, tanggal, lokasi)",
      });
    }

    const connection = await db();
    await connection.query(
      "INSERT INTO kegiatan (Judul, Deskripsi, Tanggal, Lokasi, Foto) VALUES (?, ?, ?, ?, ?)",
      [judul, deskripsi, tanggal, lokasi, foto || null]
    );
    await connection.end();

    res.status(201).json({
      success: true,
      message: "Kegiatan baru berhasil ditambahkan",
    });
  } catch (error) {
    console.error("❌ Error createKegiatan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan kegiatan",
      error: error.message,
    });
  }
};

// ================================
// PUT Update Kegiatan
// ================================
exports.updateKegiatan = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, deskripsi, tanggal, lokasi, foto } = req.body;

    const connection = await db();
    const [result] = await connection.query(
      "UPDATE kegiatan SET Judul = ?, Deskripsi = ?, Tanggal = ?, Lokasi = ?, Foto = ? WHERE ID_Kegiatan = ?",
      [judul, deskripsi, tanggal, lokasi, foto || null, id]
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Kegiatan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Kegiatan berhasil diperbarui",
    });
  } catch (error) {
    console.error("❌ Error updateKegiatan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui kegiatan",
      error: error.message,
    });
  }
};

// ================================
// DELETE Hapus Kegiatan
// ================================
exports.deleteKegiatan = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db();

    const [result] = await connection.query("DELETE FROM kegiatan WHERE ID_Kegiatan = ?", [id]);
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Kegiatan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Kegiatan berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Error deleteKegiatan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus kegiatan",
      error: error.message,
    });
  }
};
