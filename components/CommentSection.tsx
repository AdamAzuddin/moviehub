import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import useStore from "@/store/store";
import { MovieDetails, Reply } from "@/types/types";
import { db } from "@/lib/firebase";
import { Comment } from "@/types/types";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { addMediaToMediaCollectionFirebase } from "@/utils/mediaService";
import { addCommentToMedia } from "@/utils/commentService";
import { CommentSectionProps } from "@/types/types";
import CommentAvatar from "./CommentAvatar";


export default function CommentSection({
  commentCount = 0,
  mediaId,
  mediaType,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isOnMediaCollectionFirebase, setIsOnMediaCollectionFirebase] =
    useState(false);
  const [visibleReplies, setVisibleReplies] = useState<{ [key: string]: boolean }>({});
  const uid = useStore((state) => state.uid);
  const username = useStore((state) => state.username);
  const profilePic = useStore((state) => state.profilePic);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const mediaCollection = collection(db, "media");
        const q = query(mediaCollection, where("id", "==", mediaId));
        const mediaSnapshot = await getDocs(q);
  
        if (!mediaSnapshot.empty) {
          const mediaDocRef = mediaSnapshot.docs[0].ref;
          setIsOnMediaCollectionFirebase(true);
  
          const commentsSubcollectionRef = collection(
            db,
            `media/${mediaDocRef.id}/comments`
          );
  
          const commentsQuery = query(
            commentsSubcollectionRef,
            where("id", "!=", "initial")
          );
          const commentsSnapshot = await getDocs(commentsQuery);
  
          const fetchedComments: Comment[] = await Promise.all(
            commentsSnapshot.docs.map(async (doc) => {
              const data = doc.data() as Omit<Comment, "id" | "replies">;
              const commentId = doc.id;
  
              // Reference to the replies subcollection
              const repliesSubcollectionRef = collection(
                db,
                `media/${mediaDocRef.id}/comments/${commentId}/replies`
              );
  
              // Query to exclude replies with id == "initial"
              const repliesQuery = query(
                repliesSubcollectionRef,
                where("id", "!=", "initial")
              );
              const repliesSnapshot = await getDocs(repliesQuery);
              const replies = repliesSnapshot.docs.map((replyDoc) => ({
                id: replyDoc.id,
                ...replyDoc.data(),
              })) as Reply[]; // Cast to Reply type
  
              return {
                id: commentId,
                ...data,
                replies,
              };
            })
          );
  
          setComments(fetchedComments);
        } else {
          setIsOnMediaCollectionFirebase(false);
        }
      } catch (error) {
        console.error("Error fetching media data: ", error);
      }
    };
  
    fetchMediaData();
  
    return () => {
      // Cleanup if needed
    };
  }, [mediaId]);
  
  
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const generateCommentId = async () => {
    const { v4: uuidv4 } = await import("uuid"); 
    return uuidv4();
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentId = await generateCommentId();
    const mediaParams: MovieDetails = {
      id: mediaId,
      mediaType: mediaType,
      comments: [],
    };
    if (!isOnMediaCollectionFirebase) {
      addMediaToMediaCollectionFirebase(mediaParams);
    }
    if (newComment.trim()) {
      const newCommentObject = {
        id: commentId,
        text: newComment,
        authorId: uid,
        authorUsername: username,
        avatar: profilePic,
        mediaId: mediaId,
        mediaType: mediaType,
        replies: [],
      };
      setComments([...comments, newCommentObject]);
      await addCommentToMedia(mediaId, newCommentObject);
      setNewComment("");
    }
  };

  // Handle reply submit
  const handleReplySubmit = async (
    e: FormEvent<HTMLFormElement>,
    commentId: string
  ) => {
    e.preventDefault();
    const replyText = replyInputs[commentId];
    const replyId = await generateCommentId();
    console.log("Replying to comment with id: " + commentId);

    if (replyText.trim()) {
      try {
        // Reference to the media document's comments subcollection
        const mediaCollection = collection(db, "media");
        const mediaQuery = query(mediaCollection, where("id", "==", mediaId));
        const mediaSnapshot = await getDocs(mediaQuery);

        if (!mediaSnapshot.empty) {
          const mediaDocRef = mediaSnapshot.docs[0].ref;
          const commentsSubcollectionRef = collection(
            db,
            `media/${mediaDocRef.id}/comments`
          );

          const commentQuery = query(
            commentsSubcollectionRef,
            where("id", "==", commentId)
          );
          const commentSnapshot = await getDocs(commentQuery);
          if (!commentSnapshot.empty) {
            const commentDocRef = commentSnapshot.docs[0].ref;
            const repliesSubcollectionRef = collection(
              db,
              `media/${mediaDocRef.id}/comments/${commentDocRef.id}/replies`
            );
            const newReply = {
              id: replyId,
              text: replyText,
              authorId: uid,
              authorUsername: username,
              avatar: profilePic,
              mediaId: mediaId,
              mediaType,
            };

            await addDoc(repliesSubcollectionRef, newReply);

            // Update local state
            const updatedComments = comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [...(comment.replies || []), newReply],
                };
              }
              return comment;
            });
            setComments(updatedComments);
            setReplyInputs({ ...replyInputs, [commentId]: "" });
          }
        }
      } catch (error) {
        console.error("Error saving reply: ", error);
      }
    }
  };

  // Handle reply input change
  const handleReplyInputChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    commentId: string
  ) => {
    setReplyInputs({ ...replyInputs, [commentId]: e.target.value });
  };

  // Toggle replies visibility
  const toggleRepliesVisibility = (commentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Comments ({commentCount + comments.length})
      </h2>

      <form onSubmit={handleCommentSubmit} className="mb-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={profilePic} alt={username} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <Textarea
              placeholder={`Add a comment`}
              value={newComment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setNewComment(e.target.value)
              }
              className="w-full min-h-[80px]"
            />
            <Button type="submit" className="mt-2">
              Comment
            </Button>
          </div>
        </div>
      </form>

      <ScrollArea className="h-[400px] rounded-md border p-4">
        {comments.length === 0 && commentCount === 0 ? (
          <p className="text-center text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-4 mb-4">
              <div className="flex space-x-4">
                <CommentAvatar username={comment.authorUsername} profilePic={comment.avatar} uid={comment.authorId}/>
                <div>
                  <p className="font-semibold">{comment.authorUsername}</p>
                  <p className="text-sm text-muted-foreground">
                    {comment.text}
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => toggleRepliesVisibility(comment.id)}
                  className="text-blue-500"
                >
                  {visibleReplies[comment.id]
                    ? "Hide Replies"
                    : "Show Replies"}
                </button>
                {visibleReplies[comment.id] && (
                  <div className="ml-6">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-4 mb-2">
                        <Avatar>
                          <AvatarImage src={reply.avatar} alt={reply.authorUsername} />
                          <AvatarFallback>
                            {reply.authorUsername ? reply.authorUsername[0] : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{reply.authorUsername}</p>
                          <p>{reply.text}</p>
                        </div>
                      </div>
                    ))}
                    <form
                      onSubmit={(e) => handleReplySubmit(e, comment.id)}
                      className="mt-2"
                    >
                      <Textarea
                        placeholder={`Reply to ${comment.authorUsername}`}
                        value={replyInputs[comment.id] || ""}
                        onChange={(e) => handleReplyInputChange(e, comment.id)}
                      />
                      <Button type="submit" className="mt-2">
                        Reply
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
