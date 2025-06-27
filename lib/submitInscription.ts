// lib/submitInscription.ts
export async function submitInscription(data: any) {
  try {
    const response = await fetch("https://n8n.srv770157.hstgr.cloud/webhook-test/0ef091e6-a0c7-457c-a8a2-3e8ff85dead0", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.log("Réponse de n8n :", response)
      throw new Error("Erreur lors de l’envoi à n8n")
          

    }

    const result = await response.json()
    return result
  } catch (err) {
    console.error("Erreur envoi vers n8n :", err)
    throw err
  }
}
