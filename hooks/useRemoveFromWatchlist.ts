import { useRouter } from 'next/navigation';
import useStore from "@/store/store";
import { query, where, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import your Firebase instance

const useRemoveFromWatchlist = () => {
  const router = useRouter();
  const removeFromWatchlist = useStore((state) => state.removeFromWatchlist);

  const removeWatchlist = async (uid: string, movieId: number, mediaType: 'movie' | 'tv') => {
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
      const watchlist = userData.watchlist || [];

      // Find the index of the object that matches movieId
      const indexToRemove = watchlist.findIndex((item: { id: string }) => item.id === movieId.toString());

      // If the item is found, remove it
      if (indexToRemove !== -1) {
        watchlist.splice(indexToRemove, 1);

        // Update the favourites field in Firestore
        await updateDoc(userDoc.ref, { watchlist });
        console.log("Item removed from watchlist");

        // Update Zustand store
        removeFromWatchlist({ id: movieId, mediaType: mediaType });
        console.log("Zustand store updated");
        router.refresh()
      } else {
        console.log("Item not found in watchlist");
      }

    } catch (error) {
      console.error("Error removing item from favourites:", error);
    }
  };

  return { removeWatchlist };
};

export default useRemoveFromWatchlist;
