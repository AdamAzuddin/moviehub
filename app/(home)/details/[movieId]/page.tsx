// app/details/[movieId]/page.tsx
import ClientMovieDetails from "@/components/ClientMovieDetails";
import { TMDB_BASE_URL } from "@/constants/constants";

const fetchMovieDetails = async (movieId: string) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const DetailsPage = async ({ params }: { params: { movieId: string } }) => {
  const { movieId } = params;

  // Fetch movie details for initial rendering
  const movieDetails = await fetchMovieDetails(movieId);

  if (!movieDetails) {
    return <div>Movie not found</div>;
  }

  return (
    <ClientMovieDetails movieId={movieId} />
  );
};

export default DetailsPage;
