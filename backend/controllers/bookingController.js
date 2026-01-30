const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

const calcRideDuration = (from, to) => {
  const duration = Math.abs(Number(to) - Number(from));
  return duration || 1;
};

exports.bookVehicle = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const start = new Date(startTime);
    const rideHours = calcRideDuration(fromPincode, toPincode);
    const end = new Date(start.getTime() + rideHours * 60 * 60 * 1000);

    const overlapping = await Booking.findOne({
      vehicleId,
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
    });
    if (overlapping) return res.status(409).json({ message: 'Vehicle already booked' });

    const booking = await Booking.create({ vehicleId, fromPincode, toPincode, startTime: start, endTime: end, customerId });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('vehicleId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addVehicle = async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json(vehicle);
};
