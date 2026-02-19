"use client";

import { useEffect, useState } from "react";

type Food = {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [form, setForm] = useState({
    name: "",
    kcal: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  async function loadFoods() {
    const res = await fetch("/api/foods");
    const data = await res.json();
    setFoods(data);
  }

  useEffect(() => {
    loadFoods();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/foods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      kcal: "",
      protein: "",
      carbs: "",
      fat: "",
    });

    loadFoods();
  }

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "system-ui",
        background: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>🥗 Nutrition Tracker</h1>

      {/* FORM CARD */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "30px",
          maxWidth: "600px",
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="kcal"
            value={form.kcal}
            onChange={(e) => setForm({ ...form, kcal: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Protein"
            value={form.protein}
            onChange={(e) => setForm({ ...form, protein: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Carbs"
            value={form.carbs}
            onChange={(e) => setForm({ ...form, carbs: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Fat"
            value={form.fat}
            onChange={(e) => setForm({ ...form, fat: e.target.value })}
            style={inputStyle}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#4CAF50",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Add Food
          </button>
        </form>
      </div>

      {/* FOOD CARDS */}
      <div style={{ display: "grid", gap: "15px", maxWidth: "600px" }}>
        {foods.map((f) => (
          <div
            key={f.id}
            style={{
              background: "white",
              padding: "18px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: 600 }}>
              {f.name}
            </div>

            <div style={{ marginTop: "8px", fontWeight: 500 }}>
              {f.kcal} kcal
            </div>

            <div
              style={{
                marginTop: "8px",
                display: "flex",
                gap: "15px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#2196F3" }}>P: {f.protein}g</span>
              <span style={{ color: "#FF9800" }}>C: {f.carbs}g</span>
              <span style={{ color: "#F44336" }}>F: {f.fat}g</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};
