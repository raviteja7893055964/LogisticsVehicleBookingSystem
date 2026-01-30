const express = require('express');
const { addVehicle, getAvailableVehicles, getAllVehicles } = require('../controllers/vehicleController');
const router = express.Router();

router.post('/', addVehicle);
router.get('/available', getAvailableVehicles);
router.get('/', getAllVehicles);

module.exports = router;
