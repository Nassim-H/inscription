"use client"

import { useFormStore } from "@/app/state/useFormStore"
import Input from "../ui/Input"
import Label from "../ui/Label"

export default function FicheAdminForm() {
  const ficheAdmin = useFormStore((state) => state.ficheAdmin)
  const setField = useFormStore((state) => state.setFicheAdminField)
  const addPersonneAutorisee = useFormStore((state) => state.addPersonneAutorisee)
  const updatePersonneAutorisee = useFormStore((state) => state.updatePersonneAutorisee)

  return (
    <div className="space-y-6 border p-6 rounded-xl">
      <h2 className="text-xl font-bold">Fiche complémentaire (Administration)</h2>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          id="urgenceNom"
          label="Nom personne à prévenir (urgence)"
          value={ficheAdmin.urgenceNom}
          onChange={(e: { target: { value: any } }) => setField("urgenceNom", e.target.value)}
        />
        <Input
          id="urgenceTel"
          label="Téléphone"
          value={ficheAdmin.urgenceTel}
          onChange={(e: { target: { value: any } }) => setField("urgenceTel", e.target.value)}
        />
        <Input
          id="urgenceLien"
          label="Lien avec l’enfant"
          value={ficheAdmin.urgenceLien}
          onChange={(e: { target: { value: any } }) => setField("urgenceLien", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Personnes autorisées à venir chercher l’enfant</h3>
        {ficheAdmin.personnesAutorisees.map((p, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
                    id={`personne-nom-${i}`}
                    label="Nom"
                    value={p.nom}
                    onChange={(e: { target: { value: string } }) => updatePersonneAutorisee(i, "nom", e.target.value)} />
            <Input
                    id={`personne-telephone-${i}`}
                    label="Téléphone"
                    value={p.telephone}
                    onChange={(e: { target: { value: string } }) => updatePersonneAutorisee(i, "telephone", e.target.value)} />
            <Input
                    id={`personne-lien-${i}`}
                    label="Lien avec l'enfant"
                    value={p.lien}
                    onChange={(e: { target: { value: string } }) => updatePersonneAutorisee(i, "lien", e.target.value)} />
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
    </div>
  )
}
