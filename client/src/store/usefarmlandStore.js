import { create } from 'zustand'

export const useFarmlandStore = create((set) => ({
  farmland: null,
  setFarmland: (data) => set({ farmland: data }),
}))

