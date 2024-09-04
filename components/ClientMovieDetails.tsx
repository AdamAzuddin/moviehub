// components/ClientMovieDetails.tsx
"use client";

import useSWR from "swr";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { TMDB_BASE_URL } from "@/constants/constants";
import MovieCarousel from "@/components/MovieCarousel";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface MovieDetailsProps {
  movieId: string;
}

const ClientMovieDetails = ({ movieId }: MovieDetailsProps) => {
  // Fetch movie details
  const { data: movieDetails, error: movieError } = useSWR(
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  // Fetch similar movies
  const { data: similarMovies, error: similarError } = useSWR(
    movieId
      ? `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      : null,
    fetcher
  );

  if (movieError || similarError) {
    return <div>Failed to load</div>;
  }

  if (!movieDetails || !similarMovies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative">
        <h1 className="text-4xl font-bold mb-4 text-white">
          {movieDetails.title}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          width={500}
          height={750}
          className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-lg"
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
          <div className="mt-4 flex gap-2">
            <button className="bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition">
              <Heart className="w-4 h-4" />
            </button>
            <button className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <MovieCarousel
          movies={similarMovies.results}
          title="You may also like"
        />
      </div>
    </div>
  );
};

export default ClientMovieDetails;
