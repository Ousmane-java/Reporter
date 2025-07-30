"use client";

import { useState } from "react";

export default function PublishForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "documentaire",
    featured: false,
    thumbnail: null as File | null,
    video: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target as any;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const uploadToCloudinary = async (file: File, resource_type: "image" | "video") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "reporter_upload");

    const res = await fetch(`https://api.cloudinary.com/v1_1/dqnsxhi54/${resource_type}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(`[Cloudinary ${resource_type}]`, data);

    if (!res.ok || !data.secure_url) {
      console.error("❌ Échec Cloudinary :", data);
      throw new Error("Échec de l'upload Cloudinary");
    }

    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.thumbnail || !form.video) {
        alert("❗ Merci de sélectionner une miniature et une vidéo.");
        return;
      }

      const thumbnailUrl = await uploadToCloudinary(form.thumbnail, "image");
      const videoUrl = await uploadToCloudinary(form.video, "video");

      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("description", form.description);
      payload.append("category", form.category);
      payload.append("featured", String(form.featured));
      payload.append("thumbnail", thumbnailUrl);
      payload.append("video", videoUrl);

      const response = await fetch("/api/admin/publish", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Erreur API /publish :", err);
        throw new Error("Erreur lors de l'enregistrement en base");
      }

      alert("✅ Contenu publié avec succès !");
      setForm({
        title: "",
        description: "",
        category: "documentaire",
        featured: false,
        thumbnail: null,
        video: null,
      });
    } catch (err) {
      console.error("❌ Erreur de publication :", err);
      alert("Erreur lors de la publication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded shadow"
    >
      <div>
        <label className="block mb-1 font-medium">Titre</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Catégorie</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="documentaire">Documentaire</option>
          <option value="société">Société</option>
          <option value="sport">Sport</option>
          <option value="culture">Culture</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
          id="featured"
        />
        <label htmlFor="featured">Mettre à la une</label>
      </div>

      <div>
        <label className="block mb-1 font-medium">Miniature</label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Vidéo</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Publication..." : "Publier"}
      </button>
    </form>
  );
}
