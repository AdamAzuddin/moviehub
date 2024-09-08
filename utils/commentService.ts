import { collection, addDoc, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Comment } from "@/types/types";

// Function to add a comment to a media document
export async function addCommentToMedia(mediaId: number, comment: Comment) {
  try {
    // Reference to the "media" collection
    const mediaCollection = collection(db, "media");
    
    // Query to find the media document with the specified mediaId
    const q = query(mediaCollection, where("id", "==", mediaId));
    const mediaSnapshot = await getDocs(q);

    if (!mediaSnapshot.empty) {
      // Get the reference to the media document
      const mediaDocRef = mediaSnapshot.docs[0].ref;

      // Create a reference to the "comments" subcollection within the media document
      const commentsSubcollectionRef = collection(db, `media/${mediaDocRef.id}/comments`);
      
      
      // Add the comment to the comments subcollection
      const commentDocRef = await addDoc(commentsSubcollectionRef, comment);
      const repliesSubcollectionRef = collection(db, `media/${mediaDocRef.id}/comments/${commentDocRef.id}/replies`);
      
      await setDoc(doc(repliesSubcollectionRef, "initial"), {});
      
      console.log("Comment added with ID: ", commentDocRef.id);
    } else {
      console.error("No media document found with ID: ", mediaId);
    }
  } catch (error) {
    console.error("Error adding comment: ", error);
  }
}
