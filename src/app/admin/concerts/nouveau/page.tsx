"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

// Formulaire d'ajout de concert.
// Les champs reprennent EXACTEMENT ceux de src/sanity/schemas/concert.ts
// pour garantir que ce qui est saisi ici correspond à ce qui apparaît
// dans Sanity Studio.
//
// ⚠️ ÉTAPE FRONTEND UNIQUEMENT : le fetch vers /api/admin/concerts
// n'existe pas encore. Il sera créé à l'étape backend, avec le
// SANITY_API_WRITE_TOKEN utilisé côté serveur uniquement.

type ProgrammeItem = { heure: string; activite: string };

const STATUTS = [
  { value: "a-venir", label: "À venir" },
  { value: "passe", label: "Passé" },
  { value: "complet", label: "Complet" },
];

export default function NouveauConcertPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [titre, setTitre] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [lieu, setLieu] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionLongue, setDescriptionLongue] = useState("");
  const [lienTickets, setLienTickets] = useState("");
  const [statut, setStatut] = useState("a-venir");
  const [prixFcfa, setPrixFcfa] = useState("");
  const [affiche, setAffiche] = useState<File | null>(null);
  const [programme, setProgramme] = useState<ProgrammeItem[]>([]);

  function addProgrammeItem() {
    setProgramme([...programme, { heure: "", activite: "" }]);
  }

  function updateProgrammeItem(
    index: number,
    field: keyof ProgrammeItem,
    value: string
  ) {
    const next = [...programme];
    next[index] = { ...next[index], [field]: value };
    setProgramme(next);
  }

  function removeProgrammeItem(index: number) {
    setProgramme(programme.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("titre", titre);
      formData.append("date", date);
      formData.append("heure", heure);
      formData.append("lieu", lieu);
      formData.append("adresse", adresse);
      formData.append("ville", ville);
      formData.append("description", description);
      formData.append("descriptionLongue", descriptionLongue);
      formData.append("lienTickets", lienTickets);
      formData.append("statut", statut);
      formData.append("prixFcfa", prixFcfa);
      formData.append("programme", JSON.stringify(programme));
      if (affiche) formData.append("affiche", affiche);

      const res = await fetch("/api/admin/concerts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setError("Erreur lors de l'enregistrement. Réessayez.");
        setLoading(false);
        return;
      }

      router.push("/admin/concerts");
    } catch {
      setError("Erreur réseau. Vérifiez votre connexion.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors";
  const labelClass = "block text-sm text-gray-400 mb-2";

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Nouveau concert</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Titre *</label>
          <input
            required
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Date *</label>
            <input
              required
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Heure</label>
            <input
              placeholder="Ex: 20h00"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Lieu *</label>
          <input
            required
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Adresse</label>
          <input
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Ville *</label>
          <input
            required
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Description courte</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Description longue</label>
          <textarea
            rows={4}
            value={descriptionLongue}
            onChange={(e) => setDescriptionLongue(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Affiche</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAffiche(e.target.files?.[0] ?? null)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Lien billetterie</label>
          <input
            type="url"
            placeholder="https://..."
            value={lienTickets}
            onChange={(e) => setLienTickets(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Statut</label>
            <select
              value={statut}
              onChange={(e) => setStatut(e.target.value)}
              className={inputClass}
            >
              {STATUTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Prix (FCFA) *</label>
            <input
              required
              type="number"
              min={0}
              value={prixFcfa}
              onChange={(e) => setPrixFcfa(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelClass}>Programme</label>
            <button
              type="button"
              onClick={addProgrammeItem}
              className="flex items-center gap-1 text-sm text-green-500 hover:text-green-400"
            >
              <Plus className="w-4 h-4" />
              Ajouter une ligne
            </button>
          </div>

          <div className="space-y-3">
            {programme.map((item, index) => (
              <div key={index} className="flex gap-2 min-w-0">
                <input
                  placeholder="Heure"
                  value={item.heure}
                  onChange={(e) =>
                    updateProgrammeItem(index, "heure", e.target.value)
                  }
                  className={`${inputClass} w-24`}
                />
                <input
                  placeholder="Activité"
                  value={item.activite}
                  onChange={(e) =>
                    updateProgrammeItem(index, "activite", e.target.value)
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeProgrammeItem(index)}
                  className="flex-shrink-0 text-red-500 hover:text-red-400 px-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 disabled:opacity-40"
        >
          {loading ? "Enregistrement..." : "Enregistrer le concert"}
        </button>
      </form>
    </div>
  );
}