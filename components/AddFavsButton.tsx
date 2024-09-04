import React from "react";
import { Heart } from "lucide-react";
import useStore from "@/store/store";
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth"; // Ensure this hook is used properly

const AddFavsButton = ({ movieId }: { movieId: string }) => {
  const { user } = useAuth(); // Get the current authenticated user
  const favourites = useStore((state) => state.favourites);
  const addToFavourites = useStore((state) => state.addToFavourites);
  const removeFromFavourites = useStore((state) => state.removeFromFavourites);


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

        // Check if the movie is already in favourites
        const isFavourite = favourites.includes(movieId);

        if (isFavourite) {
          // Remove from favourites
          await updateDoc(userDocRef, {
            favourites: arrayRemove(movieId),
          });
          removeFromFavourites(movieId);
        } else {
          // Add to favourites
          await updateDoc(userDocRef, {
            favourites: arrayUnion(movieId),
          });
          addToFavourites(movieId);
        }
      } else {
        console.error('User data not found in Firestore');
      }
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition"
        onClick={handleClick}
      >
        <Heart className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AddFavsButton;
