"use client"

import { useEffect } from "react"
import { getMontantCours } from "../GetMontant"
import Input from "../ui/Input"
import Label from "../ui/Label"
import CoursSelector from "./CourSelector"
import { Enfant } from "../../state/useFormStore"

interface EnfantFormProps {
  index: number
  enfantData: Enfant
  onChange: (index: number, field: keyof Enfant, value: any) => void
}

export default function EnfantForm({ index, enfantData, onChange }: EnfantFormProps) {
  const handleFieldChange = (field: keyof Enfant, value: any) => {
    onChange(index, field, value)
  }
  const bindText = (field: keyof Enfant) => 
  (e: React.ChangeEvent<HTMLInputElement>) => 
    handleFieldChange(field, e.target.value)


  useEffect(() => {
  const montant = getMontantCours(enfantData.cours || [])
  if (montant !== enfantData.montant) {
    onChange(index, "montant", montant)
  }
}, [enfantData.cours])




  return (
    <div className="space-y-4 border p-4 rounded-xl mb-6">
      <h3 className="text-lg font-semibold">Enfant {index + 1}</h3>

      <Input id={`nom_${index}`} label="Nom" value={enfantData.nom} onChange={bindText("nom")} required />
      <Input id={`prenom_${index}`} label="Prénom" value={enfantData.prenom} onChange={bindText("nom")} required />

      <div>
        <Label htmlFor={`genre_${index}`}>Fille / Garçon</Label>
        <select
          id={`genre_${index}`}
          value={enfantData.genre}
          onChange={(e) => handleFieldChange("genre", e.target.value)}
          required
          className="w-full border rounded p-2"
        >
          <option value="">-- Sélectionner --</option>
          <option value="Fille">Fille</option>
          <option value="Garçon">Garçon</option>
        </select>
      </div>

      <Input id={`age_${index}`} label="Âge" type="number" value={enfantData.age ?? ""} onChange={bindText("age")} required className="w-24" />
      <Input id={`date_naissance_${index}`} label="Date de naissance" type="date" value={enfantData.date_naissance ?? ""} onChange={bindText("date_naissance")} />
      <Input id={`lieu_naissance_${index}`} label="Lieu de naissance" value={enfantData.lieu_naissance ?? ""} onChange={bindText("lieu_naissance")} />
      <Input id={`ecole_${index}`} label="École fréquentée (2024/2025)" value={enfantData.ecole ?? ""} onChange={bindText("ecole")} />
      <Input id={`classe_${index}`} label="Classe" value={enfantData.classe} onChange={bindText("classe")} />
      <Input id={`interets_${index}`} label="Centres d’intérêts" value={enfantData.interets} onChange={bindText("nom")} />
      <Input id={`extrascolaires_${index}`} label="Activités extra-scolaires" value={enfantData.extrascolaires} onChange={bindText("extrascolaires")}/>
      <Input id={`maladies_${index}`} label="Maladies / Allergies" value={enfantData.maladies} onChange={bindText("maladies")} />
      <Input id={`traitements_${index}`} label="Traitements" value={enfantData.traitements} onChange={bindText("traitements")} />

      <div>
        <Label htmlFor={`observations_${index}`}>Observations à préciser (handicap, accompagnement…)</Label>
        <textarea
          id={`observations_${index}`}
          value={enfantData.observations}
          onChange={(e) => handleFieldChange("observations", e.target.value)}
          className="w-full border rounded p-2"
          rows={3}
        />
      </div>
      <div className="flex items-center gap-2">
  <input
    type="checkbox"
    id={`sortie_seule_${index}`}
    checked={enfantData.sortieSeul}
    onChange={(e) => handleFieldChange("sortieSeul", e.target.checked)}
  />
  <label htmlFor={`sortie_seule_${index}`}>
    Autorise à sortir seul ?
  </label>
</div>

      <CoursSelector
        index={index}
        selected={enfantData.cours || []}
        onChange={(value) => handleFieldChange("cours", value)}
        />
        <div className="text-right font-semibold text-green-700">
        Prix pour cet enfant : {getMontantCours(enfantData.cours)} €
        </div>
        <p className="text-sm text-blue-500">
  💸 Montant calculé : {enfantData.montant} €
</p>

    </div>
    
  )
}
