// ✅ app/legal/terms/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    title: "1. Introduction et terminologie",
    content: "Les présentes Conditions Générales d'Utilisation définissent les règles applicables à l'utilisation de la plateforme Reporter, propriété de WinTech."
  },
  {
    title: "2. Champ d'application des conditions générales d'utilisation des sites Reporter",
    content: "Les présentes conditions s'appliquent à tous les services, pages, sous-domaines et fonctionnalités accessibles via Reporter, qu'elles soient fournies via navigateur ou application mobile."
  },
  {
    title: "3. Configuration requise et conditions techniques",
    content: "L'utilisateur doit disposer d'une connexion Internet et d'un matériel compatible. Reporter décline toute responsabilité en cas d'incompatibilité."
  },
  {
    title: "4. Création du Compte Utilisateur",
    content: "La création d'un compte personnel est gratuite. L'utilisateur s'engage à fournir des informations exactes et à ne pas usurper l'identité d'un tiers."
  },
  {
    title: "5. Données personnelles",
    content: "Le traitement des données est effectué conformément au RGPD. Voir notre Politique de Confidentialité pour plus de détails."
  },
  {
    title: "6. Dispositions relatives aux espaces contributifs",
    content: "Tout commentaire ou contenu publié par l'utilisateur doit respecter la loi et ne pas porter atteinte aux droits d'autrui."
  },
  {
    title: "7. Utilisation du player",
    content: "Le player mis à disposition permet le visionnage de contenus pour un usage strictement personnel. Toute utilisation détournée est interdite."
  },
  {
    title: "8. Droits de propriété intellectuelle",
    content: "Les contenus présents sur Reporter sont protégés. Leur reproduction ou diffusion sans autorisation est interdite."
  },
  {
    title: "9. Responsabilité et garanties",
    content: "Reporter décline toute responsabilité en cas de bug, interruption ou indisponibilité du service, ou de dommages résultant de l'utilisation du site."
  },
  {
    title: "10. Protection des sites Reporter",
    content: "Toute tentative de piratage, d'accès non autorisé ou de perturbation du fonctionnement du service est strictement interdite et fera l'objet de poursuites."
  },
  {
    title: "11. Limitation de responsabilité",
    content: "La responsabilité de Reporter ne saurait être engagée en cas de force majeure, de fait imprévisible ou de faute de l'utilisateur."
  },
  {
    title: "12. Recommandation particulière aux utilisateurs internationaux",
    content: "Les utilisateurs situés en dehors de la France ou de l'Afrique sont responsables de se conformer aux lois locales en matière d'accès et d'utilisation."
  },
  {
    title: "13. Droit de réponse",
    content: "Conformément à la législation en vigueur, toute personne physique ou morale dispose d'un droit de réponse sur les contenus publiés."
  },
  {
    title: "14. Dispositions finales",
    content: "Les présentes CGU sont régies par le droit français. En cas de litige, compétence est attribuée aux tribunaux de Lyon."
  }
];

export default function TermsPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Conditions Générales d’Utilisation</h1>

        {sections.map((section, index) => (
          <div key={index}>
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full text-left text-xl font-semibold py-3 border-b border-gray-300 dark:border-gray-700"
            >
              {section.title}
            </button>
            {open === index && <p className="mt-2 text-gray-700 dark:text-gray-300">{section.content}</p>}
          </div>
        ))}

        <p className="text-sm text-center mt-10">
          <Link href="/legal/privacy" className="underline hover:text-purple-600 transition">
            Consultez aussi notre Politique de confidentialité
          </Link>
        </p>
        <p className="text-center mt-4">
          <Link href="/" className="text-sm underline text-purple-600 hover:text-purple-400 transition">Retour à l'accueil</Link>
        </p>
      </div>
    </div>
  );
}