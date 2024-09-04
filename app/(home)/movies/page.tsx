"use client";

import { TMDB_BASE_URL } from '@/constants/constants';
import useSWR from 'swr';
import MovieCarousel from '@/components/MovieCarousel'; // Adjust the path as needed

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MoviesPage = () => {
  // Fetch data for different genres of movies
  const { data: popularMovies, error: popularError } = useSWR(`${TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, fetcher);
  const { data: topRatedMovies, error: topRatedError } = useSWR(`${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, fetcher);
  const { data: actionMovies, error: actionError } = useSWR(`${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28`, fetcher);
  const { data: comedyMovies, error: comedyError } = useSWR(`${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35`, fetcher);
  const { data: horrorMovies, error: horrorError } = useSWR(`${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=27`, fetcher);
  const { data: sciFiMovies, error: sciFiError } = useSWR(`${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=878`, fetcher);
  const { data: romanceMovies, error: romanceError } = useSWR(`${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10749`, fetcher);

  if (popularError || topRatedError || actionError || comedyError || horrorError || sciFiError || romanceError) 
    return <div>Failed to load</div>;
  if (!popularMovies || !topRatedMovies || !actionMovies || !comedyMovies || !horrorMovies || !sciFiMovies || !romanceMovies) 
    return <div>Loading...</div>;

  return (
    <div>
      {/* Movie carousels */}
      <MovieCarousel movies={popularMovies.results} title="Popular" />
      <MovieCarousel movies={actionMovies.results} title="Action" />
      <MovieCarousel movies={comedyMovies.results} title="Comedy" />
      <MovieCarousel movies={topRatedMovies.results} title="Top Rated" />
      <MovieCarousel movies={sciFiMovies.results} title="Sci-Fi" />
      <MovieCarousel movies={romanceMovies.results} title="Romance" />
      <MovieCarousel movies={horrorMovies.results} title="Horror" />
    </div>
  );
};

export default MoviesPage;
