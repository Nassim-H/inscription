"use client"

import { useEffect, useState } from "react"
import { getMontantCours } from "../GetMontant"
import Input from "../ui/Input"
import Label from "../ui/Label"
import CoursSelector from "./CourSelector"
import { Enfant, getCoursInfos } from "../../state/useFormStore"
import InscriptionCards from "../ui/InscriptionCard"
import { supabase } from "@/lib/supabase"
import { UploadCloud } from "lucide-react"
import RadioGroup from "../ui/RadioGroupe"
import FormSection from "./FormSection"

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

const ageInt = parseInt(enfantData.age || "0")
const coursInfos = getCoursInfos(ageInt)


  useEffect(() => {
  const montant = getMontantCours(enfantData.cours || [])
  if (montant !== enfantData.montant) {
    onChange(index, "montant", montant)
  }
}, [enfantData.cours])




  return (
    <FormSection title={`Informations de l'enfant ${index + 1}`}>
    
    <div className="space-y-4 border p-4 rounded-xl mb-6 ">
      <h3 className="text-lg font-semibold">Enfant {index + 1}</h3>
      <Input id={`nom_${index}`} label="Nom" required placeholder="Ex : Mifta" value={enfantData.nom} onChange={bindText("nom")}  />
      <Input id={`prenom_${index}`} label="Prénom" required placeholder="Ex : Anis" value={enfantData.prenom} onChange={bindText("prenom")} />

      <div>
       <RadioGroup
        id={`genre_${index}`}
        label="Genre"
        value={enfantData.genre ?? ""}
        onChange={(val) => handleFieldChange("genre", val)}
        options={[
          { label: "Fille", value: "Fille" },
          { label: "Garçon", value: "Garçon" },
        ]}
      />

      </div>

      <Input
        id={`age_${index}`}
        label="Âge"
        type="number"
        placeholder="1 - 18 ans"
        value={enfantData.age ?? ""}
        onChange={bindText("age")}
        required
        min={1}
        max={18}
        step={1}
        className="w-full sm:w-32"
      />
      <Input id={`date_naissance_${index}`} label="Date de naissance" required type="date" value={enfantData.date_naissance ?? ""} onChange={bindText("date_naissance")} />
      <Input id={`lieu_naissance_${index}`} label="Lieu de naissance" required placeholder="Ex : Béthune" value={enfantData.lieu_naissance ?? ""} onChange={bindText("lieu_naissance")} />
      <Input id={`ecole_${index}`} label="École fréquentée (2025/2026)" required placeholder="Ex : Collège Jean-Moulin" value={enfantData.ecole ?? ""} onChange={bindText("ecole")} />
      <Input id={`classe_${index}`} label="Classe" placeholder="Ex : 6ème" required value={enfantData.classe} onChange={bindText("classe")} />
      <Input id={`asso_${index}`} label="Association religieuse fréquentée ?" required placeholder="Ex : Oui, mosquée de Abou Bakr Essedik à Roubaix" value={enfantData.asso} onChange={bindText("asso")} />
      <Input id={`interets_${index}`} label="Centres d’intérêts" required value={enfantData.interets} placeholder="Ex : Sport" onChange={bindText("interets")} />
      <Input id={`extrascolaires_${index}`} label="Activités extra-scolaires" required placeholder="Ex : Club de foot" value={enfantData.extrascolaires} onChange={bindText("extrascolaires")}/>
      <Input id={`maladies_${index}`} label="Maladies / Allergies" required value={enfantData.maladies} placeholder="Ex : Allergies aux acariens" onChange={bindText("maladies")} />
      <Input id={`traitements_${index}`} label="Traitements" required value={enfantData.traitements} placeholder="Ex : Asthme" onChange={bindText("traitements")} />

      <div>
        <Label htmlFor={`observations_${index}`}>Observations à préciser (handicap, accompagnement…)</Label>
        <textarea
          id={`observations_${index}`}
          value={enfantData.observations}
          required
          onChange={(e) => handleFieldChange("observations", e.target.value)}
          placeholder="Ex : Handicap moteur léger"
          className="w-full border rounded p-2"
          rows={3}
        />
      </div>
      <div className="flex items-center gap-2">
        
  <input
    type="checkbox"
    id={`sortie_seule_${index}`}
    checked={enfantData.sortieSeul}
    required
    onChange={(e) => handleFieldChange("sortieSeul", e.target.checked)}
  />
  <label htmlFor={`sortie_seule_${index}`}>
    Autorisé à sortir seul ?
  </label>
</div>





<div className="space-y-2 mt-4">
  <label className="block text-sm font-semibold text-gray-800">
    📎 Assurance de l'enfant (PDF ou image)
  </label>

  <label
    htmlFor={`assurance_${enfantData.nom}_${enfantData.prenom}`}
    className="flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-gray-600 text-center cursor-pointer hover:bg-gray-100 transition"
  >
    <UploadCloud size={32} className="mb-2 text-gray-400" />
    <span className="text-sm font-medium">
      Cliquez pour choisir un fichier
    </span>
    {enfantData.justificatif_file?.name && (
      <span className="mt-1 text-xs text-gray-500 truncate max-w-full">
        📄 {enfantData.justificatif_file.name}
      </span>
    )}
  </label>

  <input
    id={`assurance_${enfantData.nom}_${enfantData.prenom}`}
    type="file"
    required
    accept="application/pdf,image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0]
      if (!file) return
      handleFieldChange("justificatif_file", file)
    }}
  />

  {enfantData.justificatif_url && (
    <a
      href={enfantData.justificatif_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-2 text-sm text-blue-600 underline"
    >
      🔍 Voir le justificatif déjà envoyé
    </a>
  )}
</div>






{coursInfos.length > 0 && (
  <div className="bg-gray-50 border border-gray-200 rounded p-4 mt-4 space-y-2">
    <h4 className="font-semibold text-sm text-gray-700">📘 Cours proposés selon l’âge</h4>
    {coursInfos.map((cours, idx) => (
      <div key={idx} className="text-sm text-gray-800">
        <p className="font-medium">{cours.module}</p>
        <ul className="list-disc ml-4">
          {cours.horaires.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
        <p className="text-green-600 font-semibold mt-1">💰 {cours.prix} €</p>
      </div>
    ))}
  </div>
  )}
      <CoursSelector
        index={index}
        selected={enfantData.cours || []}
        onChange={(value: any) => handleFieldChange("cours", value)}
        />
        <div className=" font-semibold text-green-700">
        Prix pour cet enfant : {getMontantCours(enfantData.cours)} €
        </div>
        
    </div>
  </FormSection>
    
  )
}
