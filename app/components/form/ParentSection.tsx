"use client"

import Input from "../ui/Input"
import type { ParentInfo, ParentRole } from "../../state/useFormStore"
import { useState } from "react"
import FormSection from "./FormSection"

interface Props {
  parentData: {
    pere: ParentInfo
    mere: ParentInfo
  }
  onChange: (role: ParentRole, field: keyof ParentInfo, value: string) => void
}


export default function ParentSection({ parentData, onChange }: Props) {
    const [adresseDifferente, setAdresseDifferente] = useState(false)

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
      <FormSection title="Informations du père">
      <div className="space-y-6 px-2">
        <h3 className="text-lg font-semibold">Père</h3>

        <Input id="pere_nom" label="Nom" value={parentData.pere.nom ?? ""} placeholder="Ex : Mifta" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "nom", e.target.value.toUpperCase())} />
        <Input id="pere_prenom" label="Prénom" value={parentData.pere.prenom ?? ""} placeholder="Ex : Malik" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "prenom", e.target.value)} />

        <Input id="pere_tel" label="Téléphone" type="tel" value={parentData.pere.telephone ?? ""} placeholder="Ex : 07 82 52 62 52" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "telephone", e.target.value)} />
        <Input id="pere_email" label="Adresse mail" type="email" value={parentData.pere.email ?? ""} placeholder="Ex : email@gmail.com" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "email", e.target.value)} />
        <Input id="pere_profession" label="Profession" value={parentData.pere.profession ?? ""} placeholder="Ex : Serrurier" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "profession", e.target.value)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
          <Input id="pere_num_rue" label="N° rue" value={parentData.pere.numero_rue ?? ""} placeholder="Ex : 12" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "numero_rue", e.target.value)} />
          <Input id="pere_nom_rue" label="Nom de rue" value={parentData.pere.nom_rue ?? ""} placeholder="Ex : Rue des Martyrs" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "nom_rue", e.target.value)} />
          <Input id="pere_code_postal" label="Code postal" value={parentData.pere.code_postal ?? ""} placeholder="Ex : 62700" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "code_postal", e.target.value)} />
          <Input id="pere_ville" label="Ville" value={parentData.pere.ville ?? ""} placeholder="Ex : Bruay-la-buissière" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("pere", "ville", e.target.value)} />
        </div>
      </div>
      </FormSection>

      {/* Mère */}
            <FormSection title="Informations de la mère">
      <div className="space-y-6 px-2">
        <h3 className="text-lg font-semibold">Mère</h3>

        <Input id="mere_nom_" label="Nom" value={parentData.mere.nom} placeholder="Ex : Mifta" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "nom", e.target.value.toUpperCase())} />
        <Input id="mere_prenom" label="Prénom" value={parentData.mere.prenom} placeholder="Ex : Valérie" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "prenom", e.target.value)} />
        <Input id="mere_tel" label="Téléphone" type="tel" value={parentData.mere.telephone}  placeholder="Ex : 06 23 27 54 87" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "telephone", e.target.value)} />
        <Input id="mere_email" label="Adresse mail" type="email" value={parentData.mere.email} placeholder="Ex : email@gmail.com" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "email", e.target.value)} />
        <Input id="mere_profession" label="Profession" value={parentData.mere.profession} placeholder="Ex : Mère au foyer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("mere", "profession", e.target.value)} />

        <div>
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={adresseDifferente}
              onChange={(e) => setAdresseDifferente(e.target.checked)}
            />
            <span>Adresse différente de celle du père</span>
          </label>
        </div>

        {adresseDifferente && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
            <Input
              id="mere_num_rue"
              label="N° rue"
              value={parentData.mere.numero_rue}
              placeholder="Ex : 14"
              onChange={(e) =>
                handleFieldChange("mere", "numero_rue", e.target.value)
              }
            />
            <Input
              id="mere_nom_rue"
              label="Nom de rue"
              placeholder="Ex : Avenue des Fleurs"
              value={parentData.mere.nom_rue}
              onChange={(e) =>
                handleFieldChange("mere", "nom_rue", e.target.value)
              }
            />
            <Input
              id="mere_code_postal"
              label="Code postal"
              placeholder="Ex : 62120"
              value={parentData.mere.code_postal}
              onChange={(e) =>
                handleFieldChange("mere", "code_postal", e.target.value)
              }
            />
            <Input
              id="mere_ville"
              label="Ville"
              placeholder="Ex : Saint-Omer"
              value={parentData.mere.ville}
              onChange={(e) =>
                handleFieldChange("mere", "ville", e.target.value)
              }
            />
          </div>
        )}
      </div>
      </FormSection>

    </div>
  )
}