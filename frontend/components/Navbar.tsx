"use client";

import { useState } from "react";
import { ChevronDown, Search, Menu } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

const categories = [
  { name: "Séries & fictions", color: "bg-red-900" },
  { name: "Documentaires", color: "bg-lime-900" },
  { name: "Cinéma", color: "bg-rose-900" },
  { name: "Société", color: "bg-neutral-800" },
  { name: "Info", color: "bg-gray-700" },
  { name: "Arts & spectacles", color: "bg-orange-900" },
  { name: "Sport", color: "bg-blue-900" },
  { name: "Divertissement", color: "bg-pink-900" },
  { name: "Enfants", color: "bg-purple-900" },
];

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-black text-white px-4 sm:px-6 lg:px-12 py-4">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center gap-6">
          <h1 className="text-xl sm:text-2xl font-bold">🎙️ Reporter</h1>
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1 hover:underline"
              >
                Catégories <ChevronDown size={16} />
              </button>
            </div>
            <Link href="/direct" className="hover:underline">
              Direct
            </Link>
          </div>
        </div>

        {/* Partie droite : Recherche & Auth */}
        <div className="hidden md:flex items-center gap-4">
          <button className="bg-white text-black px-3 py-1 rounded-full flex items-center gap-2 hover:bg-gray-300">
            <Search size={16} /> Rechercher
          </button>

          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-700"
              >
                Bonjour, {session.user.name?.split(" ")[0]}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-40 bg-white border rounded shadow text-black">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Mon compte
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2 hover:bg-gray-700"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black"
              >
                Inscription
              </Link>
            </>
          )}
        </div>

        {/* Menu mobile */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden ml-auto"
        >
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className="hidden md:flex flex-wrap gap-2 mt-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {categories.map((cat) => (
              <span
                key={cat.name}
                className={`${cat.color} text-sm px-3 py-1 rounded cursor-pointer hover:brightness-125`}
              >
                {cat.name}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu mobile */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 flex flex-col gap-4"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat.name}
                  className={`${cat.color} text-sm px-3 py-1 rounded cursor-pointer hover:brightness-125`}
                >
                  {cat.name}
                </span>
              ))}
            </div>

            <Link href="/direct" className="hover:underline">
              Direct
            </Link>

            <div className="flex flex-col gap-2">
              <button className="bg-white text-black px-3 py-1 rounded-full flex items-center gap-2 hover:bg-gray-300 w-fit">
                <Search size={16} /> Rechercher
              </button>
              {session?.user ? (
                <>
                  <Link
                    href="/account"
                    className="bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-700 w-fit"
                  >
                    Mon compte
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-700 w-fit"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-700 w-fit"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/register"
                    className="border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black w-fit"
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
