const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/fleetlink_test');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Vehicle API', () => {
  it('should add a vehicle', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .send({ name: 'Truck A', capacityKg: 1000, tyres: 6 });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Truck A');
  });

  it('should fail when required fields missing', async () => {
    const res = await request(app).post('/api/vehicles').send({ name: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('All fields required');
  });
});
