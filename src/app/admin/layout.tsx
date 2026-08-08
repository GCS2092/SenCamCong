import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Administration - SenCamCong",
};

// Layout dédié à toutes les pages /admin/*.
// Volontairement séparé du layout public : pas de <Navigation />,
// pas de menu bottom mobile du site public, style plus neutre
// pour se concentrer sur la saisie de contenu.
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-50 bg-black border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <span className="text-white font-bold text-lg">
              Admin SenCamCong
            </span>
          </Link>
          <Link
            href="/api/admin/logout"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Déconnexion
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 pb-24">{children}</main>
    </div>
  );
}