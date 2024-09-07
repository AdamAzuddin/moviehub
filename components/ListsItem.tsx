import React, { useState } from "react";
import Image from "next/image";
import { MovieDetails } from "@/types/types";
import useMovieNavigation from "@/hooks/useMovieNavigation";
import MinusCircleIcon from "./icons/MinusCircleIcon";
import useRemoveFromFavourites from "@/hooks/useRemoveFromFavourites";
import useRemoveFromWatchlist from "@/hooks/useRemoveFromWatchlist";
import useStore from "@/store/store";
import { AlertDialogRemoveItemConfirmation } from "./AlertDialogRemoveItemConfirmation";
import { ListsItemProps } from "@/types/types";

const ListsItemComponent: React.FC<ListsItemProps> = ({ item, listType }) => {
  const { handleMovieClick } = useMovieNavigation();
  
  return (
    <div className="relative p-4 border rounded-lg shadow-md flex flex-col">
      <div
        key={item.id}
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

      {/* Title and button container */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-left text-lg font-semibold">
          {item.title || item.name}
        </p>
        <AlertDialogRemoveItemConfirmation item={item} listType={listType}/>
      </div>
    </div>
  );
};

export default ListsItemComponent;
