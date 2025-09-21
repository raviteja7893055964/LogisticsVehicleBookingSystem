const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/fleetlink_test');
  await Vehicle.deleteMany({});
  await Booking.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Booking API', () => {
  let vehicleId;

  it('should create a vehicle for booking', async () => {
    const vehicle = await Vehicle.create({ name: 'Truck Test', capacityKg: 500, tyres: 4 });
    vehicleId = vehicle._id;
    expect(vehicle.name).toBe('Truck Test');
  });

  it('should book a vehicle', async () => {
    const startTime = new Date();
    const res = await request(app)
      .post('/api/bookings')
      .send({
        vehicleId,
        fromPincode: '500001',
        toPincode: '500005',
        startTime,
        customerId: 'cust123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.vehicleId).toBe(vehicleId.toString());
  });

  it('should prevent overlapping booking', async () => {
    const startTime = new Date();
    const res = await request(app)
      .post('/api/bookings')
      .send({
        vehicleId,
        fromPincode: '500001',
        toPincode: '500005',
        startTime,
        customerId: 'cust456'
      });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Vehicle already booked');
  });
});
