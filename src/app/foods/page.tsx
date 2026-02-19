"use client";

import { useEffect, useState } from "react";

type Food = {
  id: number;
  name: string;
  kcal: number;
};

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    fetch("/api/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Foods</h1>

      <div style={{ marginTop: "20px" }}>
        {foods.map((f) => (
          <div key={f.id} style={{ marginBottom: "10px" }}>
            {f.name} – {f.kcal} kcal
          </div>
        ))}
      </div>
    </main>
  );
}

