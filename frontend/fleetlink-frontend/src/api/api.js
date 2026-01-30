const BASE_URL = "http://localhost:5000/api";

/* ================= VEHICLES ================= */

export const getVehicles = async () => {
  const res = await fetch(`${BASE_URL}/vehicles`);
  if (!res.ok) throw new Error("Failed to fetch vehicles");
  const result = await res.json();
  return result.data;
};

export const addVehicle = async (data) => {
  const res = await fetch(`${BASE_URL}/vehicles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add vehicle");
  return res.json();
};

/* ================= BOOKINGS ================= */

export const createBooking = async (data) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Booking failed");
  }

  return res.json();
};

export const getBookings = async () => {
  const res = await fetch(`${BASE_URL}/bookings`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};
