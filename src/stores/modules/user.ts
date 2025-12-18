import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      userInfo: null,
      loading: false,
      error: null,
      clearUser: () => set({ userInfo: null }),
    }),
    { name: "user-storage" },
  ),
);

export function setUser(user: any) {
  useUserStore.setState(user);
}

export function getUser() {
  return useUserStore.getState();
}
