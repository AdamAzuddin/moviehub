import { useRouter } from 'next/navigation';
import useStore from "@/store/store";
import { query, where, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import your Firebase instance

const useRemoveFromFavourites = () => {
  const router = useRouter();
  const removeFromFavourites = useStore((state) => state.removeFromFavourites);

  const removeFavourite = async (uid: string, movieId: number, mediaType: 'movie' | 'tv') => {
    try {
      // Query Firestore to find the user document with the matching uid
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User document not found.");
        return;
      }

      // Assuming we have the user's document
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const favourites = userData.favourites || [];

      // Find the index of the object that matches movieId
      const indexToRemove = favourites.findIndex((item: { id: number }) => item.id === movieId);

      if (indexToRemove){
        console.log(indexToRemove)
      }
      else{
        console.log("Index to remove not found")
      }

      // If the item is found, remove it
      if (indexToRemove !== -1) {
        favourites.splice(indexToRemove, 1);

        // Update the favourites field in Firestore
        await updateDoc(userDoc.ref, { favourites });
        console.log("Item removed from favourites");

        // Update Zustand store
        removeFromFavourites({ id: movieId, mediaType: mediaType });
        console.log("Zustand store updated");
        router.refresh()
      } else {
        console.log("Item not found in favourites");
      }

    } catch (error) {
      console.error("Error removing item from favourites:", error);
    }
  };

  return { removeFavourite };
};

export default useRemoveFromFavourites;
