// hooks/useMovieNavigation.ts
import { useRouter } from 'next/navigation';

const useMovieNavigation = () => {
  const router = useRouter();

  const handleMovieClick = (id: number, type: 'movie' | 'tv') => {
    router.push(`/details/${type}/${id}`);
  };

  return { handleMovieClick };
};

export default useMovieNavigation;
