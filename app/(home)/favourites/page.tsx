"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useStore from "@/store/store";
import { useAuth } from "@/hooks/useAuth";
import { fetchMovieDetails } from "@/lib/tmdb";
import useSWR from "swr";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useMovieNavigation from "@/hooks/useMovieNavigation";

// Define types
interface FavouriteItem {
  movieId: string;
  type: "movie" | "tv";
}

interface MovieDetails {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  filmType: "movie" | "tv"; // Corrected field name
}

// Fetch favorites from Firebase
const fetchFavouritesFromFirebase = async (
  uid: string
): Promise<FavouriteItem[]> => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  let favourites: FavouriteItem[] = [];
  querySnapshot.forEach((doc) => {
    favourites = doc.data().favourites || []; // Get the favourites field
  });

  return favourites;
};

// SWR fetcher function with typing
const fetcher = (uid: string): Promise<FavouriteItem[]> =>
  fetchFavouritesFromFirebase(uid);

const FavouritesPage: React.FC = () => {
  const { user } = useAuth();
  const resetFavourites = useStore((state) => state.resetFavourites); // Action to reset the list

  const addToFavourites = useStore((state) => state.addToFavourites); // Zustand action for adding to favourites
  const favourites = useStore((state) => state.favourites); // Zustand favourites array
  const [items, setItems] = useState<MovieDetails[]>([]); // State for storing movie/TV details

  // Use SWR for caching with types
  const { data, error } = useSWR<FavouriteItem[]>(
    user ? user.uid : null,
    fetcher
  );
  const { handleMovieClick } = useMovieNavigation(); // Use the custom hook

  // Add fetched favourites to Zustand store when data is available
  useEffect(() => {
    if (data) {
      resetFavourites(); // Reset the list
      data.forEach((item) => {
        addToFavourites(item); // Add each favourite item to the store
      });
    }
  }, [data, addToFavourites]);

  // Fetch the details of favourite movies/TV shows
  useEffect(() => {
    const fetchFavouriteItems = async () => {
      if (!favourites || favourites.length === 0) return;

      try {
        const itemDetailsPromises = favourites.map(async (item) => {
          const details = await fetchMovieDetails(item.movieId, item.type);
          return { ...details, filmType: item.type }; // Append filmType
        });
        const itemsDetails = await Promise.all(itemDetailsPromises);
        setItems(itemsDetails); // Set fetched details into state
      } catch (error) {
        console.error("Error fetching favourites details:", error);
      }
    };

    fetchFavouriteItems();
  }, [favourites]);

  if (error) return <div>Error loading favourites</div>;
  if (!data) return <div>Loading favourites...</div>;

  return (
    <div>
      {items.length === 0 ? (
        <div>Your favourites list is empty for now</div>
      ) : (
        <div>
          <h1>Your Favourites</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg shadow-md"
                onClick={() => handleMovieClick(item.id, item.filmType)}
              >
                <Image
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "/images/movie-poster-placeholder.png"
                  }
                  alt={item.title || item.name || "Movie Poster"}
                  width={200}
                  height={300}
                  layout="responsive"
                  className="rounded-lg"
                  placeholder="blur"
                  blurDataURL="/images/movie-poster-placeholder.png"
                />
                <h2 className="text-xl font-bold mt-2">
                  {item.title || item.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
