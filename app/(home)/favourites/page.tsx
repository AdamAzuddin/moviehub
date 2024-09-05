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
import { MovieDetails } from "@/types/types";
import { ListsItem } from "@/types/types";
import ListsItemComponent from "@/components/ListsItem";

// Fetch favorites from Firebase
const fetchFavouritesFromFirebase = async (
  uid: string
): Promise<ListsItem[]> => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  let favourites: ListsItem[] = [];
  querySnapshot.forEach((doc) => {
    favourites = doc.data().favourites || [];
  });

  return favourites;
};

// SWR fetcher function with typing
const fetcher = (uid: string): Promise<ListsItem[]> =>
  fetchFavouritesFromFirebase(uid);

const FavouritesPage: React.FC = () => {
  const { user } = useAuth();
  const resetFavourites = useStore((state) => state.resetFavourites);

  const addToFavourites = useStore((state) => state.addToFavourites);
  const favourites = useStore((state) => state.favourites);
  const [items, setItems] = useState<MovieDetails[]>([]);

  // Use SWR for caching with types
  const { data, error } = useSWR<ListsItem[]>(user ? user.uid : null, fetcher);
  const { handleMovieClick } = useMovieNavigation();

  // Add fetched favourites to Zustand store when data is available
  useEffect(() => {
    if (data) {
      resetFavourites();
      data.forEach((item) => {
        addToFavourites(item);
      });
    }
  }, [data, addToFavourites, resetFavourites]);

  // Fetch the details of favourite movies/TV shows
  useEffect(() => {
    const fetchFavouriteItems = async () => {
      if (!favourites || favourites.length === 0) return;

      try {
        const itemDetailsPromises = favourites.map(async (item) => {
          const details = await fetchMovieDetails(
            item.id,
            item.filmType
          );
          return { ...details, filmType: item.filmType };
        });
        const itemsDetails = await Promise.all(itemDetailsPromises);
        setItems(itemsDetails); // Set fetched details into state
        console.log(itemsDetails)
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
          <h1 className="text-2xl lg:text-4xl font-bold">Your Favourites</h1>
          <div className="flex">
            {items.map((item) => (
              <ListsItemComponent key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
