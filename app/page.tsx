"use client"

import ChildSelector from "./components/form/ChildSelector"
import EnfantForm from "./components/form/EnfantForm"
import ParentSection from "./components/form/ParentSection"
import { useFormStore } from "./state/useFormStore"


export default function InscriptionPage() {
  const parent = useFormStore((state) => state.parent)
  const enfants = useFormStore((state) => state.enfants)

  const setParentField = useFormStore((state) => state.setParentField)
  const setNombreEnfants = useFormStore((state) => state.setNombreEnfants)
  const updateEnfantField = useFormStore((state) => state.updateEnfantField)

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <ParentSection parentData={parent} onChange={setParentField} />

      <ChildSelector value={enfants.length} onChange={setNombreEnfants} />

      {enfants.map((enfant, index) => (
        <EnfantForm
          key={index}
          index={index}
          enfantData={enfant}
          onChange={updateEnfantField}
        />
      ))}

      <div className="bg-gray-100 p-4 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold">📦 Debug (State actuel)</h2>
        <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
          {JSON.stringify({ parent, enfants }, null, 2)}
        </pre>
      </div>
    </div>
  )
}
