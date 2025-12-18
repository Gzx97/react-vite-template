import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  name?: string;
  [key: string]: any; // 如果有其他动态字段
}

interface UserStoreState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  clearUser: () => void;
}

export const useUserStore = create<UserStoreState>()(
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

export function setUser(userInfo: UserInfo | null) {
  useUserStore.setState({ userInfo });
}

export function getUser(): UserInfo | null {
  return useUserStore.getState().userInfo;
}

export function setFullState(state: Partial<UserStoreState>) {
  useUserStore.setState(state);
}
