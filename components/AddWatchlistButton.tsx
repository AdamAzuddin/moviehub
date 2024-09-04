import React from "react";
import { Eye, Plus } from "lucide-react";
import useStore from "@/store/store";
import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

const AddWatchlistButton = ({ movieId }: { movieId: string }) => {
  const { user } = useAuth(); // Get the current authenticated user
  const watchlist = useStore((state) => state.watchlist);
  const addToWatchlist = useStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useStore((state) => state.removeFromWatchlist);


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

        // Check if the movie is already in the watchlist
        const isInWatchlist = watchlist.includes(movieId);

        if (isInWatchlist) {
          // Remove from watchlist
          await updateDoc(userDocRef, {
            watchlist: arrayRemove(movieId),
          });
          removeFromWatchlist(movieId);
        } else {
          // Add to watchlist
          await updateDoc(userDocRef, {
            watchlist: arrayUnion(movieId),
          });
          addToWatchlist(movieId);
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
      <button className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition" onClick={handleClick}>
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AddWatchlistButton;
