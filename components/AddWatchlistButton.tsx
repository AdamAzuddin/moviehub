import React, { useState } from "react";
import { Plus } from "lucide-react";
import useStore from "@/store/store";
import { db } from "@/lib/firebase";
import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

interface AddWatchlistButtonProps {
  movieId: string;
  type: "movie" | "tv";
}

const AddWatchlistButton: React.FC<AddWatchlistButtonProps> = ({ movieId, type }) => {
  const [error, setError] = useState("")
  const { user } = useAuth(); // Get the current authenticated user
  const watchlist = useStore((state) => state.watchlist);
  const addToWatchlist = useStore((state) => state.addToWatchlist);

  const handleClick = async () => {
    if (!user) {
      console.log("No user is logged in.");
      return;
    }
  
    try {
      // Query to find the document where the `uid` field matches the user's UID
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("uid", "==", user.uid));
      const userSnapshot = await getDocs(q);
  
      if (!userSnapshot.empty) {
        // Assuming there's only one document per user
        const userDocRef = userSnapshot.docs[0].ref;
  
        // Create an item object with movieId and type
        const item = { movieId, type };
  
        // Check if the item is already in the watchlist
        const isInWatchlist = watchlist.some(
          (watchlistItem) => watchlistItem.movieId === movieId && watchlistItem.type === type
        );
  
        if (isInWatchlist) {
          setError("This movie/TV show is already in your watchlist.");
        } else {
          // Add to watchlist
          await updateDoc(userDocRef, {
            watchlist: arrayUnion(item),
          });
          addToWatchlist(item); // Pass the entire item object
        }
      } else {
        console.error("User data not found in Firestore");
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };
  

  return (
    <div>
      <button
        className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition"
        onClick={handleClick}
      >
        <Plus className="w-4 h-4" />
      </button>
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default AddWatchlistButton;
