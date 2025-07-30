"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function UserDropdown({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 font-medium bg-gray-100 rounded hover:bg-gray-200"
      >
        Bonjour, {name.split(" ")[0]}
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 bg-white border rounded shadow">
          <a
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Mon compte
          </a>
          <button
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
