// /app/search-results/page.tsx
import { MovieDetails } from '@/types/types';
import SearchResultsList from '@/components/SearchResultsList';

// Fetch results on the server side
async function fetchResults(query: string): Promise<MovieDetails[]> {
  if (!query) return [];

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
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

// Component that uses the server component
const SearchResultsPage = async ({ searchParams }: { searchParams: { query?: string } }) => {
  const searchQuery = searchParams.query || '';
  const results = await fetchResults(searchQuery);

  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-3xl text-gray-200 mb-4">
        Search Results for &quot;{searchQuery}&quot;
      </h1>
      <SearchResultsList results={results} />
    </div>
  );
};

export default SearchResultsPage;
