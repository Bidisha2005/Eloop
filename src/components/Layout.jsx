import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("eloopSession");
    navigate("/welcome", { replace: true });
  }
  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <Link to="/" className="brand"><span className="brand-mark">↻</span><span>E-LOOP</span></Link>
          <nav className="main-nav">
            <NavLink to="/marketplace">Marketplace</NavLink>
            <NavLink to="/sell">Sell an item</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </nav>
          <button className="nav-cta nav-logout" type="button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="footer">
        <div className="footer-inner">
          <Link to="/" className="brand footer-brand"><span className="brand-mark">↻</span><span>E-LOOP</span></Link>
          <p>Keep useful electronics in use. Give old devices another chance.</p>
          <span>© {new Date().getFullYear()} E-LOOP</span>
        </div>
      </footer>
    </>
  );
}
