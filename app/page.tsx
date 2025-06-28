"use client"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      {/* Logo */}
      <img src="/logoamab.png" alt="Logo de l'association" className="h-20 mb-6" />

      {/* Titre */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        Bienvenue sur le site d’inscription 2025-2026
      </h1>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 max-w-xl mb-6">
        Ce site permet aux parents d’inscrire leurs enfants aux activités éducatives et religieuses de notre association.
      </p>

      {/* Bouton vers l’inscription */}
      <a
        href="/inscription"
        className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl shadow"
      >
        Accéder au formulaire
      </a>

      {/* Footer */}
      <div className="mt-12 text-xs text-gray-400">
        © {new Date().getFullYear()} – Association éducative & religieuse
      </div>
    </div>
  )
}
