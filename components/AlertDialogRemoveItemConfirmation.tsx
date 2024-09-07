import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useRemoveFromFavourites from "@/hooks/useRemoveFromFavourites";
import useRemoveFromWatchlist from "@/hooks/useRemoveFromWatchlist";
import { ListsItemProps } from "@/types/types";
import { MinusCircleIcon } from "lucide-react";
import useStore from "@/store/store";

export function AlertDialogRemoveItemConfirmation({
  item,
  listType,
}: ListsItemProps) {
  const uid = useStore((state) => state.uid);
  const { removeFavourite } = useRemoveFromFavourites();
  const { removeWatchlist } = useRemoveFromWatchlist();

  const handleRemoveFromList = async (
    uid: string,
    movieId: number,
    mediaType: "movie" | "tv",
    listType: "favourites" | "watchlist"
  ) => {
    if (listType === "favourites") {
      await removeFavourite(uid, movieId, mediaType);
    } else if (listType === "watchlist") {
      await removeWatchlist(uid, movieId, mediaType);
    } else {
      console.error("Invalid list type");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-500 hover:border-red-500"
        >
          <MinusCircleIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove{" "}
            {item.title || item.name || "this item"} from your {listType}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              handleRemoveFromList(uid, item.id, item.mediaType, listType)
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
