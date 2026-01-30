import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Bookings from "./pages/Booking";
import AddVehicle from "./pages/AddVehicle";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
