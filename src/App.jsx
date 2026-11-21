import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Sell from "./pages/Sell";
import ListingDetails from "./pages/ListingDetails";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/listing/:id" element={<ListingDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>;
}
