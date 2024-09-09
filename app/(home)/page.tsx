"use client";

import MovieBanner from "@/components/MovieBanner";
import MovieCarousel from "@/components/MovieCarousel";
import useSWR from "swr";
import { TMDB_BASE_URL } from "@/constants/constants";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data: bannerMovies, error: bannerError } = useSWR(
    `${TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  if (bannerError) return <div>Failed to load</div>;
  if (!bannerMovies)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner className="w-8 h-8" />
      </div>
    );

  return (
    <main>
      <MovieBanner movies={bannerMovies.results} type="movie" />
      <LazyLoadedCarousels />
    </main>
  );
};

const LazyLoadedCarousels = () => {
  // Fetch data for the other carousels lazily
  const { data: popularMovies } = useSWR(
    `${TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  const { data: topRatedMovies } = useSWR(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  const { data: actionMovies} = useSWR(
    `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28`,
    fetcher
  );
  const { data: comedyMovies} = useSWR(
    `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35`,
    fetcher
  );
  const { data: horrorMovies} = useSWR(
    `${TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=27`,
    fetcher
  );

  const { data: popularSeries} = useSWR(
    `${TMDB_BASE_URL}/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  const { data: dramaSeries} = useSWR(
    `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=18`,
    fetcher
  );
  const { data: sciFiSeries} = useSWR(
    `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10765`,
    fetcher
  );
  const { data: comedySeries} = useSWR(
    `${TMDB_BASE_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35`,
    fetcher
  );

  return (
    <>
  {popularMovies ? (
    <MovieCarousel
      movies={popularMovies.results}
      title="Popular Movies"
      type="movie"
    />
  ) : (
    <div className="flex items-center justify-center h-48">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  )}

  {dramaSeries ? (
    <MovieCarousel
      movies={dramaSeries.results}
      title="Drama TV Series"
      type="tv"
    />
  ) : (
    <div className="flex items-center justify-center h-48">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  )}

  {topRatedMovies ? (
    <MovieCarousel
      movies={topRatedMovies.results}
      title="Top Rated Movies"
      type="movie"
    />
  ) : (
    <div className="flex items-center justify-center h-48">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  )}

  {sciFiSeries ? (
    <MovieCarousel
      movies={sciFiSeries.results}
      title="Sci-Fi TV Series"
      type="tv"
    />
  ) : (
    <div className="flex items-center justify-center h-48">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  )}

  {actionMovies ? (
    <MovieCarousel
      movies={actionMovies.results}
      title="Action Movies"
      type="movie"
    />
  ) : (
    <div className="flex items-center justify-center h-48">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  )}

  {comedySeries ? (
    <MovieCarousel
      movies={comedySeries.results}
      title="Comedy TV Series"
      type="tv"
    />
  ) : (
    <div className="flex items-center justify-center h-48">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  )}

  {comedyMovies ? (
    <MovieCarousel
      movies={comedyMovies.results}
      title="Comedy Movies"
      type="movie"
    />
  ) : (
    <div className="flex items-center justify-center h-48">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  )}

  {horrorMovies ? (
    <MovieCarousel
      movies={horrorMovies.results}
      title="Horror Movies"
      type="movie"
    />
  ) : (
    <div className="flex items-center justify-center h-48">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  )}

  {popularSeries ? (
    <MovieCarousel
      movies={popularSeries.results}
      title="Popular TV Series"
      type="tv"
    />
  ) : (
    <div className="flex items-center justify-center h-48">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  )}
</>

  );
};
export default Home;
