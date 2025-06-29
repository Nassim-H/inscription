export async function submintInscri(data: any) {
  const formData = new FormData()

  // Infos parent
  formData.append("parent", JSON.stringify(data.parent))

  // Infos fiche admin
  formData.append("ficheAdmin", JSON.stringify(data.ficheAdmin))
if (
  data.ficheAdmin.modePaiement === "Virement" &&
  data.ficheAdmin.preuveVirement instanceof File
) {
  formData.append("preuveVirement", data.ficheAdmin.preuveVirement)
}
  // Date + montant total
  formData.append("date", data.date)
  formData.append("montant_total", data.montant_total.toString())

  // Enfants + fichiers
  data.enfants.forEach((enfant: any, i: number) => {
    const enfantSansFichier = { ...enfant }
    if (enfant.justificatif_file) {
      formData.append(`assurance_${enfant.nom}_${enfant.prenom}`, enfant.justificatif_file)
      delete enfantSansFichier.justificatif_file
    }
    formData.append(`enfant_${i}`, JSON.stringify(enfantSansFichier))
  })

  try {
    const response = await fetch("https://n8n.srv770157.hstgr.cloud/webhook/0ef091e6-a0c7-457c-a8a2-3e8ff85dead0", {
      method: "POST",
      body: formData, // ✅ plus de headers à définir ici
    })

    if (!response.ok) throw new Error("Erreur lors de l’envoi à n8n")

    return await response.json()
  } catch (err) {
    console.error("Erreur envoi vers n8n :", err)
    throw err
  }
}
