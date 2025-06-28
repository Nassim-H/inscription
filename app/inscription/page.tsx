"use client"

import { useMemo, useState } from "react"
import ChildSelector from "../components/form/ChildSelector"
import EnfantForm from "../components/form/EnfantForm"
import ParentSection from "../components/form/ParentSection"
import { getMontantCours } from "../components/GetMontant"
import { useFormStore } from "../state/useFormStore"
import FicheAdminForm from "../components/form/FicheAdminForm"
import ReglementModal from "../components/form/ReglementModal"

import { submintInscri } from "@/lib/submitInscri"
import ProgressBarForm from "../components/ui/ProgressBarForm"
import { getFormStepProgress } from "@/lib/getFormStep"

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
    //   const enfantsWithUploads = await Promise.all(
    //     enfants.map(async (enfant, index) => {
    //       if (enfant.justificatif_file) {
    //         const filePath = `justificatifs/assurance_${parent.pere.nom_prenom}_${enfant.nom}_${index + 1}.pdf`
    //         const { error } = await supabase.storage
    //           .from("justificatifs")
    //           .upload(filePath, enfant.justificatif_file, {
    //             cacheControl: "3600",
    //             upsert: true,
    //           })
    //         if (error) throw error

    //         const { data } = supabase.storage.from("justificatifs").getPublicUrl(filePath)
    //         return {
    //           ...enfant,
    //           justificatif_url: data.publicUrl,
    //           justificatifFile: undefined,
    //         }
    //       }
    //       return enfant
    //     })
    //   )

      await submintInscri({
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


const { currentStep, totalSteps } = getFormStepProgress({
  parent,
  enfants,
  ficheAdmin,
  reglementLu
})


  return (
<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 space-y-10">

  

      <div className="max-w-4xl mx-auto p-8 space-y-8 sticky">
  {/* Barre de progression sticky */}
  <ProgressBarForm
    currentStep={currentStep}
    totalSteps={totalSteps}
    labels={[
      "Parent",
      ...enfants.map((_, i) => `Enfant ${i + 1}`),
      "Fiche admin",
      "Règlement",
    ]}
  />
<div className="max-w-4xl mx-auto px-4 pt-4">
  <div className="flex items-center justify-start mb-6">
    <img src="/logoamab.png" alt="Logo association" className="h-16 w-auto" />
  </div>
</div>
  {/* ➤ Section parent */}
    <ParentSection parentData={parent} onChange={setParentField} />

  {/* ➤ Sélecteur */}
  <div className="border-t pt-6 mt-6">
    <ChildSelector value={enfants.length} onChange={setNombreEnfants} />
  </div>

  {/* ➤ Enfants dynamiques */}
  {enfants.map((enfant, index) => (
    <div key={index} className="border-t pt-6 mt-6">
      <EnfantForm
        index={index}
        enfantData={enfant}
        onChange={updateEnfantField}
      />
    </div>
  ))}

  {/* ➤ Total */}
  <div className="text-right text-xl font-bold text-green-700 border-t pt-6 mt-6">
    Total à payer : {total} €
  </div>

  {/* ➤ Fiche admin */}
  <div className="border-t pt-6 mt-6">
    <FicheAdminForm />
  </div>

  {/* ➤ Règlement */}
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

  {/* ➤ Bouton final */}
  <div className="border-t pt-6 mt-6 space-y-4">
    <button
      onClick={handleSubmit}
      disabled={loading || !reglementLu}
              className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl shadow disabled:opacity-50 w-full sm:w-auto"
    >
      {loading ? "Envoi en cours..." : "Envoyer l'inscription"}
    </button>

    {message && <p className="text-center text-sm">{message}</p>}
  </div>

  <ReglementModal
    isOpen={modalOpen}
    onClose={() => setModalOpen(false)}
    onAcceptScroll={() => setScrollOk(true)}
  />
</div>
    </div>
  )
}
