import { create } from "zustand"

export type ParentRole = "pere" | "mere"

export interface ParentInfo {
  nom_prenom: string
  telephone: string
  email: string
  profession: string
  numero_rue: string
  nom_rue: string
  code_postal: string
  ville: string
}

interface PersonneAutorisee {
  nom: string
  telephone: string
  lien: string
}

interface FicheAdmin {
  situationFamiliale: string
  urgenceNom: string
  urgenceTel: string
  urgenceLien: string
  personnesAutorisees: PersonneAutorisee[]
  autorisationSecours: boolean
  autorisationSoins: boolean
  autorisationSortieSeule: boolean
  autorisationTransport: boolean
  autorisationPhotoInterne: boolean
  autorisationPhotoReseaux: boolean
  autorisationPhotoVisageApparent: boolean
}

export interface Enfant {
  nom: string
  prenom: string
  age: string
  classe: string,
  genre?: "Fille" | "Garçon" | ""
  date_naissance?: string
  lieu_naissance?: string
  ecole?: string
  interets?: string
  extrascolaires?: string
  maladies?: string
  traitements?: string
  observations?: string
  cours: string[]
  montant: number
  sortieSeul: boolean
}

interface FormState {
  parent: {
    pere: ParentInfo
    mere: ParentInfo
  }
  enfants: Enfant[]
  montant_total: number
  reglementLu: boolean
  ficheAdmin: FicheAdmin

  // Actions
  setParentField: (role: ParentRole, field: keyof ParentInfo, value: string) => void
  setNombreEnfants: (count: number) => void
  updateEnfantField: (index: number, field: keyof Enfant, value: any) => void
  setReglementLu: (value: boolean) => void
  setMontantTotal: (total: number) => void

  // Fiche admin
  setFicheAdminField: (field: keyof FicheAdmin, value: any) => void
  addPersonneAutorisee: () => void
  updatePersonneAutorisee: (index: number, field: keyof PersonneAutorisee, value: string) => void
}

const defaultEnfant = (): Enfant => ({
  nom: "",
  prenom: "",
  age: "",
  classe: "",
  cours: [],
  montant: 0,
  sortieSeul: false,
})

export const useFormStore = create<FormState>((set) => ({
  parent: {
    pere: {
      nom_prenom: "",
      telephone: "",
      email: "",
      profession: "",
      numero_rue: "",
      nom_rue: "",
      code_postal: "",
      ville: ""
    },
    mere: {
      nom_prenom: "",
      telephone: "",
      email: "",
      profession: "",
      numero_rue: "",
      nom_rue: "",
      code_postal: "",
      ville: ""
    }
  },

  enfants: [defaultEnfant()],
  montant_total: 0,
  reglementLu: false,

  ficheAdmin: {
    situationFamiliale: "",
    urgenceNom: "",
    urgenceTel: "",
    urgenceLien: "",
    personnesAutorisees: [],
    autorisationSecours: false,
    autorisationSoins: false,
    autorisationSortieSeule: false,
    autorisationTransport: false,
    autorisationPhotoInterne: false,
    autorisationPhotoReseaux: false,
    autorisationPhotoVisageApparent: false
  },

  // Mutateurs
  setParentField: (role, field, value) =>
    set((state) => ({
      parent: {
        ...state.parent,
        [role]: {
          ...state.parent[role],
          [field]: value
        }
      }
    })),

  setNombreEnfants: (count) =>
    set(() => ({
      enfants: Array.from({ length: count }, () => defaultEnfant())
    })),

  updateEnfantField: (index, field, value) =>
    set((state) => {
      const enfants = [...state.enfants]
      enfants[index] = {
        ...enfants[index],
        [field]: value
      }
      return { enfants }
    }),

  setReglementLu: (value) => set(() => ({ reglementLu: value })),

  setMontantTotal: (total) => set(() => ({ montant_total: total })),

  setFicheAdminField: (field, value) =>
    set((state) => ({
      ficheAdmin: {
        ...state.ficheAdmin,
        [field]: value
      }
    })),

  addPersonneAutorisee: () =>
    set((state) => ({
      ficheAdmin: {
        ...state.ficheAdmin,
        personnesAutorisees: [
          ...state.ficheAdmin.personnesAutorisees,
          { nom: "", telephone: "", lien: "" }
        ]
      }
    })),

  updatePersonneAutorisee: (index, field, value) =>
    set((state) => {
      const updated = [...state.ficheAdmin.personnesAutorisees]
      updated[index] = {
        ...updated[index],
        [field]: value
      }
      return {
        ficheAdmin: {
          ...state.ficheAdmin,
          personnesAutorisees: updated
        }
      }
    })
}))
