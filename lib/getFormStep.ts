import { ParentInfo, Enfant, FicheAdmin } from "@/app/state/useFormStore"

export function getFormStepProgress({
  parent,
  enfants,
  ficheAdmin,
  reglementLu
}: {
  parent: { pere: ParentInfo, mere: ParentInfo }
  enfants: Enfant[]
  ficheAdmin: FicheAdmin
  reglementLu: boolean
}) {
  let currentStep = 0
  const totalSteps = 2 + enfants.length + 1 // parent + enfants + admin + reglement

  // Étape parent
  const pere = parent.pere
  const mere = parent.mere
  if (pere.nom && mere.prenom && pere.ville) currentStep++

  // Étapes enfants
  const enfantsComplets = enfants.filter((e) =>
    e.nom && e.prenom && e.age && e.classe && e.cours.length > 0
  )
  currentStep += enfantsComplets.length

  // Étape admin
  if (ficheAdmin.urgenceNom && ficheAdmin.urgenceTel && ficheAdmin.modePaiement) {
    currentStep++
  }

  // Étape règlement
  if (reglementLu) {
    currentStep++
  }

  return { currentStep, totalSteps }
}
