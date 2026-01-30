import React, { useState } from "react";
import { addVehicle } from "../api/api";

const AddVehicle = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(false);

  const submitVehicle = async (e) => {
    e.preventDefault();

    if (!vehicleNumber || !type || !capacity) {
      alert("All fields required");
      return;
    }

    const vehicleData = {
      vehicleNumber,
      type,
      capacity,
      isAvailable: true,
    };

    try {
      setLoading(true);
      await addVehicle(vehicleData);
      alert("Vehicle added successfully");

      setVehicleNumber("");
      setType("");
      setCapacity("");
    } catch (err) {
      alert("Failed to add vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", color: "#fff" }}>
      <h2>Add Vehicle</h2>

      <form onSubmit={submitVehicle}>
        <input
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Type (Truck / Van)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Capacity (e.g. 10 Tons)"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
