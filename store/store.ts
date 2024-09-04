import { create } from "zustand";
import { User } from "firebase/auth";

interface StoreState {
  user: User | null;
  profilePic: string;
  username: string;
  uid: string;
  favourites: string[];
  watchlist: string[];
  setUser: (user: User | null) => void;
  setProfilePic: (profilePic: string) => void;
  setUsername: (username: string) => void;
  setUid: (uid: string) => void;
  addToFavourites: (movieId: string) => void;
  removeFromFavourites: (movieId: string) => void;
  addToWatchlist: (movieId: string) => void;
  removeFromWatchlist: (movieId: string) => void;
}


const useStore = create<StoreState>((set) => ({
  user: null,
  profilePic: "/images/default_profile_pic.jpg",
  username: "",
  uid: "",
  favourites: [],
  watchlist: [],
  setUser: (user) => set({ user }),
  setProfilePic: (profilePic) => set({ profilePic }),
  setUsername: (username) => set({ username }),
  setUid: (uid: string) => set({ uid }),
  addToFavourites: (movieId: string) => set((state) => ({
    favourites: [...state.favourites, movieId],
  })),
  removeFromFavourites: (movieId: string) => set((state) => ({
    favourites: state.favourites.filter((id) => id !== movieId),
  })),
  addToWatchlist: (movieId: string) => set((state) => ({
    watchlist: [...state.watchlist, movieId],
  })),
  removeFromWatchlist: (movieId: string) => set((state) => ({
    watchlist: state.watchlist.filter((id) => id !== movieId),
  })),
}));

export default useStore;
