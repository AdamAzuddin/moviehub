"use client"
import ClientMovieDetails from "@/components/ClientMovieDetails";

const DetailsPage = ({ params }: { params: { type: 'movie' | 'tv'; id: number } }) => {
  const { type, id } = params;

  return (
    <ClientMovieDetails
      id={id}
      mediaType={type}
    />
  );
};

export default DetailsPage;
