export async function adminLogin(email: string, password: string) {
    const res = await fetch("http://localhost:3000/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur de connexion");
  
    return data;
  }
  