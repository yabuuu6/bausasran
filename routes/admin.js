const express = require("express");
const router = express.Router();

// ================================
// Import Middleware Keamanan
// ================================
const authController = require("../controllers/user/authController");

// ================================
// Import Controllers Admin
// ================================
const dashboardController = require("../controllers/admin/dashboardController");
const galeriController = require("../controllers/admin/galeriController");
const kegiatanController = require("../controllers/admin/kegiatanController");
const penggunaController = require("../controllers/admin/penggunaController");
const prestasiController = require("../controllers/admin/prestasiController");
const produkController = require("../controllers/admin/produkController");
const reviewController = require("../controllers/admin/reviewController");


// ==========================================================
// !!! MIDDLEWARE PENGAMAN SELURUH RUTE ADMIN !!!
// ==========================================================
// Semua rute di bawah baris ini akan otomatis dilindungi.
// 1. Cek token (dari cookie)
// 2. Cek apakah rolenya "Admin"
// Jika salah satu gagal, user akan ditendang ke /login
router.use(authController.verifyToken);
router.use(authController.verifyAdmin);
// ==========================================================


// ================================
// DASHBOARD (Sekarang aman)
// ================================
router.get("/dashboard", dashboardController.getDashboard);

// ================================
// GALERI (Sekarang aman)
// ================================
router.get("/galeri/grup", galeriController.getAllGaleriGroups);
router.get("/galeri/grup/:id", galeriController.getGaleriGroupWithFotos);
router.post("/galeri/grup", galeriController.createGaleriGroup);
router.put("/galeri/grup/:id", galeriController.updateGaleriGroup);
router.delete("/galeri/grup/:id", galeriController.deleteGaleriGroup);
router.post("/galeri/grup/:id/foto", galeriController.addFotoToGroup);
router.delete("/galeri/foto/:id", galeriController.deleteFotoById);

// ================================
// KEGIATAN (Sekarang aman)
// ================================
router.get("/kegiatan", kegiatanController.getAllKegiatan);
router.get("/kegiatan/:id", kegiatanController.getKegiatanById);
router.post("/kegiatan", kegiatanController.createKegiatan);
router.put("/kegiatan/:id", kegiatanController.updateKegiatan);
router.delete("/kegiatan/:id", kegiatanController.deleteKegiatan);

// ================================
// PENGGUNA (Sekarang aman)
// ================================
router.get("/pengguna", penggunaController.getAllPengguna);
router.get("/pengguna/:id", penggunaController.getPenggunaById);
router.post("/pengguna", penggunaController.createPengguna);
router.put("/pengguna/:id", penggunaController.updatePengguna);
router.delete("/pengguna/:id", penggunaController.deletePengguna);

// ================================
// PRESTASI (Sekarang aman)
// ================================
router.get("/prestasi", prestasiController.getAllPrestasi);
router.get("/prestasi/:id", prestasiController.getPrestasiById);
router.post("/prestasi", prestasiController.createPrestasi);
router.put("/prestasi/:id", prestasiController.updatePrestasi);
router.delete("/prestasi/:id", prestasiController.deletePrestasi);

// ================================
// PRODUK (Sekarang aman)
// ================================
router.get("/produk", produkController.getAllProduk);
router.get("/produk/:id", produkController.getProdukById);
router.post("/produk", produkController.createProduk);
router.put("/produk/:id", produkController.updateProduk);
router.delete("/produk/:id", produkController.deleteProduk);

// ================================
// REVIEW (Sekarang aman)
// ================================
router.get("/review", reviewController.getAllReview);
router.get("/review/:id", reviewController.getReviewById);
router.post("/review", reviewController.createReview);
router.put("/review/:id", reviewController.updateReview);
router.delete("/review/:id", reviewController.deleteReview);

module.exports = router;