// app/details/[type]/[movieId]/page.tsx
import ClientMovieDetails from "@/components/ClientMovieDetails";
import { TMDB_BASE_URL } from "@/constants/constants";

// Function to fetch movie or TV details based on type
const fetchDetails = async (movieId: string, type: 'movie' | 'tv') => {
  
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${type}/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    
    // Ensure response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse response body once
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching details:", error);
    return null;
  }
};


const DetailsPage = async ({ params }: { params: { type: 'movie' | 'tv'; id: string } }) => {
  const { type, id } = params;
  const movieDetails = await fetchDetails(id, type);
  if (!movieDetails) {
    return <div>Movie not found</div>;
  }

  return (
    <ClientMovieDetails movieId={id} type={type}/>
  );
};



export default DetailsPage;
