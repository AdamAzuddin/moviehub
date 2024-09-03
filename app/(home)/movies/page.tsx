"use client";

import { TMDB_BASE_URL } from '@/constants/constants';
import useSWR from 'swr';
import MovieCarousel from '@/components/MovieCarousel'; // Adjust the path as needed

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MoviesPage = () => {
  const { data, error } = useSWR(`${TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data)
  return (
    <div>
      <MovieCarousel movies={data.results} />
    </div>
  );
};

export default MoviesPage;
