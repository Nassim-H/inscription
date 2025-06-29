"use client"

import { useFormStore } from "@/app/state/useFormStore"
import Input from "../ui/Input"
import Label from "../ui/Label"
import { UploadCloud } from "lucide-react"
import Select from "../ui/Select"
import { CheckboxItem } from "../ui/Checkbox"
import FormSection from "./FormSection"
import { useState } from "react"

export default function FicheAdminForm() {
  const ficheAdmin = useFormStore((state) => state.ficheAdmin)
  const setField = useFormStore((state) => state.setFicheAdminField)
  const addPersonneAutorisee = useFormStore((state) => state.addPersonneAutorisee)
  const updatePersonneAutorisee = useFormStore((state) => state.updatePersonneAutorisee)

  const situationOptions = [
  { label: "Mariés", value: "maries" },
  { label: "Divorcés", value: "divorces" },
  { label: "Veuf(ve)", value: "veuf" },
  { label: "Célibataire", value: "celibataire" },
]
const [copied, setCopied] = useState(false)
  const iban = "FR7610278026190002041170192"

  const handleCopy = () => {
    navigator.clipboard.writeText(iban)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <FormSection title="Fiche complémentaire (Administration)">
    <div className="space-y-6 p-6 rounded-xl">

      {/* Situation familiale */}
      <div className="space-y-2">
        <Label htmlFor="situation">Situation familiale</Label>
        <Select
          id="situation"
          required
          value={ficheAdmin.situationFamiliale}
          onChange={(e) => setField("situationFamiliale", e.target.value)}
          className="w-full border p-2 rounded" options={ situationOptions}        >
          
        </Select>
      </div>

      {/* Personne à prévenir */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          id="urgenceNom"
          label="Nom personne à prévenir (urgence)"
          required
          value={ficheAdmin.urgenceNom}
          onChange={(e) => setField("urgenceNom", e.target.value)}
        />
        <Input
          id="urgenceTel"
          label="Téléphone"
          required
          value={ficheAdmin.urgenceTel}
          onChange={(e) => setField("urgenceTel", e.target.value)}
        />
        <Input
          id="urgenceLien"
          label="Lien avec l’enfant"
          required
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
      <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">Autorisations parentales</h3>
      {[
        { key: "autorisationSecours", label: "Contacter les secours en cas d’accident" },
        { key: "autorisationSoins", label: "Prise de décision de soins / hospitalisation" },
        { key: "autorisationSortieSeule", label: "Sortie seule de l’établissement" },
        { key: "autorisationTransport", label: "Transport par les bénévoles" },
        { key: "autorisationPhotoInterne", label: "Photo usage interne" },
        { key: "autorisationPhotoReseaux", label: "Publication photo sur réseaux" },
        { key: "autorisationPhotoVisageApparent", label: "Visage apparent sur les photos" },
      ].map(({ key, label }) => (
        <CheckboxItem
          key={key}
          id={key}
          label={label}
          checked={ficheAdmin[key as keyof typeof ficheAdmin] as boolean}
          onChange={(checked) => setField(key as keyof typeof ficheAdmin, checked)}
        />
      ))}
    </div>

      {/* Mode de paiement */}
      <div className="space-y-2">

<div className="space-y-2">
  <Label htmlFor="modePaiement">Mode de paiement</Label>
  <div className="flex flex-col gap-2">
    {[
      { label: "Espèces chez Faraj", value: "Espèces" },
      { label: "Virement bancaire", value: "Virement" },
    ].map(({ label, value }) => (
      <label key={value} className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          name="modePaiement"
          required
          value={value}
          checked={ficheAdmin.modePaiement === value}
          onChange={() => setField("modePaiement", value)}
          className="accent-blue-600"
        />
        {label}
      </label>
    ))}
  </div>
</div>


      </div>

      {/* Affichage dynamique selon mode de paiement */}
      {ficheAdmin.modePaiement === "Espèces" && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          💬 Merci de vous présenter auprès de <strong>Farag</strong> pour régler en espèces.
        </div>
      )}

      {ficheAdmin.modePaiement === "Virement" && (
<div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="text-sm">
            <p className="mb-1">🏦 Merci d’effectuer le virement sur le compte indiqué :</p>
            <div className="font-mono px-2 py-1 rounded border select-all text-sm break-all">
              {iban}
            </div>
          </div>

          <button
            onClick={handleCopy}
              className="bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow disabled:opacity-50 w-full sm:w-auto"
          >
            {copied ? "✔️ Copié" : "Copier"}
          </button>
        </div>


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
    </FormSection>
  )
}
