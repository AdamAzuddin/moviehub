import { create } from "zustand";
import { StoreState } from "@/types/types";

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
  setUid: (uid) => set({ uid }),
  addToFavourites: (item) => set((state) => ({
    favourites: [...state.favourites, item]
  })),
  removeFromFavourites: (item) => set((state) => ({
    favourites: state.favourites.filter(i => i.id !== item.id || i.mediaType !== item.mediaType)
  })),
  resetFavourites: () => set({ favourites: [] }), // New action to reset favourites
  addToWatchlist: (item) => set((state) => ({
    watchlist: [...state.watchlist, item]
  })),
  removeFromWatchlist: (item) => set((state) => ({
    watchlist: state.watchlist.filter(i => i.id !== item.id || i.mediaType !== item.mediaType)
  })),
  resetWatchlist: () => set({ watchlist: [] })
}));

export default useStore;
