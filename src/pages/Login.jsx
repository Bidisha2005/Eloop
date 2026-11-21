import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const savedUser = JSON.parse(localStorage.getItem("eloopUser") || "null");
    if (!savedUser || savedUser.email.toLowerCase() !== form.email.trim().toLowerCase() || savedUser.password !== form.password) {
      setError("Email or password is incorrect. Please register first if you are new.");
      return;
    }
    localStorage.setItem("eloopSession", JSON.stringify({ name: savedUser.name, email: savedUser.email }));
    navigate("/dashboard");
  }

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <Link to="/" className="auth-brand"><span className="brand-mark">↻</span> E-LOOP</Link>
        <span className="eyebrow">WELCOME BACK</span>
        <h1>Log in to your account</h1>
        <p className="auth-subtitle">Pick up where you left off and keep useful electronics in circulation.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">Email<input type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></label>
          <label className="field">Password<input type="password" autoComplete="current-password" placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></label>
          {error && <div className="notice error" role="alert">{error}</div>}
          <button className="button button-dark auth-submit" type="submit">Login <span>↗</span></button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
      </div>
      <aside className="auth-aside"><span className="eyebrow light">A SECOND LIFE FOR TECHNOLOGY</span><h2>Good things<br />deserve <em>another round.</em></h2><p>Join a community making reuse the first choice for electronics.</p><div className="auth-orbit">↻</div></aside>
    </section>
  );
}
