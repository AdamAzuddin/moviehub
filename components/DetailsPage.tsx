// app/details/[movieId]/page.tsx
import ClientMovieDetails from "@/components/ClientMovieDetails";
import { MovieDetails } from "@/types/types";

const DetailsPage = async ({ id, mediaType }: MovieDetails) => {
  return (
    <ClientMovieDetails id={id} mediaType={mediaType}/>
  );
};

export default DetailsPage;
