const db = require("../../config/dbInit");

// ================================
// GRUP FOTO (ALBUM)
// ================================

// GET: Mendapatkan semua grup/album galeri
exports.getAllGaleriGroups = async (req, res) => {
  try {
    const connection = await db();
    const [rows] = await connection.query("SELECT * FROM groupfoto ORDER BY ID_GroupFoto DESC");
    await connection.end();

    res.status(200).json({
      success: true,
      message: "Daftar grup galeri berhasil diambil",
      data: rows,
    });
  } catch (error) {
    console.error("❌ Error getAllGaleriGroups:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data grup galeri",
      error: error.message,
    });
  }
};

// GET: Mendapatkan detail satu grup/album BESERTA foto-fotonya
exports.getGaleriGroupWithFotos = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db();

    // Ambil nama grup
    const [[group]] = await connection.query("SELECT * FROM groupfoto WHERE ID_GroupFoto = ?", [id]);
    if (!group) {
      await connection.end();
      return res.status(404).json({ success: false, message: "Grup galeri tidak ditemukan" });
    }

    // Ambil daftar foto berdasarkan grup
    const [fotos] = await connection.query("SELECT * FROM foto WHERE ID_GroupFoto = ? ORDER BY ID_Foto DESC", [id]);
    await connection.end();

    res.status(200).json({
      success: true,
      message: "Data grup dan foto berhasil diambil",
      data: {
        group: group,
        fotos: fotos,
      },
    });
  } catch (error) {
    console.error("❌ Error getGaleriGroupWithFotos:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data grup",
      error: error.message,
    });
  }
};

// POST: Membuat grup/album galeri baru
exports.createGaleriGroup = async (req, res) => {
  try {
    const { nama } = req.body;
    if (!nama) {
      return res.status(400).json({ success: false, message: "Nama grup galeri wajib diisi" });
    }

    const connection = await db();
    await connection.query("INSERT INTO groupfoto (Nama) VALUES (?)", [nama]);
    await connection.end();

    res.status(201).json({
      success: true,
      message: "Grup galeri baru berhasil ditambahkan",
    });
  } catch (error) {
    console.error("❌ Error createGaleriGroup:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan grup galeri",
      error: error.message,
    });
  }
};

// PUT: Memperbarui (mengganti nama) grup/album galeri
exports.updateGaleriGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;

    if (!nama) {
      return res.status(400).json({ success: false, message: "Nama grup galeri wajib diisi" });
    }

    const connection = await db();
    const [result] = await connection.query("UPDATE groupfoto SET Nama = ? WHERE ID_GroupFoto = ?", [nama, id]);
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Grup galeri tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Nama grup galeri berhasil diperbarui",
    });
  } catch (error) {
    console.error("❌ Error updateGaleriGroup:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui grup galeri",
      error: error.message,
    });
  }
};

// DELETE: Menghapus grup/album galeri (dan semua fotonya)
exports.deleteGaleriGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db();

    // Hapus dulu semua foto di dalamnya
    await connection.query("DELETE FROM foto WHERE ID_GroupFoto = ?", [id]);

    // Hapus grupnya
    const [result] = await connection.query("DELETE FROM groupfoto WHERE ID_GroupFoto = ?", [id]);
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Grup galeri tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Grup galeri dan semua fotonya berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Error deleteGaleriGroup:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus grup galeri",
      error: error.message,
    });
  }
};


// ================================
// FOTO (di dalam GRUP)
// ================================

// POST: Menambahkan foto baru ke dalam grup/album
exports.addFotoToGroup = async (req, res) => {
  try {
    // ID di sini adalah ID Grup Foto (Album)
    const { id } = req.params; 
    const { foto } = req.body; 

    if (!foto) {
      return res.status(400).json({ success: false, message: "Nama file foto wajib diisi" });
    }

    const connection = await db();
    await connection.query("INSERT INTO foto (Foto, ID_GroupFoto) VALUES (?, ?)", [foto, id]);
    await connection.end();

    res.status(201).json({
      success: true,
      message: "Foto berhasil ditambahkan ke grup",
    });
  } catch (error) {
    console.error("❌ Error addFotoToGroup:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan foto ke grup",
      error: error.message,
    });
  }
};

// DELETE: Menghapus satu foto spesifik
exports.deleteFotoById = async (req, res) => {
  try {
    // ID di sini adalah ID Foto
    const { id } = req.params; 
    const connection = await db();

    const [result] = await connection.query("DELETE FROM foto WHERE ID_Foto = ?", [id]);
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Foto tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Foto berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Error deleteFotoById:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus foto",
      error: error.message,
    });
  }
};