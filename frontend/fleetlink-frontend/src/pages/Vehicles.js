import React, { useEffect, useState } from "react";
import { getBookings } from "../api/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return <p style={{ color: "#fff" }}>Loading bookings...</p>;
  }

  return (
    <div style={{ padding: "40px", color: "#fff" }}>
      <h2>Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Vehicle Number</th>
              <th>Source Pincode</th>
              <th>Destination Pincode</th>
              <th>Trip Start Time</th>
              <th>Trip End Time</th>
              <th>Customer ID</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.vehicleId?.vehicleNumber || "N/A"}</td>
                <td>{b.fromPincode}</td>
                <td>{b.toPincode}</td>
                <td>{new Date(b.startTime).toLocaleString()}</td>
                <td>{new Date(b.endTime).toLocaleString()}</td>
                <td>{b.customerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
