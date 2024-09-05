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
import { MovieDetails } from '@/types/types';
import { ListsItem } from '@/types/types';
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

// SWR fetcher function with typing
const fetcher = (uid: string): Promise<ListsItem[]> => fetchWatchlistFromFirebase(uid);

const WatchlistPage: React.FC = () => {
  const { user } = useAuth();
  const resetWatchlist = useStore((state) => state.resetWatchlist);
  const addToWatchlist = useStore((state) => state.addToWatchlist);
  const watchlist = useStore((state) => state.watchlist);
  const [items, setItems] = useState<MovieDetails[]>([]); 
  const { handleMovieClick } = useMovieNavigation();

  // Use SWR for caching with types
  const { data, error } = useSWR<ListsItem[]>(user ? user.uid : null, fetcher);

  // Add fetched watchlist to Zustand store when data is available
  useEffect(() => {
    if (data) {
      resetWatchlist();
      data.forEach((item) => {
        addToWatchlist(item);
      });
    }
  }, [data, addToWatchlist, resetWatchlist]);

  // Fetch the details of watchlist movies/TV shows
  useEffect(() => {
    const fetchWatchlistItems = async () => {
      if (!watchlist || watchlist.length === 0) return;

      try {
        const itemDetailsPromises = watchlist.map(async (item) => {
          const details = await fetchMovieDetails(item.id, item.filmType);
          return { ...details, filmType: item.filmType }; // Append filmType
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
