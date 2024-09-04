"use client";
import React, { useEffect, useState } from 'react';
import useStore from '@/store/store';
import { useAuth } from '@/hooks/useAuth';
import { fetchMovieDetails } from '@/lib/tmdb';

const WatchlistPage = () => {
  const { user } = useAuth(); // Get the current authenticated user
  const watchlist = useStore((state) => state.watchlist); // Get the watchlist
  const [items, setItems] = useState<any[]>([]); // State to store movie and TV show details

  useEffect(() => {
    const fetchWatchlistItems = async () => {
      if (!user) return;

      try {
        // Fetch details for each item in the watchlist
        const itemDetailsPromises = watchlist.map((item) =>
          fetchMovieDetails(item.movieId, item.type)
        );
        const itemsDetails = await Promise.all(itemDetailsPromises);
        
        setItems(itemsDetails);
      } catch (error) {
        console.error('Error fetching watchlist details:', error);
      }
    };

    fetchWatchlistItems();
  }, [user, watchlist]);

  return (
    <div>
      {items.length === 0 ? (
        <div>Your watchlist is empty for now</div>
      ) : (
        <div>
          <h1>Your Watchlist</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg shadow-md">
                <img
                  src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/images/movie-poster-placeholder.png"}
                  alt={item.title || item.name}
                  className="w-full h-auto"
                />
                <h2 className="text-xl font-bold mt-2">{item.title || item.name}</h2>
                {/* Add more item details as needed */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
