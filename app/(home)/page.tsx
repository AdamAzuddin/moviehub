"use client"
import MovieBanner from '@/components/MovieBanner';
import { TMDB_BASE_URL } from '@/constants/constants';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSWR(`${TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main>
      <MovieBanner movies={data.results} />
      Home
    </main>
  );
};

export default Home;
