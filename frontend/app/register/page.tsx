// ✅ app/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function RegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("/api/register", form);
      toast.success("Compte créé, redirection…");

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
      } else {
        toast.error("Connexion échouée après inscription");
      }
    } catch (err: any) {
      toast.error(err.response?.data || "Erreur lors de l'inscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <div className="flex items-center justify-center px-6 py-12 bg-white text-black shadow-2xl rounded-r-3xl order-2 md:order-2 dark:bg-gray-900 dark:text-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <input
            name="name"
            type="text"
            placeholder="Nom complet"
            value={form.name}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="email"
            type="email"
            placeholder="Votre adresse e-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="password"
            type="password"
            placeholder="Votre mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            className="input"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="newsletter"
              checked={form.newsletter}
              onChange={handleChange}
            />
            Je souhaite recevoir des alertes personnalisées
          </label>
          <button
            type="submit"
            className="btn-primary bg-purple-600 text-white hover:bg-purple-700 transition rounded py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Création..." : "Créer mon compte"}
          </button>

          <button
            onClick={handleGoogleRegister}
            type="button"
            className="btn-secondary border border-gray-400 text-gray-700 hover:bg-gray-100 transition rounded py-2 dark:border-white dark:text-white dark:hover:bg-gray-800"
          >
            Continuer avec Google
          </button>

          <p className="text-xs text-gray-600 mt-4 dark:text-gray-300">
            En créant un compte, vous acceptez nos {" "}
            <Link href="/legal/terms" className="underline">Conditions d'utilisation</Link> et notre {" "}
            <Link href="/legal/privacy" className="underline">Politique de confidentialité</Link>.
          </p>
          <p className="text-sm text-center mt-2 dark:text-gray-400">
            Vous avez déjà un compte ? <Link href="/login" className="underline hover:text-purple-400 transition">Se connecter</Link>
          </p>
        </form>
      </div>

      <div className="flex flex-col justify-center px-10 py-10 md:py-20 space-y-6 order-1 md:order-1">
        <h1 className="text-4xl font-bold text-white">Créer un compte Reporter</h1>
        <ul className="space-y-4">
          <li>📺 Accédez aux directs, replays et contenus exclusifs</li>
          <li>🧠 Profitez d'une expérience enrichie et personnalisée</li>
          <li>❤️ Créez votre liste de favoris et reprenez vos lectures</li>
          <li>🏱 C'est 100% gratuit et sans abonnement !</li>
        </ul>
      </div>
    </div>
  );
}
