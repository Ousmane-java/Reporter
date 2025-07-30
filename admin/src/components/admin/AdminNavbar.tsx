"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAdminEmail(parsed.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Publier un contenu", href: "/admin/publish" },
    { name: "Analyse", href: "/admin/analytics" },
  ];

  return (
    <header className="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/admin" className="text-2xl font-bold text-purple-500">
          Reporter
        </Link>

        <nav className="flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-purple-400 transition font-medium ${
                pathname === item.href ? "text-purple-400" : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {adminEmail ? (
            <>
              <span className="text-sm text-purple-300">{adminEmail}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <Link
              href="/admin/login"
              className={`hover:text-purple-400 transition font-medium ${
                pathname === "/admin/login" ? "text-purple-400" : "text-white"
              }`}
            >
              Se connecter
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
