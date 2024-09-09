"use client";

import MovieBanner from "@/components/MovieBanner";
import MovieCarousel from "@/components/MovieCarousel";
import useSWR from "swr";
import { TMDB_BASE_URL } from "@/constants/constants";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  // Fetch data for the movie banner (e.g., popular movies)
  const { data: bannerMovies, error: bannerError } = useSWR(
    `${TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  // Fetch data for movies
  const { data: popularMovies, error: popularError } = useSWR(
    `${TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  const { data: topRatedMovies, error: topRatedError } = useSWR(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  const { data: actionMovies, error: actionError } = useSWR(
    `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28`,
    fetcher
  );
  const { data: comedyMovies, error: comedyError } = useSWR(
    `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35`,
    fetcher
  );
  const { data: horrorMovies, error: horrorError } = useSWR(
    `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=27`,
    fetcher
  );

  // Fetch data for TV series
  const { data: popularSeries, error: seriesError } = useSWR(
    `${TMDB_BASE_URL}/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  const { data: dramaSeries, error: dramaError } = useSWR(
    `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=18`,
    fetcher
  );
  const { data: sciFiSeries, error: sciFiError } = useSWR(
    `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10765`,
    fetcher
  );
  const { data: comedySeries, error: comedySeriesError } = useSWR(
    `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35`,
    fetcher
  );

  if (
    bannerError ||
    popularError ||
    topRatedError ||
    seriesError ||
    actionError ||
    comedyError ||
    horrorError ||
    dramaError ||
    sciFiError ||
    comedySeriesError
  )
    return <div>Failed to load</div>;
  if (
    !bannerMovies ||
    !popularMovies ||
    !topRatedMovies ||
    !popularSeries ||
    !actionMovies ||
    !comedyMovies ||
    !horrorMovies ||
    !dramaSeries ||
    !sciFiSeries ||
    !comedySeries
  )
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner className="w-8 h-8" />
      </div>
    );

  return (
    <main>
      {/* MovieBanner at the top */}
      <MovieBanner movies={bannerMovies.results} type="movie" />

      {/* Mixed carousels of Movies and TV Series */}
      <MovieCarousel
        movies={popularMovies.results}
        title="Popular Movies"
        type="movie"
      />
      <MovieCarousel
        movies={dramaSeries.results}
        title="Drama TV Series"
        type="tv"
      />
      <MovieCarousel
        movies={topRatedMovies.results}
        title="Top Rated Movies"
        type="movie"
      />
      <MovieCarousel
        movies={sciFiSeries.results}
        title="Sci-Fi TV Series"
        type="tv"
      />
      <MovieCarousel
        movies={actionMovies.results}
        title="Action Movies"
        type="movie"
      />
      <MovieCarousel
        movies={comedySeries.results}
        title="Comedy TV Series"
        type="tv"
      />
      <MovieCarousel
        movies={comedyMovies.results}
        title="Comedy Movies"
        type="movie"
      />
      <MovieCarousel
        movies={horrorMovies.results}
        title="Horror Movies"
        type="movie"
      />
      <MovieCarousel
        movies={popularSeries.results}
        title="Popular TV Series"
        type="tv"
      />
    </main>
  );
};

export default Home;
