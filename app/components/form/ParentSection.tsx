"use client"

import Input from "../ui/Input"
import type { ParentInfo, ParentRole } from "../../state/useFormStore"

interface Props {
  parentData: {
    pere: ParentInfo
    mere: ParentInfo
  }
  onChange: (role: ParentRole, field: keyof ParentInfo, value: string) => void
}


export default function ParentSection({ parentData, onChange }: Props) {
  const handleFieldChange = (
    role: ParentRole,
    field: keyof ParentInfo,
    value: string
  ) => {
    onChange(role, field, value)
  }
  

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Informations des parents</h2>

      {/* Père */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Père</h3>

        <Input id="pere_nom_prenom" label="Nom et prénom" value={parentData.pere.nom_prenom} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "nom_prenom", e.target.value)} />
        <Input id="pere_tel" label="Téléphone" type="tel" value={parentData.pere.telephone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "telephone", e.target.value)} />
        <Input id="pere_email" label="Adresse mail" type="email" value={parentData.pere.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "email", e.target.value)} />
        <Input id="pere_profession" label="Profession" value={parentData.pere.profession} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "profession", e.target.value)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Input id="pere_num_rue" label="N° rue" value={parentData.pere.numero_rue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "numero_rue", e.target.value)} />
          <Input id="pere_nom_rue" label="Nom de rue" value={parentData.pere.nom_rue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "nom_rue", e.target.value)} />
          <Input id="pere_code_postal" label="Code postal" value={parentData.pere.code_postal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "code_postal", e.target.value)} />
          <Input id="pere_ville" label="Ville" value={parentData.pere.ville} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "ville", e.target.value)} />
        </div>
      </div>

      {/* Mère */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mère</h3>

        <Input id="mere_nom_prenom" label="Nom et prénom" value={parentData.mere.nom_prenom} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "nom_prenom", e.target.value)} />
        <Input id="mere_tel" label="Téléphone" type="tel" value={parentData.mere.telephone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "telephone", e.target.value)} />
        <Input id="mere_email" label="Adresse mail" type="email" value={parentData.mere.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "email", e.target.value)} />
        <Input id="mere_profession" label="Profession" value={parentData.mere.profession} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "profession", e.target.value)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Input id="mere_num_rue" label="N° rue" value={parentData.mere.numero_rue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "numero_rue", e.target.value)} />
          <Input id="mere_nom_rue" label="Nom de rue" value={parentData.mere.nom_rue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "nom_rue", e.target.value)} />
          <Input id="mere_code_postal" label="Code postal" value={parentData.mere.code_postal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "code_postal", e.target.value)} />
          <Input id="mere_ville" label="Ville" value={parentData.mere.ville} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "ville", e.target.value)} />
        </div>
      </div>
    </div>
  )
}
