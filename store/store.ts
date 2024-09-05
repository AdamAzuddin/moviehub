import { create } from "zustand";
import { User } from "firebase/auth";

interface FavouriteItem {
  movieId: string;
  type: "movie" | "tv";
}

interface StoreState {
  user: User | null;
  profilePic: string;
  username: string;
  uid: string;
  favourites: FavouriteItem[];
  watchlist: FavouriteItem[];
  setUser: (user: User | null) => void;
  setProfilePic: (profilePic: string) => void;
  setUsername: (username: string) => void;
  setUid: (uid: string) => void;
  addToFavourites: (item: FavouriteItem) => void;
  removeFromFavourites: (item: FavouriteItem) => void;
  addToWatchlist: (item: FavouriteItem) => void;
  removeFromWatchlist: (item: FavouriteItem) => void;
  resetFavourites: () => void;
  resetWatchlist: () => void;
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
  setUid: (uid) => set({ uid }),
  addToFavourites: (item) => set((state) => ({
    favourites: [...state.favourites, item]
  })),
  removeFromFavourites: (item) => set((state) => ({
    favourites: state.favourites.filter(i => i.movieId !== item.movieId || i.type !== item.type)
  })),
  resetFavourites: () => set({ favourites: [] }), // New action to reset favourites
  addToWatchlist: (item) => set((state) => ({
    watchlist: [...state.watchlist, item]
  })),
  removeFromWatchlist: (item) => set((state) => ({
    watchlist: state.watchlist.filter(i => i.movieId !== item.movieId || i.type !== item.type)
  })),
  resetWatchlist: () => set({ watchlist: [] })
}));

export default useStore;
