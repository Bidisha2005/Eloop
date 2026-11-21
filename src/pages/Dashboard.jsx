import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    api.getListings().then(setItems).catch(() => {});
    api.getRequests().then(setRequests).catch(() => {});
  }, []);
  return <section className="page-shell">
    <div className="page-intro"><span className="eyebrow">YOUR E-LOOP SPACE</span><h1>Your <em>dashboard.</em></h1><p>Keep track of the items you have listed and the requests you have sent.</p></div>
    <div className="dashboard-stats"><div><span>Visible listings</span><strong>{items.length}</strong></div><div><span>Purchase requests sent</span><strong>{requests.length}</strong></div><div><span>Pending requests</span><strong>{requests.filter(r => r.status === "Pending").length}</strong></div></div>
    <div className="dashboard-columns"><section><div className="dashboard-heading"><h2>Your listings</h2><Link to="/sell" className="text-link">＋ Add item</Link></div>
      {items.length ? <div className="dashboard-list">{items.map(item => <Link to={`/listing/${item.id}`} className="dashboard-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.title}</strong><span>{item.category} · {item.condition}</span></div><b>₹{Number(item.price).toLocaleString("en-IN")}</b></Link>)}</div> : <p className="muted">You have not listed anything yet.</p>}
    </section><section><div className="dashboard-heading"><h2>Purchase requests</h2></div>
      {requests.length ? <div className="request-list">{requests.map(r => <div className="request-item" key={r.id}><strong>Request for {r.listingId}</strong><span>{r.message}</span><small className="status-tag">{r.status}</small></div>)}</div> : <div className="empty-mini"><span>↗</span><p>No purchase requests yet. Explore the marketplace to find something useful.</p><Link to="/marketplace" className="text-link">Browse items →</Link></div>}
    </section></div>
    <p className="helper-text dashboard-note">This starter dashboard shows shared demo listings and requests. User accounts, ownership, and seller-side accept/reject actions need to be connected to authenticated backend APIs.</p>
  </section>;
}
