"use client"

import { useFormStore } from "@/app/state/useFormStore"
import Input from "../ui/Input"
import Label from "../ui/Label"
import { useState } from "react"
import { UploadCloud } from "lucide-react"

export default function FicheAdminForm() {
  const ficheAdmin = useFormStore((state) => state.ficheAdmin)
  const setField = useFormStore((state) => state.setFicheAdminField)
  const addPersonneAutorisee = useFormStore((state) => state.addPersonneAutorisee)
  const updatePersonneAutorisee = useFormStore((state) => state.updatePersonneAutorisee)

  const [preuveVirement, setPreuveVirement] = useState<File | null>(null)

  return (
    <div className="space-y-6 border p-6 rounded-xl">
      <h2 className="text-xl font-bold">Fiche complémentaire (Administration)</h2>

      {/* Situation familiale */}
      <div className="space-y-2">
        <Label htmlFor="situation">Situation familiale</Label>
        <select
          id="situation"
          value={ficheAdmin.situationFamiliale}
          onChange={(e) => setField("situationFamiliale", e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Choisir --</option>
          <option value="maries">Mariés</option>
          <option value="divorces">Divorcés</option>
          <option value="veuf">Veuf(ve)</option>
          <option value="celibataire">Célibataire</option>
        </select>
      </div>

      {/* Personne à prévenir */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          id="urgenceNom"
          label="Nom personne à prévenir (urgence)"
          value={ficheAdmin.urgenceNom}
          onChange={(e) => setField("urgenceNom", e.target.value)}
        />
        <Input
          id="urgenceTel"
          label="Téléphone"
          value={ficheAdmin.urgenceTel}
          onChange={(e) => setField("urgenceTel", e.target.value)}
        />
        <Input
          id="urgenceLien"
          label="Lien avec l’enfant"
          value={ficheAdmin.urgenceLien}
          onChange={(e) => setField("urgenceLien", e.target.value)}
        />
      </div>

      {/* Personnes autorisées */}
      <div className="space-y-2">
        <h3 className="font-semibold">Personnes autorisées à venir chercher l’enfant</h3>
        {ficheAdmin.personnesAutorisees.map((p, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id={`personne-nom-${i}`}
              label="Nom"
              value={p.nom}
              onChange={(e) => updatePersonneAutorisee(i, "nom", e.target.value)}
            />
            <Input
              id={`personne-telephone-${i}`}
              label="Téléphone"
              value={p.telephone}
              onChange={(e) => updatePersonneAutorisee(i, "telephone", e.target.value)}
            />
            <Input
              id={`personne-lien-${i}`}
              label="Lien avec l'enfant"
              value={p.lien}
              onChange={(e) => updatePersonneAutorisee(i, "lien", e.target.value)}
            />
          </div>
        ))}
        <button
          onClick={addPersonneAutorisee}
          type="button"
          className="text-sm text-blue-600 underline mt-2"
        >
          ➕ Ajouter une personne
        </button>
      </div>

      {/* Autorisations */}
      <div className="space-y-2">
        <h3 className="font-semibold">Autorisations parentales</h3>
        {[
          { key: "autorisationSecours", label: "Contacter les secours en cas d’accident" },
          { key: "autorisationSoins", label: "Prise de décision de soins / hospitalisation" },
          { key: "autorisationSortieSeule", label: "Sortie seule de l’établissement" },
          { key: "autorisationTransport", label: "Transport par les bénévoles" },
          { key: "autorisationPhotoInterne", label: "Photo usage interne" },
          { key: "autorisationPhotoReseaux", label: "Publication photo sur réseaux" },
          { key: "autorisationPhotoVisageApparent", label: "Visage apparent sur les photos" },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={key}
              checked={ficheAdmin[key as keyof typeof ficheAdmin] as boolean}
              onChange={(e) => setField(key as keyof typeof ficheAdmin, e.target.checked)}
            />
            <label htmlFor={key} className="text-sm">{label}</label>
          </div>
        ))}
      </div>

      {/* Mode de paiement */}
      <div className="space-y-2">
        <label className="font-semibold text-sm">💳 Mode de paiement</label>
        <select
          value={ficheAdmin.modePaiement || ""}
          onChange={(e) => setField("modePaiement", e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Sélectionner --</option>
          <option value="Espèces">Espèces chez Faraj</option>
          <option value="Virement">Virement bancaire</option>
        </select>
      </div>

      {/* Affichage dynamique selon mode de paiement */}
      {ficheAdmin.modePaiement === "Espèces" && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          💬 Merci de vous présenter auprès de <strong>Faraj</strong> pour régler en espèces.
        </div>
      )}

      {ficheAdmin.modePaiement === "Virement" && (
  <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded space-y-4">
    <p>🏦 Merci d’effectuer le virement sur le compte indiqué.</p>

    <div>
      <label
        htmlFor="preuve_virement_file"
        className="flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-gray-600 text-center cursor-pointer hover:bg-gray-100 transition"
      >
        <UploadCloud size={32} className="mb-2 text-gray-400" />
        <span className="text-sm font-medium">
          Cliquez pour choisir un fichier de preuve
        </span>

        {ficheAdmin.preuveVirement?.name && (
          <span className="mt-1 text-xs text-gray-500 truncate max-w-full">
            📄 {ficheAdmin.preuveVirement.name}
          </span>
        )}
      </label>

      <input
        id="preuve_virement_file"
        type="file"
        accept="application/pdf,image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            setField("preuveVirement", file)
          }
        }}
      />
    </div>
  </div>
      )}
    </div>
  )
}
