"use client";

import useSWR from "swr";
import MovieCarousel from "@/components/MovieCarousel"; // Adjust the path as needed
import { fetcher } from "@/utils/fetcher";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const SeriesPage = () => {
  const type = "tv";
  // Fetch data for different genres of TV series
  const { data: popularSeries, error: popularError } = useSWR('/api/movies?type=popularSeries', fetcher);
  const { data: dramaSeries, error: dramaError } = useSWR('/api/movies?type=dramaSeries', fetcher);
  const { data: comedySeries, error: comedyError } = useSWR('/api/movies?type=comedySeries', fetcher);
  const { data: sciFiSeries, error: sciFiError } = useSWR('/api/movies?type=sciFiSeries', fetcher);
  const { data: mysterySeries, error: mysteryError } = useSWR('/api/movies?type=mysterySeries', fetcher);
  const { data: actionSeries, error: actionError } = useSWR('/api/movies?type=actionSeries', fetcher);

  if (
    popularError ||
    dramaError ||
    comedyError ||
    sciFiError ||
    mysteryError ||
    actionError
  )
    return <div>Failed to load</div>;
  if (
    !popularSeries ||
    !dramaSeries ||
    !comedySeries ||
    !sciFiSeries ||
    !mysterySeries ||
    !actionSeries
  )
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner className="w-8 h-8" />
      </div>
    );

  return (
    <div>
      {/* TV Series carousels */}
      <MovieCarousel
        movies={popularSeries.results}
        title="Popular"
        type={type}
      />
      <MovieCarousel movies={dramaSeries.results} title="Drama" type={type} />
      <MovieCarousel movies={comedySeries.results} title="Comedy" type={type} />
      <MovieCarousel movies={sciFiSeries.results} title="Sci-Fi" type={type} />
      <MovieCarousel
        movies={mysterySeries.results}
        title="Mystery"
        type={type}
      />
      <MovieCarousel movies={actionSeries.results} title="Action" type={type} />
    </div>
  );
};

export default SeriesPage;
