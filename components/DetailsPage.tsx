// app/details/[movieId]/page.tsx
import ClientMovieDetails from "@/components/ClientMovieDetails";
import { MovieDetails } from "@/types/types";

const DetailsPage = async ({ id, filmType }: MovieDetails) => {
  return (
    <ClientMovieDetails id={id} filmType={filmType}/>
  );
};

export default DetailsPage;
