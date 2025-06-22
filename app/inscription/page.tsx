"use client"

import { useState } from "react"
import { submitInscription } from "@/lib/submitInscription"
import ChildSelector from "../components/form/ChildSelector"
import EnfantForm from "../components/form/EnfantForm"
import ParentSection from "../components/form/ParentSection"
import { getMontantCours } from "../components/GetMontant"
import { useFormStore } from "../state/useFormStore"
import FicheAdminForm from "../components/form/FicheAdminForm"
import ReglementModal from "../components/form/ReglementModal"

export default function InscriptionPage() {
  const parent = useFormStore((state) => state.parent)
  const enfants = useFormStore((state) => state.enfants)
  const ficheAdmin = useFormStore((state) => state.ficheAdmin)
  const reglementLu = useFormStore((state) => state.reglementLu)
  const setReglementLu = useFormStore((state) => state.setReglementLu)

  const setParentField = useFormStore((state) => state.setParentField)
  const setNombreEnfants = useFormStore((state) => state.setNombreEnfants)
  const updateEnfantField = useFormStore((state) => state.updateEnfantField)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [scrollOk, setScrollOk] = useState(false)

  const total = enfants.reduce(
    (sum, enfant) => sum + getMontantCours(enfant.cours),
    0
  )

  const handleSubmit = async () => {
    setLoading(true)
    setMessage("")

    try {
      await submitInscription({
        parent,
        enfants,
        montant_total: total,
        ficheAdmin,
        date: new Date().toISOString(),
      })

      setMessage("✅ Inscription envoyée avec succès !")
    } catch (err) {
      console.error(err)
      setMessage("❌ Erreur lors de l'envoi de l'inscription.")
    } finally {
      setLoading(false)
    }
  }

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

      <div className="text-right text-xl font-bold text-green-700">
        Total à payer : {total} €
      </div>

      <FicheAdminForm />

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-bold mb-2"> Règlement intérieur</h3>
        <p className="text-sm mb-4">
          Veuillez lire attentivement le règlement intérieur avant de soumettre votre inscription. Il est important de comprendre les règles et conditions d'inscription.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="text-blue-600 underline text-sm mb-2"
        >
          Lire le règlement
        </button>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="reglementLu"
            checked={reglementLu}
            onChange={(e) => setReglementLu(e.target.checked)}
            disabled={!scrollOk}
          />
          <label htmlFor="reglementLu" className="text-sm">
            J’ai lu et j’accepte le règlement intérieur <strong>(« lu et approuvé »)</strong>
          </label>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !reglementLu}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow disabled:opacity-50"
      >
        {loading ? "Envoi en cours..." : "Envoyer l'inscription"}
      </button>

      {message && <p className="mt-2 text-center">{message}</p>}

  

      <ReglementModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAcceptScroll={() => setScrollOk(true)}
      />
    </div>
  )
}
