// utils/fetchSimilarMovies.ts
import { TMDB_BASE_URL } from "@/constants/constants";

const fetchSimilarMovies = async (movieId: string) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch similar movies");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchSimilarMovies;
