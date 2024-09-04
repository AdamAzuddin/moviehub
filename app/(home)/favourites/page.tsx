"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useStore from '@/store/store';
import { useAuth } from '@/hooks/useAuth';
import { fetchMovieDetails } from '@/lib/tmdb';

const FavouritesPage = () => {
  const { user } = useAuth(); // Get the current authenticated user
  const favourites = useStore((state) => state.favourites); // Get the favourites list
  const [items, setItems] = useState<any[]>([]); // State to store movie and TV show details

  useEffect(() => {
    const fetchFavouriteItems = async () => {
      if (!user) return;

      try {
        // Fetch details for each item in the favourites list
        const itemDetailsPromises = favourites.map((item) =>
          fetchMovieDetails(item.movieId, item.type)
        );
        const itemsDetails = await Promise.all(itemDetailsPromises);
        
        setItems(itemsDetails);
      } catch (error) {
        console.error('Error fetching favourites details:', error);
      }
    };

    fetchFavouriteItems();
  }, [user, favourites]);

  return (
    <div>
      {items.length === 0 ? (
        <div>Your favourites list is empty for now</div>
      ) : (
        <div>
          <h1>Your Favourites</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg shadow-md">
                <Image
                  src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/images/movie-poster-placeholder.png"}
                  alt={item.title || item.name}
                  width={200}
                  height={300}
                  layout="responsive"
                  className="rounded-lg"
                  placeholder="blur"
                  blurDataURL="/images/movie-poster-placeholder.png"
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

export default FavouritesPage;
