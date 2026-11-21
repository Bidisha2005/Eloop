import { initialListings } from "../data/mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== "false";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

let listings = [...initialListings];
let requests = [];

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
  return data;
}

const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getListings() {
    if (USE_MOCK) { await delay(); return [...listings]; }
    const data = await request("/listings");
    return Array.isArray(data) ? data : (data.listings || []);
  },

  async getListing(id) {
    if (USE_MOCK) {
      await delay();
      const found = listings.find(item => String(item.id) === String(id));
      if (!found) throw new Error("Listing not found");
      return found;
    }
    return request(`/listings/${id}`);
  },

  async createListing(formData) {
    if (USE_MOCK) {
      await delay(400);
      const item = {
        ...formData,
        id: `item-${Date.now()}`,
        image: formData.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900",
        seller: "You",
        createdAt: new Date().toISOString().slice(0, 10)
      };
      listings = [item, ...listings];
      return item;
    }
    // The existing backend may expect multipart/form-data. Adjust field names
    // here if your POST /listings contract differs.
    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => body.append(key, value));
    return request("/listings", { method: "POST", body });
  },

  async predictCategory(file) {
    if (USE_MOCK) {
      await delay(700);
      const name = file?.name?.toLowerCase() || "";
      const category =
        name.includes("laptop") ? "Laptop" :
        name.includes("phone") || name.includes("mobile") ? "Mobile" :
        name.includes("battery") ? "Battery" :
        name.includes("cable") ? "Cable" :
        name.includes("keyboard") ? "Keyboard" :
        name.includes("mouse") ? "Mouse" : "PCB";
      return { category, confidence: 0.86, mock: true };
    }
    const body = new FormData();
    body.append("image", file);
    // Change this path only if your ML prediction route is different.
    return request("/predict", { method: "POST", body });
  },

  async createPurchaseRequest(listingId, message) {
    if (USE_MOCK) {
      await delay(350);
      const created = {
        id: `request-${Date.now()}`,
        listingId,
        message,
        status: "Pending",
        createdAt: new Date().toISOString()
      };
      requests = [created, ...requests];
      return created;
    }
    return request("/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, message })
    });
  },

  async getRequests() {
    if (USE_MOCK) { await delay(); return [...requests]; }
    const data = await request("/requests");
    return Array.isArray(data) ? data : (data.requests || []);
  }
};

export const isMockMode = USE_MOCK;
