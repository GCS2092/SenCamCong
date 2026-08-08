"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Page de connexion admin.
// ⚠️ ÉTAPE FRONTEND UNIQUEMENT : le fetch vers /api/admin/login
// pointe vers une route qui n'existe pas encore. C'est normal,
// elle sera créée à l'étape backend (middleware + cookie de session).
export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Mot de passe incorrect.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Impossible de se connecter. Vérifiez votre connexion.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-10 h-1 bg-green-500 rounded-full"></div>
          <div className="w-10 h-1 bg-yellow-500 rounded-full"></div>
          <div className="w-10 h-1 bg-red-500 rounded-full"></div>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-1">
          Administration
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          SenCamCong
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
        >
          <label
            htmlFor="password"
            className="block text-sm text-gray-400 mb-2"
          >
            Code d&apos;accès
          </label>
          <input
            id="password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-lg tracking-widest focus:outline-none focus:border-green-500 transition-colors"
            placeholder="••••••••"
          />

          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || password.length === 0}
            className="w-full mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}