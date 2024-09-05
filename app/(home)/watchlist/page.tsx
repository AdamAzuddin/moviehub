"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useStore from '@/store/store';
import { useAuth } from '@/hooks/useAuth';
import { fetchMovieDetails } from '@/lib/tmdb';
import useSWR from 'swr';
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useMovieNavigation from '@/hooks/useMovieNavigation';

// Define types
interface WatchlistItem {
  movieId: string;
  type: "movie" | "tv";
}

interface MovieDetails {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  filmType: 'movie' | 'tv'; // Corrected field name
}

// Fetch watchlist from Firebase
const fetchWatchlistFromFirebase = async (uid: string): Promise<WatchlistItem[]> => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  let watchlist: WatchlistItem[] = [];
  querySnapshot.forEach((doc) => {
    watchlist = doc.data().watchlist || []; // Get the watchlist field
  });

  return watchlist;
};

// SWR fetcher function with typing
const fetcher = (uid: string): Promise<WatchlistItem[]> => fetchWatchlistFromFirebase(uid);

const WatchlistPage: React.FC = () => {
  const { user } = useAuth();
  const resetWatchlist = useStore((state) => state.resetWatchlist); // Action to reset the list
  const addToWatchlist = useStore((state) => state.addToWatchlist); // Zustand action for adding to watchlist
  const watchlist = useStore((state) => state.watchlist); // Zustand watchlist array
  const [items, setItems] = useState<MovieDetails[]>([]); // State for storing movie/TV details
  const { handleMovieClick } = useMovieNavigation(); // Use the custom hook

  // Use SWR for caching with types
  const { data, error } = useSWR<WatchlistItem[]>(user ? user.uid : null, fetcher);

  // Add fetched watchlist to Zustand store when data is available
  useEffect(() => {
    if (data) {
      resetWatchlist(); // Reset the list
      data.forEach((item) => {
        addToWatchlist(item); // Add each watchlist item to the store
      });
    }
  }, [data, addToWatchlist, resetWatchlist]);

  // Fetch the details of watchlist movies/TV shows
  useEffect(() => {
    const fetchWatchlistItems = async () => {
      if (!watchlist || watchlist.length === 0) return;

      try {
        const itemDetailsPromises = watchlist.map(async (item) => {
          const details = await fetchMovieDetails(item.movieId, item.type);
          return { ...details, filmType: item.type }; // Append filmType
        });
        const itemsDetails = await Promise.all(itemDetailsPromises);
        setItems(itemsDetails);
      } catch (error) {
        console.error('Error fetching watchlist details:', error);
      }
    };

    fetchWatchlistItems();
  }, [watchlist]);

  if (error) return <div>Error loading watchlist</div>;
  if (!data) return <div>Loading watchlist...</div>;

  return (
    <div>
      {items.length === 0 ? (
        <div>Your watchlist is empty for now</div>
      ) : (
        <div>
          <h1>Your Watchlist</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg shadow-md"
                onClick={() => handleMovieClick(item.id, item.filmType)}
              >
                <Image
                  src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/images/movie-poster-placeholder.png"}
                  alt={item.title || item.name || "Movie Poster"}
                  width={200}
                  height={300}
                  layout="responsive"
                  className="rounded-lg"
                  placeholder="blur"
                  blurDataURL="/images/movie-poster-placeholder.png"
                />
                <h2 className="text-xl font-bold mt-2">{item.title || item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
