import {create} from 'zustand';
import { User } from 'firebase/auth';

interface StoreState {
  user: User | null;
  profilePic: string;
  username: string;
  setUser: (user: User | null) => void;
  setProfilePic: (profilePic: string) => void;
  setUsername: (username: string) => void;
}

const useStore = create<StoreState>((set) => ({
  user: null,
  profilePic: '/images/default_profile_pic.jpg',
  username: '',
  setUser: (user) => set({ user }),
  setProfilePic: (profilePic) => set({ profilePic }),
  setUsername: (username) => set({ username }),
}));

export default useStore;
