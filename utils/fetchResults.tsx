import { MovieDetails } from "@/types/types";

export async function fetchResults(query: string): Promise<MovieDetails[]> {
    if (!query) return [];
  
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`
      );
      const data = await response.json();
      return data.results.map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        mediaType: item.media_type === 'tv' ? 'tv' : 'movie',
      }));
    } catch (error) {
      console.error('Error fetching data from TMDB', error);
      return [];
    }
  }
  