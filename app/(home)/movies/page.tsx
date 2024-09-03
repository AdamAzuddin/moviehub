"use client"
import { TMDB_BASE_URL } from '@/constants/constants';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MoviesPage = () => {
  const { data, error } = useSWR(`${TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {data.results.map((movie: { id: number; title: string }) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
