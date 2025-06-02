import { create } from 'zustand'

interface LocalIdState {
  localId: string
  setLocalId: (newId: string) => void
}

export const useLocalIdStore = create<LocalIdState>((set) => ({
  localId: sessionStorage.getItem('localId') || '', // Начальное значение
  setLocalId: (newId) => {
    sessionStorage.setItem('localId', newId) // Сохраняем id
    set({ localId: newId })
  },
}))
