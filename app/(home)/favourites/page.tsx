"use client";
import React, { useEffect, useState } from "react";
import useStore from "@/store/store";
import { useAuth } from "@/hooks/useAuth";
import { fetchMovieDetails } from "@/lib/tmdb";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MovieDetails, ListsItem } from "@/types/types";
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

const FavouritesPage: React.FC = () => {
  const { user } = useAuth();
  const resetFavourites = useStore((state) => state.resetFavourites);
  const addToFavourites = useStore((state) => state.addToFavourites);
  const [items, setItems] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const favorites = useStore((state) => state.favourites);

  // Fetch the favorites from Firebase and update Zustand store
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch from Firebase
        const fetchedFavourites = await fetchFavouritesFromFirebase(user.uid);

        // Reset the Zustand store and add fetched items
        resetFavourites();
        fetchedFavourites.forEach((item) => {
          addToFavourites(item);
        });

        // Fetch the movie details after populating the Zustand store
        const itemDetailsPromises = fetchedFavourites.map(async (item) => {
          const details = await fetchMovieDetails(item.id, item.filmType);
          return { ...details, filmType: item.filmType };
        });
        const itemsDetails = await Promise.all(itemDetailsPromises);

        // Set fetched details into state
        setItems(itemsDetails);
      } catch (err) {
        console.error("Error fetching favourites:", err);
        setError("Error loading favourites.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, resetFavourites, addToFavourites, favorites]);

  if (loading) return <div>Loading favourites...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {items.length === 0 ? (
        <div>Your favourites list is empty for now</div>
      ) : (
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold">Your Favourites</h1>
          <div className="flex">
            {items.map((item) => (
              <ListsItemComponent key={item.id} item={item} listType="favourites"/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
