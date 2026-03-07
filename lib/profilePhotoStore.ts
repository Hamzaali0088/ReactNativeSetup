import { create } from 'zustand';

interface ProfilePhotoState {
  profilePhotoUrl: string | null;
  setProfilePhotoUrl: (url: string | null) => void;
}

export const useProfilePhotoStore = create<ProfilePhotoState>((set) => ({
  profilePhotoUrl: null,
  setProfilePhotoUrl: (url) => set({ profilePhotoUrl: url }),
}));
