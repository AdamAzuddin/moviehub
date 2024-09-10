import React, { useState } from "react";
import { Heart } from "lucide-react";
import useStore from "@/store/store";
import { db } from "@/lib/firebase";
import {
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

const AddFavsButton = ({ id, mediaType }: {id: number, mediaType: 'movie' | 'tv'}) => {
  const { user } = useAuth(); // Get the current authenticated user
  const favourites = useStore((state) => state.favourites);
  const addToFavourites = useStore((state) => state.addToFavourites);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleClick = async () => {
    if (!user) {
      setError("You need to be logged in to add to favourites.");
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
        const item = { id, mediaType };

        // Check if the item is already in favourites
        const isFavourite = favourites.some(
          (favItem) => favItem.id === id && favItem.mediaType === mediaType
        );

        if (isFavourite) {
          // If already in favourites, set error message
          setError("This movie/TV show is already in your favourites.");
        } else {
          // Add to favourites
          await updateDoc(userDocRef, {
            favourites: arrayUnion(item),
          });
          addToFavourites(item); // Pass the entire item object
          setError(null); // Clear any previous error messages
          setSuccess("Item added to favourites!");
          // Hide success message after 3 seconds
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        }
      } else {
        setError("User data not found in Firestore.");
      }
    } catch (error) {
      setError("Error updating favourites. Please try again.");
      console.error("Error updating favourites:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition cypress-add-to-favourites"
        onClick={handleClick}
      >
        <Heart className="w-4 h-4" />
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default AddFavsButton;
