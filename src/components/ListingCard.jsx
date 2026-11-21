import { Link } from "react-router-dom";

export default function ListingCard({ item }) {
  return (
    <article className="listing-card">
      <Link to={`/listing/${item.id}`} className="listing-image-wrap">
        <img src={item.image} alt={item.title} className="listing-image"
          onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900"; }} />
        <span className="category-pill">{item.category}</span>
      </Link>
      <div className="listing-info">
        <div className="listing-meta"><span>{item.condition}</span><span>•</span><span>{item.location}</span></div>
        <Link to={`/listing/${item.id}`} className="listing-title">{item.title}</Link>
        <div className="listing-bottom"><strong>₹{Number(item.price || 0).toLocaleString("en-IN")}</strong><Link to={`/listing/${item.id}`}>View item ↗</Link></div>
      </div>
    </article>
  );
}
