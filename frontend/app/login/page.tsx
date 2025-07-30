"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.ok) {
      toast.success("Connexion réussie");
      router.push("/");
    } else {
      toast.error("Identifiants incorrects ou erreur serveur");
    }

    setIsSubmitting(false);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <div className="flex items-center justify-center px-6 py-12 bg-white text-black shadow-2xl rounded-r-3xl order-2 md:order-1 dark:bg-gray-900 dark:text-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
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

          {/* Mot de passe oublié */}
          <div className="text-right text-sm">
            <Link
              href="/forgot-password"
              className="underline text-purple-600 hover:text-purple-400 transition"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="btn-primary bg-purple-600 text-white hover:bg-purple-700 transition rounded py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn-secondary border border-gray-400 text-gray-700 hover:bg-gray-100 transition rounded py-2 dark:border-white dark:text-white dark:hover:bg-gray-800"
          >
            Continuer avec Google
          </button>

          <p className="text-xs text-gray-600 mt-4 dark:text-gray-300">
            En vous connectant, vous acceptez nos{" "}
            <Link href="/legal/terms" className="underline">Conditions d'utilisation</Link> et notre{" "}
            <Link href="/legal/privacy" className="underline">Politique de confidentialité</Link>.
          </p>

          <p className="text-sm text-center mt-2">
            Vous n'avez pas de compte ?{" "}
            <Link href="/register" className="underline hover:text-purple-400 transition">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>

      <div className="flex flex-col justify-center px-10 py-10 md:py-20 space-y-6 order-1 md:order-2">
        <h1 className="text-4xl font-bold text-white">Connexion à Reporter</h1>
        <p className="text-lg text-gray-300">
          Tous les champs sont obligatoires pour accéder à votre espace Reporter.
        </p>
        <ul className="space-y-4">
          <li>🔐 Connexion sécurisée et rapide</li>
          <li>🌙 Accès à vos favoris, historiques et recommandations</li>
          <li>⚡ Sans abonnement, 100% gratuit</li>
        </ul>
      </div>
    </div>
  );
}
