"use client";

import { useState } from "react";

export default function AuthForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Login", form);
    // TODO: login via API or next-auth
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-8 flex-1">
      <h2 className="text-xl font-semibold">Se connecter à Reporter</h2>
      <input
        type="email"
        name="email"
        placeholder="Adresse email"
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
      <p className="text-xs text-gray-600">
        En continuant, vous acceptez les <a href="#" className="underline">Conditions d'utilisation</a> et la
        <a href="#" className="underline"> Politique de confidentialité</a> de Reporter.
      </p>
      <button className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-900">
        Connexion
      </button>
    </form>
  );
}
