import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Sell from "./pages/Sell";
import ListingDetails from "./pages/ListingDetails";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";

function hasSession() {
  return Boolean(localStorage.getItem("eloopSession"));
}

function RequireAuth({ children }) {
  return hasSession() ? children : <Navigate to="/welcome" replace />;
}

function GuestOnly({ children }) {
  return hasSession() ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<GuestOnly><Welcome /></GuestOnly>} />
      <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
      <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />

      <Route element={<RequireAuth><Layout /></RequireAuth>}>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
