"use client";

import useSWR from "swr";
import Image from "next/image";
import { TMDB_BASE_URL } from "@/constants/constants";
import MovieCarousel from "@/components/MovieCarousel";
import { useState } from "react";
import AddFavsButton from "./AddFavsButton";
import useStore from "@/store/store";
import AddWatchlistButton from "./AddWatchlistButton";
import { MovieDetails } from "@/types/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ClientMovieDetails = ({ movieId , type}: MovieDetails) => {
  // State to handle image error
  const [imageError, setImageError] = useState(false);
  const user = useStore((state) => state.user);

  // Fetch movie details
  const { data: movieDetails, error: movieError } = useSWR(
    `${TMDB_BASE_URL}/${type}/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  // Fetch similar movies
  const { data: similarMovies, error: similarError } = useSWR(
    movieId
      ? `${TMDB_BASE_URL}/${type}/${movieId}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      : null,
    fetcher
  );

  if (movieError || similarError) {
    return <div>Failed to load</div>;
  }

  if (!movieDetails || !similarMovies) {
    return <div>Loading...</div>;
  }

  // Handle image load error
  const handleImageError = () => setImageError(true);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative">
        <h1 className="text-4xl font-bold mb-4 text-white">
          {movieDetails.title}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <Image
          src={
            imageError
              ? "/images/movie-poster-placeholder.png"
              : `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
          }
          alt={movieDetails.title}
          width={500}
          height={750}
          className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-lg"
          onError={handleImageError}
        />
        <div className="text-white md:w-2/3">
          <p className="mb-4">{movieDetails.overview}</p>
          <p className="text-lg mb-2">
            <strong>Release Date:</strong> {movieDetails.release_date}
          </p>
          <p className="text-lg mb-2">
            <strong>Rating:</strong> {movieDetails.vote_average}
          </p>
          <p className="text-lg">
            <strong>Genres:</strong>{" "}
            {movieDetails.genres.map((genre: any) => genre.name).join(", ")}
          </p>
          {user ? (
            <div className="mt-4 flex gap-2">
              <AddFavsButton movieId={movieId} type={type}/>
              <AddWatchlistButton movieId={movieId} type={type}/>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="mt-8">
        <MovieCarousel
          movies={similarMovies.results}
          title="You may also like"
          type={type}
        />
      </div>
    </div>
  );
};

export default ClientMovieDetails;
