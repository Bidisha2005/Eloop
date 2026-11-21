import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const existingUser = JSON.parse(localStorage.getItem("eloopUser") || "null");
    if (existingUser?.email?.toLowerCase() === form.email.trim().toLowerCase()) {
      setError("An account with this email already exists. Please log in.");
      return;
    }
    const newUser = { name: form.name.trim(), email: form.email.trim(), password: form.password };
    localStorage.setItem("eloopUser", JSON.stringify(newUser));
    localStorage.setItem("eloopSession", JSON.stringify({ name: newUser.name, email: newUser.email }));
    navigate("/", { replace: true });
  }

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <Link to="/welcome" className="auth-brand"><span className="brand-mark">↻</span> E-LOOP</Link>
        <span className="eyebrow">JOIN THE CIRCULAR MOVEMENT</span>
        <h1>Create your account</h1>
        <p className="auth-subtitle">A few details are all you need to get started.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">Name<input type="text" autoComplete="name" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></label>
          <label className="field">Email<input type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></label>
          <label className="field">Password<input type="password" autoComplete="new-password" minLength={6} placeholder="At least 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></label>
          {error && <div className="notice error" role="alert">{error}</div>}
          <button className="button button-dark auth-submit" type="submit">Create account <span>↗</span></button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
      <aside className="auth-aside"><span className="eyebrow light">MAKE YOUR NEXT MOVE COUNT</span><h2>Pass it on.<br /><em>Power the loop.</em></h2><p>Discover, reuse, and give electronics a more meaningful next chapter.</p><div className="auth-orbit">↻</div></aside>
    </section>
  );
}
