"use client";

import useSWR from "swr";
import MovieCarousel from "@/components/MovieCarousel"; // Adjust the path as needed
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { fetcher } from "@/utils/fetcher";

const MoviesPage = () => {
  const type = "movie";
  const { data: popularMovies, error: popularError } = useSWR('/api/movies?type=popularMovies', fetcher);
  const { data: topRatedMovies, error: topRatedError } = useSWR('/api/movies?type=topRatedMovies', fetcher);
  const { data: actionMovies, error: actionError } = useSWR('/api/movies?type=actionMovies', fetcher);
  const { data: comedyMovies, error: comedyError } = useSWR('/api/movies?type=comedyMovies', fetcher);
  const { data: horrorMovies, error: horrorError } = useSWR('/api/movies?type=horrorMovies', fetcher);
  const { data: sciFiMovies, error: sciFiError } = useSWR('/api/movies?type=sciFiMovies', fetcher);
  const { data: romanceMovies, error: romanceError } = useSWR('/api/movies?type=romanceMovies', fetcher);


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
