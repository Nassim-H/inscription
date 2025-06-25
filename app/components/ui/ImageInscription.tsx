import Image from "next/image"

export default function TarifsEtHoraires() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* IMAGE TARIFS */}
      <div className="border rounded-xl overflow-hidden shadow">
        <Image
          src="/horaires.png"
          alt="Tarifs et horaires AMAB"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
        <p className="text-sm text-center text-gray-600 mt-2">
          Vue d’ensemble des modules, horaires et tarifs annuels.
        </p>
      </div>

      {/* Tu peux ensuite mettre ici les <InscriptionCards /> */}
    </div>
  )
}
