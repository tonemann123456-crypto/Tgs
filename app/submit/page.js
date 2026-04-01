use client;
import { useState } from "react";

export default function Submit() {
  const [form, setForm] = useState({ email: "", card_name: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!form.email || !emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    if (!form.card_name || form.card_name.trim().length === 0) {
      setError("Card name is required");
      return false;
    }
    
    if (form.card_name.length > 200) {
      setError("Card name must be less than 200 characters");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Submission failed");
      }

      setMessage("✓ Card submitted successfully!");
      setForm({ email: "", card_name: "" });
    } catch (err) {
      setError(`✗ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Submit Your Cards</h1>

      {error && <div style={{ color: "#FF6B6B", marginBottom: "20px" }}>{error}</div>}
      {message && <div style={{ color: "#00FFC6", marginBottom: "20px" }}>{message}</div>}

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        disabled={loading}
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      <input
        placeholder="Card Name"
        value={form.card_name}
        onChange={(e) => setForm({ ...form, card_name: e.target.value })}
        disabled={loading}
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      <button onClick={handleSubmit} disabled={loading} style={{ padding: "8px 16px" }}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}