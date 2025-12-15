import { create } from "zustand";
import { persist } from "zustand/middleware";

const fetchUserInfo = (userId: string) => {
  return new Promise<{ id: string; name: string; age: number }>((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "张三", age: 25 });
    }, 1000);
  });
};

export const useUserStore = create(
  persist(
    (set) => ({
      userInfo: null,
      loading: false,
      error: null,
      fetchUser: async (userId: string) => {
        try {
          set({ loading: true, error: null }); // 开始请求
          const data = await fetchUserInfo(userId);
          set({ userInfo: data, loading: false }); // 请求成功
        } catch (err) {
          set({ error: "请求失败", loading: false }); // 请求失败
        }
      },
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
