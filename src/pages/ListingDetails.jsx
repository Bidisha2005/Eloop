import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

export default function ListingDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState("Hi, I am interested in this item. Is it still available?");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  useEffect(() => { api.getListing(id).then(setItem).catch(e => setError(e.message)); }, [id]);
  async function sendRequest(e) {
    e.preventDefault(); setSending(true); setError(""); setStatus("");
    try { await api.createPurchaseRequest(id, message); setStatus("Your purchase request has been sent."); }
    catch (e) { setError(e.message); }
    finally { setSending(false); }
  }
  if (error && !item) return <section className="page-shell"><p className="notice error">{error}</p><Link to="/marketplace">← Back to marketplace</Link></section>;
  if (!item) return <section className="page-shell"><p>Loading item...</p></section>;
  return <section className="page-shell detail-shell">
    <Link to="/marketplace" className="back-link">← Back to marketplace</Link>
    <div className="detail-layout">
      <div className="detail-photo"><img src={item.image} alt={item.title} /></div>
      <div className="detail-content"><span className="eyebrow">{item.category} · {item.condition}</span><h1>{item.title}</h1><div className="detail-price">₹{Number(item.price).toLocaleString("en-IN")}</div>
        <p className="detail-description">{item.description}</p>
        <div className="detail-facts"><div><span>Location</span><strong>{item.location}</strong></div><div><span>Listed by</span><strong>{item.seller || "E-LOOP member"}</strong></div><div><span>Listed on</span><strong>{item.createdAt || "Recently"}</strong></div></div>
        <form className="request-box" onSubmit={sendRequest}><h3>Interested in this item?</h3><label className="field">Message to seller<textarea rows="3" value={message} onChange={e => setMessage(e.target.value)} required /></label>
          {status && <p className="notice success">{status}</p>}{error && <p className="notice error">{error}</p>}
          <button className="button button-dark" disabled={sending}>{sending ? "Sending..." : "Send purchase request ↗"}</button>
        </form>
      </div>
    </div>
  </section>;
}
