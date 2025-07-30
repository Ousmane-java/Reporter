"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PublishForm from "@/components/admin/PublishForm";

export default function AdminPublishPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin");

    if (!stored) {
      router.push("/admin/login?redirect=/admin/publish");
    } else {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login?redirect=/admin/publish");
        }
      } catch {
        router.push("/admin/login?redirect=/admin/publish");
      }
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return <p className="text-center text-gray-400 mt-10">Chargement...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Publier un contenu</h1>
      {isAuthenticated ? <PublishForm /> : null}
    </div>
  );
}
