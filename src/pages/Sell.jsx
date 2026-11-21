import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { categories } from "../data/mockData";

const blank = { title: "", category: "", condition: "Used - Good", price: "", location: "", description: "" };

export default function Sell() {
  const [form, setForm] = useState(blank);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [predicting, setPredicting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));

  function chooseFile(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith("image/")) { setError("Please select an image file."); return; }
    if (selected.size > 5 * 1024 * 1024) { setError("Image must be smaller than 5 MB."); return; }
    setError(""); setFile(selected); setPreview(URL.createObjectURL(selected)); setPrediction(null);
  }

  async function predict() {
    if (!file) { setError("Upload an image first."); return; }
    setPredicting(true); setError("");
    try {
      const result = await api.predictCategory(file);
      const predicted = result.category || result.prediction || result.label || "";
      setPrediction({ category: predicted, confidence: result.confidence });
      if (predicted) setForm(current => ({ ...current, category: predicted }));
    } catch (e) { setError(`Could not predict category: ${e.message}. You can still choose it manually.`); }
    finally { setPredicting(false); }
  }

  async function submit(event) {
    event.preventDefault(); setError("");
    if (!form.title || !form.category || !form.price || !form.location || !form.description) {
      setError("Please complete all required fields."); return;
    }
    if (Number(form.price) < 0) { setError("Price cannot be negative."); return; }
    setSaving(true);
    try {
      const created = await api.createListing({ ...form, price: Number(form.price), image: preview });
      navigate(`/listing/${created.id}`);
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }

  return <section className="page-shell narrow-shell">
    <div className="page-intro"><span className="eyebrow">SELLER SPACE</span><h1>Give your tech a <em>next life.</em></h1><p>Tell the community what you have. A category suggestion can help you get started.</p></div>
    <form className="sell-form" onSubmit={submit}>
      <div className="form-section"><div className="form-section-title"><span>01</span><div><h2>Add an item photo</h2><p>Use a clear photo of the electronic item. Maximum 5 MB.</p></div></div>
        <div className={`upload-zone ${preview ? "has-preview" : ""}`} onClick={() => fileRef.current?.click()} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && fileRef.current?.click()}>
          {preview ? <img src={preview} alt="Selected item preview" /> : <><div className="upload-icon">↑</div><strong>Click to upload an image</strong><span>PNG, JPG or WEBP · up to 5 MB</span></>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={chooseFile} />
        <div className="prediction-row"><button type="button" className="button button-outline" onClick={predict} disabled={!file || predicting}>{predicting ? "Analysing image..." : "✧ Suggest category with AI"}</button>
          {prediction && <span className="prediction-result">Suggested: <strong>{prediction.category}</strong>{typeof prediction.confidence === "number" ? ` · ${Math.round(prediction.confidence * 100)}% confidence` : ""}</span>}
        </div>
        <p className="helper-text">AI suggestions can be wrong. Please check the category and correct it if needed.</p>
      </div>
      <div className="form-section"><div className="form-section-title"><span>02</span><div><h2>Item details</h2><p>Help buyers understand exactly what you are listing.</p></div></div>
        <div className="form-grid">
          <label className="field full">Item title *<input value={form.title} onChange={e => update("title", e.target.value)} placeholder="e.g. HP laptop with charger" required /></label>
          <label className="field">Category *<select value={form.category} onChange={e => update("category", e.target.value)} required><option value="">Choose category</option>{categories.slice(1).map(c => <option key={c}>{c}</option>)}</select></label>
          <label className="field">Condition *<select value={form.condition} onChange={e => update("condition", e.target.value)}><option>Used - Good</option><option>Used - Fair</option><option>For Parts</option><option>Non-working</option></select></label>
          <label className="field">Expected price (₹) *<input type="number" min="0" value={form.price} onChange={e => update("price", e.target.value)} placeholder="e.g. 1500" required /></label>
          <label className="field">Location *<input value={form.location} onChange={e => update("location", e.target.value)} placeholder="City, State" required /></label>
          <label className="field full">Description *<textarea rows="4" value={form.description} onChange={e => update("description", e.target.value)} placeholder="Mention condition, defects, accessories, and anything buyers should know..." required /></label>
        </div>
      </div>
      {error && <p className="notice error">{error}</p>}
      <div className="form-submit"><p>By listing, you confirm that the item details are accurate to the best of your knowledge.</p><button className="button button-dark" disabled={saving}>{saving ? "Publishing..." : "Publish listing ↗"}</button></div>
    </form>
  </section>;
}
