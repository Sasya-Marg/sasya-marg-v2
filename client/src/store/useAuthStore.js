import { create } from "zustand";

export const useAuthStore = create((set) => ({
  loading: true,
  user: null,
  role: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      loading: false,
      user,
      role: user?.role,
      isAuthenticated: true,
    }),

  clearUser: () =>
    set({
      loading: false,
      user: null,
      role: null,
      isAuthenticated: false,
    }),

  stopLoading: () =>
    set({ loading: false }),
}));
