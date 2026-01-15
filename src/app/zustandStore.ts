import { create } from "zustand";
import { getUserProfile } from "@/app/_actions/useAuth";

export const useInitStore = create((set) => ({
  count: 0,
  add: () => set((state: any) => ({ count: state.count + 1 })),
  // remove: () => set((state: any) => ({ count: state.count - 1 })),
}));

interface  userProfile {
  user:null|[],
  getProfile:() => void
  removeProfile:() => void
}

export const userProfile = create<userProfile>((set) => ({
  user: null,
  getProfile: async () => {
    const res: any = await getUserProfile();
    return set({ user: res.data});
  },
  removeProfile: () => set({ user: null }),
}));
