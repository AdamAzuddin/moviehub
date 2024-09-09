"use client";

import MovieBanner from "@/components/MovieBanner";
import MovieCarousel from "@/components/MovieCarousel";
import useSWR from "swr";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { fetcher } from "@/utils/fetcher";

const Home = () => {
  const { data: bannerMovies, error: bannerError } = useSWR('/api/movies?type=popularMovies', fetcher);
  const { data: popularMovies, error: popularError } = useSWR('/api/movies?type=popularMovies', fetcher);
  const { data: topRatedMovies, error: topRatedError } = useSWR('/api/movies?type=topRatedMovies', fetcher);
  const { data: actionMovies, error: actionError } = useSWR('/api/movies?type=actionMovies', fetcher);
  const { data: comedyMovies, error: comedyError } = useSWR('/api/movies?type=comedyMovies', fetcher);
  const { data: horrorMovies, error: horrorError } = useSWR('/api/movies?type=horrorMovies', fetcher);
  const { data: popularSeries, error: seriesError } = useSWR('/api/movies?type=popularSeries', fetcher);
  const { data: dramaSeries, error: dramaError } = useSWR('/api/movies?type=dramaSeries', fetcher);
  const { data: sciFiSeries, error: sciFiError } = useSWR('/api/movies?type=sciFiSeries', fetcher);
  const { data: comedySeries, error: comedySeriesError } = useSWR('/api/movies?type=comedySeries', fetcher);


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
