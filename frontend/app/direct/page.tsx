// app/direct/page.tsx
"use client";

import { useState } from "react";
import { categories } from "@/utils/categories";

const dummyDirects = [
  { title: "Foot: Finale Coupe du Monde", category: "Sport" },
  { title: "Docu: Réchauffement climatique", category: "Documentaires" },
  { title: "Film: La révolution des idées", category: "Cinéma" },
  { title: "Série: Le Pouvoir dans l'Ombre", category: "Séries & fictions" },
  { title: "Débat Politique", category: "Info" },
];

export default function DirectPage() {
  const [search, setSearch] = useState("");

  const filtered = dummyDirects.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-4 text-white min-h-screen bg-black">
      <h1 className="text-3xl font-bold mb-6">📺 En direct</h1>

      {/* Champ de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un direct..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 text-black rounded focus:outline-none"
        />
      </div>

      {/* Liste par catégories */}
      {categories.map((cat) => {
        const items = filtered.filter((d) => d.category === cat.name);
        if (items.length === 0) return null;
        return (
          <div key={cat.name} className="mb-6">
            <h2 className={`text-xl font-semibold mb-2 ${cat.color} px-2 py-1 rounded inline-block`}>
              {cat.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((d, idx) => (
                <div key={idx} className="bg-gray-900 p-4 rounded shadow">
                  <h3 className="text-lg font-medium">{d.title}</h3>
                  <p className="text-sm text-gray-400">Catégorie : {d.category}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
