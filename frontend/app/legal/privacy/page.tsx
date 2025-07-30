// ✅ app/legal/privacy/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const policies = [
  {
    title: "Qui est le responsable de traitement de vos données sur Reporter ?",
    content: "Le responsable du traitement est WinTech, entreprise éditrice de la plateforme Reporter."
  },
  {
    title: "Quelles sont les données que nous collectons ?",
    content: "Nous collectons : nom, e-mail, préférences de navigation, historique de visionnage, cookies techniques et analytiques."
  },
  {
    title: "Pourquoi mes données sont-elles utilisées ?",
    content: "Pour vous permettre l'accès aux services, personnaliser votre expérience, vous notifier des nouveautés et analyser notre audience."
  },
  {
    title: "Avec qui sont partagées mes données ?",
    content: "Aucune donnée n'est vendue. Elles peuvent être partagées uniquement avec des sous-traitants techniques (hébergement, analyse) dans le respect du RGPD."
  },
  {
    title: "Quelle protection des données personnelles est appliquée pour les mineurs ?",
    content: "Les mineurs de moins de 15 ans doivent obtenir le consentement parental pour s'inscrire. Les contenus sensibles sont signalés."
  },
  {
    title: "Combien de temps mes données sont-elles conservées ?",
    content: "Vos données sont conservées 3 ans après votre dernière activité, puis anonymisées ou supprimées."
  },
  {
    title: "Quels sont mes droits et comment les exercer ?",
    content: "Vous pouvez demander l'accès, la rectification, l'effacement ou la limitation de vos données en écrivant à privacy@reporter.app."
  },
  {
    title: "Cette politique peut-elle être modifiée ?",
    content: "Oui, nous nous réservons le droit de modifier cette politique. Vous en serez informé via la plateforme."
  }
];

export default function PrivacyPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Politique de Confidentialité</h1>

        {policies.map((policy, index) => (
          <div key={index}>
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full text-left text-xl font-semibold py-3 border-b border-gray-300 dark:border-gray-700"
            >
              {policy.title}
            </button>
            {open === index && <p className="mt-2 text-gray-700 dark:text-gray-300">{policy.content}</p>}
          </div>
        ))}

        <p className="text-sm text-center mt-10">
          <Link href="/legal/terms" className="underline hover:text-purple-600 transition">
            Lire aussi nos Conditions d'utilisation
          </Link>
        </p>
        <p className="text-center mt-4">
          <Link href="/" className="text-sm underline text-purple-600 hover:text-purple-400 transition">Retour à l'accueil</Link>
        </p>
      </div>
    </div>
  );
}
