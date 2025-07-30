# 📺 Reporter – Plateforme d’investigation en streaming

> **Status** : 🚧 Projet en cours de développement – V1.0 en préparation

## 🧠 À propos

**Reporter** est une plateforme de streaming indépendante dédiée à l'investigation, à l'information citoyenne et aux contenus sociétaux. Inspirée de Netflix, France.tv ou BrutX, elle permet la **diffusion de documentaires, d’émissions en direct**, et la **publication d’articles techniques** à forte valeur ajoutée grâce à l’intelligence artificielle.

Ce projet est né de la volonté de proposer une **alternative indépendante et intelligente** dans le paysage numérique, en mettant en avant l’investigation, l’analyse critique et la technologie.

---

## 🎯 Objectifs du projet

- Développer une plateforme de streaming indépendante (documentaires, émissions en direct).
- Permettre la gestion de contenu par un espace administrateur sécurisé.
- Intégrer une rubrique **Articles** alimentée automatiquement par un système de veille et de résumé IA.
- Offrir une interface utilisateur claire, moderne, responsive et agréable.
- Mettre en avant les contenus pertinents via un système "À la une".
- Fournir un système de filtrage intelligent (catégorie, date, popularité).

---

## ⚙️ Stack technique

| Côté | Technologie | Usage |
|------|-------------|-------|
| **Frontend utilisateur** | [Next.js](https://nextjs.org/) 15 (App Router) | Interface publique du site |
| | Tailwind CSS | UI design responsive |
| | Cloudinary | Hébergement des vidéos et images |
| | Vercel (prod) / Local dev | Déploiement (temporaire ou final) |
| **Admin (Backoffice)** | Next.js 15 (App Router) | Interface d’administration |
| | Prisma ORM | Accès à la base PostgreSQL |
| | PostgreSQL | Base de données principale |
| | NextAuth.js | Authentification sécurisée des administrateurs |
| **Backend IA (à venir)** | FastAPI ou Express | Scraping & résumé automatique d'articles |
| | OpenAI GPT-4 | Résumé et classification des articles |

---

## 📁 Architecture du projet

reporter-project/
│
├── admin/ # Interface d'administration (Next.js)
│ └── src/app/
│ ├── admin/publish # Page de publication
│ ├── api/
│ │ ├── admin/publish/route.ts
│ │ └── auth/[...nextauth]/route.ts
│
├── frontend/ # Interface utilisateur (Next.js)
│ └── app/
│ ├── page.tsx # Accueil
│ ├── articles/ # Articles IA
│ ├── direct/ # Émissions en direct
│ └── api/content/featured/route.ts
│
├── database/ # Schéma Prisma + config PostgreSQL
├── README.md
└── ...



---

## 🔒 Fonctionnalités principales

### ✅ Déjà implémentées

- [x] Interface utilisateur publique responsive avec page d’accueil, catégories, moteur de recherche (à venir).
- [x] Authentification admin via NextAuth + stockage sécurisé en base.
- [x] Formulaire de publication de contenus (titre, description, vidéo, miniature, catégorie, mise en avant).
- [x] Upload automatique vers Cloudinary.
- [x] Affichage des vidéos mises en avant côté utilisateur (`/api/content/featured`).
- [x] Architecture séparée : **admin** ↔ **frontend** avec appels API croisés.

---

## 📈 Avancement actuel

| Module                      | État        | Détails |
|----------------------------|-------------|---------|
| Frontend public            | ✅ OK       | Design responsive, sections dynamiques |
| Admin – Auth & publication | ✅ OK       | Fonctionnelle avec Cloudinary |
| Upload Cloudinary          | ✅ OK       | Vidéo + image, via preset `reporter_upload` |
| Stockage PostgreSQL        | ✅ OK       | Prisma + schéma fonctionnel |
| API de contenu à la une    | ✅ OK       | `/api/content/featured` |
| Scraping & Articles IA     | 🟡 En cours | Scraper fonctionnel, IA à intégrer |
| Statistiques admin         | 🔜 À faire  | Page d’analyse avancée (graphes, vues, partages...) |
| Recherche & tri            | 🔜 À faire  | Filtres + recherche plein texte |
| Player vidéo amélioré      | 🔜 À faire  | Composant custom, streaming optimisé |

---

## 🔮 Prochaines étapes & perspectives

- 🚀 **Ajout des statistiques d’analyse (Admin)** : vues, likes, partages, par contenu.
- 🤖 **Module IA d’articles** : scraping de sources tech, résumé via OpenAI, affichage dynamique.
- 📱 **Application mobile (React Native)** : version iOS / Android de la plateforme.
- 🛡 **Monitoring & sécurité** : mise en place de tests automatiques, rate limiting, journalisation.
- 🌍 **Déploiement complet** : via Docker + CI/CD sur Render, Railway ou un VPS auto-hébergé.
- 🔗 **Social sharing** : intégration des boutons Partager (WhatsApp, Facebook, X, LinkedIn).
- 🎥 **Lecture en direct (streaming live)** : intégration de flux RTMP/HLS pour les directs.

---

## 👤 Auteur

**Ousmane Drame**  
📍 Lyon – Étudiant en développement fullstack web et mobile à l’EPSI. 
🎯 Passionné par le développement fullstack et les projets tech éthiques.

> 📫 Contact :contact@ousmanedrame.com 
> 🌐 Portfolio : https://www.ousmanedrame.com

---

## 📄 Licence

Ce projet est en cours de développement et non encore open-source. Une licence MIT ou Creative Commons pourra être ajoutée lors de la version stable.
