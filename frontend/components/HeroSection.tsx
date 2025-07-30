"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function HeroSection() {
  const [featured, setFeatured] = useState<Video | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/content/featured");

        const contentType = res.headers.get("content-type");

        if (!res.ok || !contentType?.includes("application/json")) {
          const raw = await res.text();
          console.warn("⚠️ Réponse inattendue :", raw);
          return;
        }

        const data = await res.json();
        setFeatured(data);
      } catch (err) {
        console.error("❌ Erreur de récupération :", err);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-5 bg-black text-white min-h-[70vh]">
      <div className="md:col-span-4 relative bg-gray-900">
        {featured ? (
          <>
            <img
              src={featured.thumbnail}
              alt={featured.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{featured.title}</h2>
              <p className="text-sm md:text-base mb-4">{featured.description}</p>
              <Link
                href={`/watch/${featured.id}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full w-fit"
              >
                Regarder
              </Link>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400">
            Aucun contenu à la une disponible
          </div>
        )}
      </div>

      <div className="md:col-span-1 flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-gray-900 p-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">Bienvenue dans votre Reporter</h3>
          <p className="text-xs md:text-sm text-gray-300">
            Un Reporter à votre image avec votre liste, vos catégories préférées, vos relectures et des recommandations sur ce qui vous intéresse vraiment.
          </p>
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/register"
              className="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-gray-100"
            >
              Créer un compte
            </Link>
            <Link
              href="/login"
              className="text-white underline hover:text-purple-300 text-sm"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
