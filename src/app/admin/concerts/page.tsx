import Link from "next/link";
import { Plus } from "lucide-react";
import { client } from "@/sanity/client";
import { CONCERTS_QUERY } from "@/sanity/queries";

export default async function AdminConcertsPage() {
  const concerts = await client.fetch(CONCERTS_QUERY);

  const statutLabels: Record<string, string> = {
    "a-venir": "À venir",
    passe: "Passé",
    complet: "Complet",
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-white">Concerts</h1>
        <Link
          href="/admin/concerts/nouveau"
          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 text-sm flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </Link>
      </div>

      {concerts.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          Aucun concert pour le moment.
        </p>
      )}

      <div className="grid gap-3">
        {concerts.map((concert: any) => (
          <Link
            key={concert._id}
            href={`/admin/concerts/${concert._id}`}
            className="flex items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-green-500 transition-all duration-300"
          >
            <div className="min-w-0">
              <h3 className="text-white font-semibold truncate">{concert.titre}</h3>
              <p className="text-gray-400 text-sm truncate">
                {concert.ville} · {new Date(concert.date).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <span className="text-xs uppercase tracking-wider text-gray-500 flex-shrink-0">
              {statutLabels[concert.statut] || concert.statut}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}