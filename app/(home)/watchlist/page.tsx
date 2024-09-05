"use client";

import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { useAuth } from '@/hooks/useAuth';
import { fetchMovieDetails } from '@/lib/tmdb';
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MovieDetails, ListsItem } from '@/types/types';
import ListsItemComponent from '@/components/ListsItem';

// Fetch watchlist from Firebase
const fetchWatchlistFromFirebase = async (uid: string): Promise<ListsItem[]> => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  let watchlist: ListsItem[] = [];
  querySnapshot.forEach((doc) => {
    watchlist = doc.data().watchlist || [];
  });

  return watchlist;
};

const WatchlistPage: React.FC = () => {
  const { user } = useAuth();
  const resetWatchlist = useStore((state) => state.resetWatchlist);
  const addToWatchlist = useStore((state) => state.addToWatchlist);
  const [items, setItems] = useState<MovieDetails[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Consolidated useEffect for fetching and updating data
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch watchlist from Firebase
        const fetchedWatchlist = await fetchWatchlistFromFirebase(user.uid);

        // Reset Zustand store and add new watchlist items
        resetWatchlist();
        fetchedWatchlist.forEach(addToWatchlist);

        // Fetch movie details for each watchlist item
        const itemDetailsPromises = fetchedWatchlist.map(async (item) => {
          const details = await fetchMovieDetails(item.id, item.filmType);
          return { ...details, filmType: item.filmType }; // Append filmType
        });

        const itemsDetails = await Promise.all(itemDetailsPromises);
        setItems(itemsDetails); // Set fetched details into state
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setError("Error loading watchlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, resetWatchlist, addToWatchlist]);

  if (loading) return <div>Loading watchlist...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {items.length === 0 ? (
        <div>Your watchlist is empty for now</div>
      ) : (
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold">Your Watchlist</h1>
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

export default WatchlistPage;
