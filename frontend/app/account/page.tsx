"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  const handleResetPassword = async () => {
    try {
      const res = await fetch("/api/send-reset-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erreur serveur: ${res.status} - ${text}`);
      }

      const data = await res.json();
      alert(data.message || "Lien de réinitialisation envoyé si l'email existe.");
    } catch (error: any) {
      alert("Erreur lors de l'envoi du lien : " + error.message);
    }
  };

  if (status === "loading") return <p className="p-6">Chargement...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white px-6 py-12">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Mon compte</h1>

          <div className="space-y-4">
            <p><strong>Nom :</strong> {session?.user?.name}</p>
            <p><strong>Email :</strong> {session?.user?.email}</p>
          </div>

          <div className="mt-8">
            {showPasswordForm ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Nous allons vous envoyer un lien de réinitialisation à votre adresse email.
                </p>
                <button
                  onClick={handleResetPassword}
                  className="w-full sm:w-auto bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
                >
                  Envoyer le lien
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="w-full sm:w-auto bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
              >
                Modifier mon mot de passe
              </button>
            )}
          </div>

          <p className="mt-6 text-center">
            <Link href="/" className="underline text-purple-600 hover:text-purple-400 transition">
              Retour à l'accueil
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
