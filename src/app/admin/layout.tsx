import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Administration - SenCamCong",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-50 bg-black border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/admin" className="flex items-center gap-2 min-w-0">
            <div className="flex gap-1 flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <span className="text-white font-bold text-base sm:text-lg truncate">
              Admin SenCamCong
            </span>
          </Link>
          <Link
            href="/api/admin/logout"
            className="text-sm text-gray-400 hover:text-white transition-colors flex-shrink-0"
          >
            Déconnexion
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 pb-24 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}