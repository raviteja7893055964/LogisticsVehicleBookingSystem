import React, { useEffect, useState } from "react";
import { getVehicles, createBooking } from "../api/api";

const Booking = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [fromPincode, setFromPincode] = useState("");
  const [toPincode, setToPincode] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [startTime, setStartTime] = useState("");

  useEffect(() => {
    getVehicles().then(setVehicles);
  }, []);

  const submitBooking = async (e) => {
    e.preventDefault();

    if (!vehicleId || !fromPincode || !toPincode || !customerId || !startTime) {
      alert("All fields are required");
      return;
    }

    await createBooking({
      vehicleId,
      fromPincode,
      toPincode,
      startTime,
      customerId,
    });

    alert("Booking saved successfully");

    setVehicleId("");
    setFromPincode("");
    setToPincode("");
    setCustomerId("");
    setStartTime("");
  };

  return (
    <div style={{ padding: "40px", color: "#fff" }}>
      <h2>Book Vehicle</h2>

      <form onSubmit={submitBooking}>
        <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
          <option value="">Select Vehicle</option>
          {vehicles.map((v) => (
            <option key={v._id} value={v._id}>
              {v.vehicleNumber} ({v.type})
            </option>
          ))}
        </select>

        <br /><br />

        <input
          placeholder="From Pincode"
          value={fromPincode}
          onChange={(e) => setFromPincode(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="To Pincode"
          value={toPincode}
          onChange={(e) => setToPincode(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />

        <br /><br />

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <br /><br />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Booking;
