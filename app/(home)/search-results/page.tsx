// /app/search-results/page.tsx
import SearchResultsList from '@/components/SearchResultsList';
import { fetchResults } from '@/utils/fetchResults';
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
