"use client";

import useSWR from 'swr';
import MovieCarousel from '@/components/MovieCarousel'; // Adjust the path as needed
import { TMDB_BASE_URL } from '@/constants/constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SeriesPage = () => {
  // Fetch data for different genres of TV series
  const { data: popularSeries, error: popularError } = useSWR(`${TMDB_BASE_URL}/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, fetcher);
  const { data: dramaSeries, error: dramaError } = useSWR(`${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=18`, fetcher);
  const { data: comedySeries, error: comedyError } = useSWR(`${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35`, fetcher);
  const { data: sciFiSeries, error: sciFiError } = useSWR(`${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10765`, fetcher);
  const { data: mysterySeries, error: mysteryError } = useSWR(`${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=9648`, fetcher);
  const { data: actionSeries, error: actionError } = useSWR(`${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10759`, fetcher);

  if (popularError || dramaError || comedyError || sciFiError || mysteryError || actionError) 
    return <div>Failed to load</div>;
  if (!popularSeries || !dramaSeries || !comedySeries || !sciFiSeries || !mysterySeries || !actionSeries) 
    return <div>Loading...</div>;

  return (
    <div>
      {/* TV Series carousels */}
      <MovieCarousel movies={popularSeries.results} title="Popular" />
      <MovieCarousel movies={dramaSeries.results} title="Drama" />
      <MovieCarousel movies={comedySeries.results} title="Comedy" />
      <MovieCarousel movies={sciFiSeries.results} title="Sci-Fi" />
      <MovieCarousel movies={mysterySeries.results} title="Mystery" />
      <MovieCarousel movies={actionSeries.results} title="Action" />
    </div>
  );
};

export default SeriesPage;
