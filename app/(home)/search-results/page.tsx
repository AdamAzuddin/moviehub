"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MovieDetails } from "@/types/types"; // Import your MovieDetails type
import Image from "next/image";
import Link from "next/link";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<MovieDetails[]>([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const fetchResults = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchQuery}`
          );
          const data = await response.json();

          // Map API response to MovieDetails type
          const moviesAndTVShows: MovieDetails[] = data.results.map(
            (item: any) => ({
              id: item.id,
              title: item.title || item.name, // For movies, it's `title`, for TV shows it's `name`
              poster_path: item.poster_path,
              mediaType: item.media_type === "tv" ? "tv" : "movie", // Determine if it's TV or movie
            })
          );
          setResults(moviesAndTVShows); // Set the results in state
        } catch (error) {
          console.error("Error fetching data from TMDB", error);
        }
      };
      fetchResults();
    }
  }, [searchQuery]);

  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-3xl text-gray-200 mb-4">
        Search Results for "{searchQuery}"
      </h1>

      {results.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((result) => (
            <Link href={`/details/${result.mediaType}/${result.id}`}>
              <li
                key={result.id}
                className="flex flex-col items-center space-y-2"
              >
                {result.poster_path ? (
                  <Image
                    src={result.poster_path ? `https://image.tmdb.org/t/p/w200${result.poster_path}`: "/images/movie-poster-placeholder.png"}
                    alt={"Poster of " + result.title}
                    width={150}
                    height={225}
                    className="object-cover rounded-md"
                  />
                ) : (
                    <Image
                    src={"/images/movie-poster-placeholder.png"}
                    alt={"Poster of " + result.title}
                    width={150}
                    height={225}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="text-gray-200 text-center">
                  {result.title}
                  <small className="block text-gray-500">
                    {result.mediaType === "tv" ? "TV Show" : "Movie"}
                  </small>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">No results found</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
