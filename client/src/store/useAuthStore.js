import { create } from "zustand";

export const useAuthStore = create((set) => ({
  loading: true,
  user: null,
  role: null,
  isAuthenticated: false,
  authStatus: "loading",

  setUser: (user) =>
    set({
      loading: false,
      user,
      role: user?.role,
      isAuthenticated: true,
      authStatus: "authenticated"
    }),

  clearUser: () =>
    set({
      loading: false,
      user: null,
      role: null,
      isAuthenticated: false,
      authStatus: "unauthenticated"
    }),

  startLoading: () => {
    set({ loading: true, authStatus: "loading" })
  },

  stopLoading: () =>
    set({ loading: false }),
}));
