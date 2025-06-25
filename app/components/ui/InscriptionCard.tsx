import React from 'react';
import { ArrowRight } from 'lucide-react';

const InscriptionCards = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Module 1 : Éducation Religieuse */}
      <div className="bg-yellow-50 rounded-2xl shadow-md p-4 border border-yellow-200">
        <h2 className="text-xl font-semibold text-yellow-700">📚 Éducation Religieuse (Module 1)</h2>
        <ul className="text-sm list-disc list-inside space-y-1 mt-2">
          <li>Âge : 4 à 6 ans</li>
          <li>Heure : Dimanche (2h)</li>
          <li>Avec activité APAS (langue arabe)</li>
          <li>Prix : 120 € / an</li>
        </ul>
        {/* <button className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white w-full py-2 rounded-xl flex items-center justify-center gap-2">
          Inscrire <ArrowRight size={16} />
        </button> */}
      </div>

      <div className="bg-yellow-50 rounded-2xl shadow-md p-4 border border-yellow-200">
        <ul className="text-sm list-disc list-inside space-y-1">
          <li>Âge : 7 à 14 ans</li>
          <li>Heure : Dimanche (1h)</li>
          <li>➕ 1 atelier/mois samedi 11h–13h</li>
          <li>Prix : 120 € / an</li>
        </ul>
        {/* <button className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white w-full py-2 rounded-xl flex items-center justify-center gap-2">
          Inscrire <ArrowRight size={16} />
        </button> */}
      </div>

      <div className="bg-yellow-50 rounded-2xl shadow-md p-4 border border-yellow-200">
        <ul className="text-sm list-disc list-inside space-y-1">
          <li>Âge : +14 ans</li>
          <li>Heure : Vendredi 18h30–20h30</li>
          <li>Prix : 120 € / an</li>
        </ul>
        {/* <button className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white w-full py-2 rounded-xl flex items-center justify-center gap-2">
          Inscrire <ArrowRight size={16} />
        </button> */}
      </div>

      {/* Module 2 : Dar Al Coran – Période scolaire */}
      <div className="bg-orange-50 rounded-2xl shadow-md p-4 border border-green-200">
        <h2 className="text-xl font-semibold text-green-700">📖 Dar Al Coran – Période scolaire (Module 2)</h2>
        <ul className="text-sm list-disc list-inside space-y-1 mt-2">
          <li>Âge : +7 ans</li>
          <li>🗓 Mercredi 10h–11h30 (nouveau)</li>
          <li>🗓 Samedi 14h–15h30 ou 15h30–17h</li>
          <li>Prix : 120 € / an</li>
        </ul>
        {/* <button className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-xl flex items-center justify-center gap-2">
          Inscrire <ArrowRight size={16} />
        </button> */}
      </div>

      {/* Module 3 : Dar Al Coran – Vacances scolaires */}
      <div className="bg-green-50 rounded-2xl shadow-md p-4 border border-green-200">
        <h2 className="text-xl font-semibold text-green-700">📖 Dar Al Coran – Vacances scolaires (Module 3)</h2>
        <ul className="text-sm list-disc list-inside space-y-1 mt-2">
          <li>Âge : +7 ans</li>
          <li>Heure : Lundi à Jeudi 2h après la prière de Dhor</li>
          <li>Prix : 40 € / an</li>
        </ul>
        {/* <button className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-xl flex items-center justify-center gap-2">
          Inscrire <ArrowRight size={16} />
        </button> */}
      </div>

      {/* Packs */}
      <div className="bg-gray-100 rounded-2xl shadow-md p-4 border border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">💰 Packs</h2>
        <ul className="text-sm mt-2 list-disc list-inside space-y-1">
          <li>🎒 Module 1 (Éducation Religieuse) + Module 2 (Dar Al Coran scolaire) = 220 €</li>
          <li>🎒 Module 1 + 2 + 3 (Vacances) = 250 €</li>
          <li>🎒 Module 1 + 3 ou 2 + 3 = 150 €</li>
        </ul>
      </div>
    </div>
  );
};

export default InscriptionCards;
