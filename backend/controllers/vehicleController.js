const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

const calcRideDuration = (from, to) => {
  const duration = Math.abs(parseInt(to) - parseInt(from));
  return duration || 1;
};

exports.addVehicle = async (req, res) => {
  try {
    console.log('Add Vehicle Request Body:', req.body);
    const { name, capacityKg, tyres } = req.body;

    const vehicle = await Vehicle.create({
      name,
      capacityKg: Number(capacityKg),
      tyres: Number(tyres),
    });

    console.log('Vehicle saved:', vehicle);
    res.status(201).json(vehicle);
  } catch (err) {
    console.error('Add vehicle error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;
    if (!capacityRequired || !fromPincode || !toPincode || !startTime)
      return res.status(400).json({ message: 'Missing query params' });

    const start = new Date(startTime);
    const rideHours = calcRideDuration(fromPincode, toPincode);
    const end = new Date(start.getTime() + rideHours * 60 * 60 * 1000);

    const vehicles = await Vehicle.find({ capacityKg: { $gte: Number(capacityRequired) } });

    const available = [];
    for (let v of vehicles) {
      const overlapping = await Booking.findOne({
        vehicleId: v._id,
        $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
      });
      if (!overlapping) available.push({ ...v.toObject(), estimatedRideDurationHours: rideHours });
    }

    res.json(available);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
