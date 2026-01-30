const express = require('express');
const { bookVehicle, getBookings, addVehicle } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', bookVehicle);
router.get('/', getBookings); 
router.post("/", addVehicle);

module.exports = router;
