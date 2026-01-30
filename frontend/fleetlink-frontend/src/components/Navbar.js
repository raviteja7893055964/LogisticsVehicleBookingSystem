import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        background: "#020617",
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white" }}>FleetLink</h2>

      <div>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/vehicles">Vehicles</Link>
        <Link style={linkStyle} to="/booking">Booking</Link>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "#e5e7eb",
  marginLeft: "20px",
  textDecoration: "none",
  fontWeight: "500",
};

export default Navbar;
