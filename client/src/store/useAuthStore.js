import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,

  login: (data) =>
    set({
      user: data.user,
      token: data.token,
      role: data.role,
    }),

  logout: () => set({ user: null, token: null, role: null }),
}));
