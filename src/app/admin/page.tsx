import Link from "next/link";
import { Music, Users, Camera } from "lucide-react";

// Tableau de bord admin : gros boutons pensés pour un usage au pouce
// sur téléphone, un lien par type de contenu Sanity géré.
const sections = [
  {
    href: "/admin/concerts",
    label: "Concerts",
    description: "Dates, lieux, billetterie",
    icon: Music,
    color: "hover:border-green-500",
  },
  {
    href: "/admin/membres",
    label: "Membres",
    description: "Profils du groupe",
    icon: Users,
    color: "hover:border-yellow-500",
  },
  {
    href: "/admin/galerie",
    label: "Galerie",
    description: "Photos et backgrounds",
    icon: Camera,
    color: "hover:border-red-500",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Tableau de bord</h1>
      <p className="text-gray-400 mb-8">Gérez le contenu du site</p>

      <div className="grid gap-4">
        {sections.map(({ href, label, description, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 transition-all duration-300 ${color}`}
          >
            <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{label}</h2>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}