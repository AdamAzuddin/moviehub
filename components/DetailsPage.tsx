// app/details/[movieId]/page.tsx
import ClientMovieDetails from "@/components/ClientMovieDetails";
import { MovieDetails } from "@/types/types";

const DetailsPage = async ({ movieId, type }: MovieDetails) => {
  return (
    <ClientMovieDetails movieId={movieId} type={type}/>
  );
};

export default DetailsPage;
