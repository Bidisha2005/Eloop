import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <main className="welcome-page">
      <section className="welcome-copy">
        <Link to="/welcome" className="auth-brand"><span className="brand-mark">↻</span> E-LOOP</Link>
        <span className="eyebrow">THE CIRCULAR ELECTRONICS MARKETPLACE</span>
        <h1>Give your tech<br /><em>another life.</em></h1>
        <p className="welcome-description">A smarter place to buy, sell, reuse, refurbish, and recycle electronics. Sign in or create an account to enter the E-LOOP marketplace.</p>
        <div className="welcome-actions">
          <Link to="/login" className="button button-dark">Login <span>↗</span></Link>
          <Link to="/register" className="button button-outline">Create an account</Link>
        </div>
        <div className="welcome-points">
          <span><b>01</b> Discover useful tech</span>
          <span><b>02</b> Give devices a second life</span>
          <span><b>03</b> Keep resources in the loop</span>
        </div>
      </section>
      <aside className="welcome-art">
        <span className="eyebrow light">OLD TECH. NEW POSSIBILITIES.</span>
        <h2>Good things<br />deserve <em>another round.</em></h2>
        <p>Join a community making reuse the first choice for electronics.</p>
        <div className="welcome-orbit" aria-hidden="true"><span>↻</span><i>REUSE</i><b>RECYCLE</b></div>
        <div className="welcome-footnote">A SECOND LIFE FOR TECHNOLOGY</div>
      </aside>
    </main>
  );
}
