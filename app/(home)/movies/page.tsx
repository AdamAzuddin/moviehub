"use client";

import { TMDB_BASE_URL } from "@/constants/constants";
import useSWR from "swr";
import MovieCarousel from "@/components/MovieCarousel"; // Adjust the path as needed
import { LoadingSpinner } from "@/components/LoadingSpinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MoviesPage = () => {
  const type = "movie";
  // Fetch data for different genres of movies
  const { data: popularMovies, error: popularError } = useSWR(
    `${TMDB_BASE_URL}/${type}/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  const { data: topRatedMovies, error: topRatedError } = useSWR(
    `${TMDB_BASE_URL}/${type}/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  const { data: actionMovies, error: actionError } = useSWR(
    `${TMDB_BASE_URL}/discover/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28`,
    fetcher
  );
  const { data: comedyMovies, error: comedyError } = useSWR(
    `${TMDB_BASE_URL}/discover/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35`,
    fetcher
  );
  const { data: horrorMovies, error: horrorError } = useSWR(
    `${TMDB_BASE_URL}/discover/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=27`,
    fetcher
  );
  const { data: sciFiMovies, error: sciFiError } = useSWR(
    `${TMDB_BASE_URL}/discover/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=878`,
    fetcher
  );
  const { data: romanceMovies, error: romanceError } = useSWR(
    `${TMDB_BASE_URL}/discover/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10749`,
    fetcher
  );

  if (
    popularError ||
    topRatedError ||
    actionError ||
    comedyError ||
    horrorError ||
    sciFiError ||
    romanceError
  )
    return <div>Failed to load</div>;
  if (
    !popularMovies ||
    !topRatedMovies ||
    !actionMovies ||
    !comedyMovies ||
    !horrorMovies ||
    !sciFiMovies ||
    !romanceMovies
  )
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner className="w-8 h-8" />
      </div>
    );

  return (
    <div>
      {/* Movie carousels */}
      <MovieCarousel
        movies={popularMovies.results}
        title="Popular"
        type={type}
      />
      <MovieCarousel movies={actionMovies.results} title="Action" type={type} />
      <MovieCarousel movies={comedyMovies.results} title="Comedy" type={type} />
      <MovieCarousel
        movies={topRatedMovies.results}
        title="Top Rated"
        type={type}
      />
      <MovieCarousel movies={sciFiMovies.results} title="Sci-Fi" type={type} />
      <MovieCarousel
        movies={romanceMovies.results}
        title="Romance"
        type={type}
      />
      <MovieCarousel movies={horrorMovies.results} title="Horror" type={type} />
    </div>
  );
};

export default MoviesPage;
