const express = require('express');
const router = express.Router();

// Impor controller dari lokasi ../controllers/user/indexController.js
const userController = require('../controllers/user/indexController');

// Arahkan rute GET '/' untuk menjalankan fungsi 'renderPublicDashboard'
router.get('/', userController.renderPublicDashboard);

module.exports = router;