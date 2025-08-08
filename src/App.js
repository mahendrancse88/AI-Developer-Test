import React, { useState } from "react";
import productsData from "./data/products";
import axios from "axios";

function App() {
  const [products, setProducts] = useState(productsData);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Your OpenAI API key - IMPORTANT: In real app, use backend to secure it!
  const OPENAI_API_KEY = "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";

  const handleSearch = async () => {
    if (!query.trim()) {
      setProducts(productsData);
      return;
    }

    setLoading(true);

    try {
      // Prompt OpenAI to extract filters from natural language
      const prompt = `
Given a product catalog with fields category, price, rating,
extract the filter criteria from this user query:
"${query}"

Return a JSON object with keys:
- category (string or null)
- maxPrice (number or null)
- minRating (number or null)

Example:
Input: Show me running shoes under $100 with good reviews
Output: {"category":"shoes","maxPrice":100,"minRating":4.0}
`;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.choices[0].message.content;

      // Parse JSON from OpenAI's response safely
      let filters = null;
      try {
        filters = JSON.parse(reply);
      } catch {
        // fallback: no filters extracted
        filters = {};
      }

      // Filter products locally
      const filtered = productsData.filter((p) => {
        const matchCategory =
          !filters.category ||
          p.category.toLowerCase().includes(filters.category.toLowerCase());

        const matchPrice =
          filters.maxPrice == null || p.price <= filters.maxPrice;

        const matchRating =
          filters.minRating == null || p.rating >= filters.minRating;

        return matchCategory && matchPrice && matchRating;
      });

      setProducts(filtered);
    } catch (error) {
      alert("Search failed, showing all products.");
      setProducts(productsData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Simple E-commerce Catalog</h1>
      <input
        style={{
          padding: 8,
          width: "100%",
          marginBottom: 10,
          borderRadius: 4,
          border: "1px solid #ccc",
          fontSize: 16,
        }}
        placeholder="Try: running shoes under $100 with good reviews"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button onClick={handleSearch} disabled={loading} style={{ padding: "8px 16px", fontSize: 16 }}>
        {loading ? "Searching..." : "Search"}
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {products.map(({ id, name, price, category, description, rating }) => (
          <li
            key={id}
            style={{
              marginBottom: 15,
              padding: 15,
              border: "1px solid #ddd",
              borderRadius: 6,
            }}
          >
            <h3 style={{ margin: "0 0 6px 0" }}>{name}</h3>
            <p style={{ margin: "0 0 6px 0", fontSize: 14, color: "#555" }}>
              {category} — ${price.toFixed(2)} — ⭐ {rating.toFixed(1)}
            </p>
            <p style={{ margin: 0, fontSize: 13 }}>{description}</p>
          </li>
        ))}
        {products.length === 0 && <p>No products found matching your search.</p>}
      </ul>
    </div>
  );
}

export default App;
