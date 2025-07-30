"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function OAuthButtons() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        onClick={() => signIn("google")}
        className="flex items-center justify-center gap-3 border rounded-md py-2 px-4 w-full hover:bg-gray-100"
      >
        <FcGoogle size={20} />
        Continuer avec Google
      </button>
      <button
        onClick={() => signIn("facebook")}
        className="flex items-center justify-center gap-3 border rounded-md py-2 px-4 w-full hover:bg-gray-100"
      >
        <FaFacebook size={20} className="text-blue-600" />
        Continuer avec Facebook
      </button>
    </div>
  );
}
