import { create } from 'zustand';

interface MusicStore {
  isPlaying: boolean;
  togglePlaying: () => void;
  setPlaying: (state: boolean) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  isPlaying: false,
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (state: boolean) => set(() => ({ isPlaying: state })),
}));