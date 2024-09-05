import React from "react";
import Image from 'next/image';
import { MovieDetails } from "@/types/types";
import useMovieNavigation from "@/hooks/useMovieNavigation";

// Define the props type
interface ListsItemProps {
  item: MovieDetails;
}

const ListsItemComponent: React.FC<ListsItemProps> = ({ item }) => {
  const { handleMovieClick } = useMovieNavigation();

  return (
    <div>
      <div
        key={item.id}
        className="p-4 border rounded-lg shadow-md"
        onClick={() => handleMovieClick(item.id, item.filmType)}
      >
        <Image
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "/images/movie-poster-placeholder.png"
          }
          alt={item.title || item.name || "Movie Poster"}
          width={200}
          height={300}
          layout="responsive"
          className="rounded-lg"
          placeholder="blur"
          blurDataURL="/images/movie-poster-placeholder.png"
        />
      </div>
    </div>
  );
};

export default ListsItemComponent;
