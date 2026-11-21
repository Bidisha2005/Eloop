import { useEffect, useMemo, useState } from "react";
import ListingCard from "../components/ListingCard";
import { api } from "../services/api";
import { categories } from "../data/mockData";

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [error, setError] = useState("");
  useEffect(() => { api.getListings().then(setItems).catch(e => setError(e.message)); }, []);
  const filtered = useMemo(() => {
    let result = items.filter(item => {
      const matchesCategory = category === "All" || item.category?.toLowerCase() === category.toLowerCase();
      const text = `${item.title} ${item.description} ${item.location}`.toLowerCase();
      return matchesCategory && text.includes(search.toLowerCase());
    });
    if (sort === "low") result.sort((a,b) => a.price-b.price);
    if (sort === "high") result.sort((a,b) => b.price-a.price);
    if (sort === "newest") result.sort((a,b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    return result;
  }, [items, search, category, sort]);
  return <section className="page-shell">
    <div className="page-intro"><span className="eyebrow">GIVE TECH ANOTHER LIFE</span><h1>Explore the <em>marketplace.</em></h1><p>Find electronics and components ready for reuse, repair, or responsible recycling.</p></div>
    <div className="market-toolbar">
      <div className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search laptops, cables, phones..." /></div>
      <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort listings"><option value="newest">Newest first</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
    </div>
    <div className="category-row">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={`filter-chip ${category === c ? "active" : ""}`}>{c}</button>)}</div>
    {error && <p className="notice error">{error}</p>}
    <div className="results-line"><span>{filtered.length} items found</span><span>Items for a more circular future</span></div>
    {filtered.length ? <div className="listing-grid">{filtered.map(item => <ListingCard key={item.id} item={item} />)}</div> : <div className="empty-state"><span>⌕</span><h3>No items found</h3><p>Try another search or category.</p><button className="button button-dark" onClick={() => {setSearch("");setCategory("All");}}>Clear filters</button></div>}
  </section>;
}
