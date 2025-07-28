import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar1";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Allrooms from "./pages/Allrooms";
import RoomDetails from "./pages/RoomDetails";
import MyBooking from "./pages/MyBooking";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/HotelOwner/Layout";
import DashBoard from "./pages/HotelOwner/DashBoard";
import AddRoom from "./pages/HotelOwner/AddRoom";
import ListRoom from "./pages/HotelOwner/ListRoom";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}
      <div className="flex flex-col min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/rooms" element={<Allrooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-booking" element={<MyBooking />} />

          <Route path="/owner" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
