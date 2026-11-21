import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.getListings().then(data => setItems(data.slice(0, 3))).catch(() => {}); }, []);
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow light">THE CIRCULAR ELECTRONICS MARKETPLACE</span>
          <h1>Old tech.<br /><em>New possibilities.</em></h1>
          <p>Give unwanted electronics a second life. Sell, reuse, refurbish, and recycle — all in one place.</p>
          <div className="hero-actions"><Link to="/sell" className="button button-lime">List your e-waste <span>↗</span></Link><Link to="/marketplace" className="text-link light-link">Explore marketplace →</Link></div>
          <div className="hero-note"><span className="pulse-dot"></span> A smarter way to keep electronics in the loop</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="device device-laptop"><div className="laptop-screen">E</div><div className="laptop-base"></div></div>
          <div className="device device-phone"><div className="phone-screen">↻</div></div>
          <div className="float-chip chip-one">REUSE</div><div className="float-chip chip-two">RECYCLE</div>
          <div className="hero-spark">✳</div>
        </div>
      </section>
      <section className="stats-strip">
        <div><strong>01</strong><span>Upload your item</span></div><div><strong>02</strong><span>Confirm its category</span></div><div><strong>03</strong><span>Find its next owner</span></div>
      </section>
      <section className="section how-section">
        <div className="section-heading"><div><span className="eyebrow">HOW E-LOOP WORKS</span><h2>A better loop for<br />your old electronics.</h2></div><p>Make your unused devices useful again. Our simple marketplace connects people with items to pass on and people ready to give them another life.</p></div>
        <div className="steps-grid">
          <div className="step-card"><span className="step-number">01</span><div className="step-icon">↑</div><h3>List it</h3><p>Upload a photo and share a few details about your old electronic item.</p></div>
          <div className="step-card"><span className="step-number">02</span><div className="step-icon">⌕</div><h3>Discover it</h3><p>Buyers explore listings and find devices, parts, and materials they can use.</p></div>
          <div className="step-card"><span className="step-number">03</span><div className="step-icon">↗</div><h3>Pass it on</h3><p>Connect with interested buyers and help keep useful electronics in circulation.</p></div>
        </div>
      </section>
      <section className="section featured-section">
        <div className="section-heading compact-heading"><div><span className="eyebrow">FRESH FINDS</span><h2>Recently listed</h2></div><Link to="/marketplace" className="text-link">View all items →</Link></div>
        <div className="listing-grid">{items.map(item => <ListingCard key={item.id} item={item} />)}</div>
      </section>
      <section className="closing-cta"><div><span className="eyebrow light">READY TO MAKE A DIFFERENCE?</span><h2>That old device could<br />be someone’s next find.</h2></div><Link to="/sell" className="button button-lime">Start listing <span>↗</span></Link></section>
    </>
  );
}
