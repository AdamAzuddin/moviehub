import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MovieDetails } from "@/types/types";

// Function to add media to the "media" collection and initialize an empty "comments" subcollection
export async function addMediaToMediaCollectionFirebase(media: MovieDetails) {
  try {
    // Reference to the "media" collection
    const mediaCollection = collection(db, "media");

    // Add the media object to the collection
    const mediaDocRef = await addDoc(mediaCollection, media);
    
    // Create an empty document in the "comments" subcollection
    const commentsSubcollectionRef = collection(db, `media/${mediaDocRef.id}/comments`);
    
    // Placeholder document to ensure the "comments" subcollection exists
    await setDoc(doc(commentsSubcollectionRef, 'initial'), {});
    
    console.log("Media added with ID: ", mediaDocRef.id);
  } catch (error) {
    console.error("Error adding media: ", error);
  }
}
