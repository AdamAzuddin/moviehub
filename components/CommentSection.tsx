import { useState, ChangeEvent, FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import useStore from "@/store/store";
import { MovieDetails } from "@/types/types";
import { db } from "@/lib/firebase";
import { Comment } from "@/types/types";
import { addDoc, collection } from "firebase/firestore";
// Define type for comment

// Define props types for MovieComments
interface MovieCommentsProps {
  commentCount?: number;
  mediaId: number;
  mediaType: 'movie' | 'tv';
}

async function addMediaToMediaCollectionFirebase(media: MovieDetails) {
  try {
    // Reference to the "media" collection
    const mediaCollection = collection(db, "media");

    // Add the media object to the collection
    const docRef = await addDoc(mediaCollection, media);

    console.log("Media added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding media: ", error);
  }
}

export default function CommentSection({
  commentCount = 0,
  mediaId,
  mediaType
}: MovieCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isOnMediaCollectionFirebase, setIsOnMediaCollectionFirebase] =
    useState(false);
  const uid = useStore((state) => state.uid);
  const username = useStore((state) => state.username);
  const profilePic = useStore((state) => state.profilePic);

  // State to handle reply inputs
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const generateCommentId = async () => {
    const { v4: uuidv4 } = await import('uuid'); // Dynamically import the uuid library
    return uuidv4(); // Generate and return the unique ID
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentId = await generateCommentId();
    const mediaParams: MovieDetails = {
      id: mediaId,
      mediaType: mediaType
    }
    if (!isOnMediaCollectionFirebase) {
      addMediaToMediaCollectionFirebase(mediaParams);
    }
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: commentId,
          text: newComment,
          authorId: uid,
          authorUsername: username,
          avatar: profilePic,
          mediaId: mediaId,
          mediaType: mediaType,
          replies: [],
        },
      ]);
      setNewComment("");
    }
  };

  // Handle reply submit
  const handleReplySubmit = async(
    e: FormEvent<HTMLFormElement>,
    commentId: string
  ) => {
    e.preventDefault();
    const replyText = replyInputs[commentId];
    const replyId = await generateCommentId();

    if (replyText.trim()) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: replyId,
                text: replyText,
                authorId: uid,
                authorUsername: username,
                avatar: profilePic,
                mediaId: mediaId,
                mediaType
              },
            ],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyInputs({ ...replyInputs, [commentId]: "" }); // Clear the reply input
    }
  };

  // Handle reply input change
  const handleReplyInputChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    commentId: string
  ) => {
    setReplyInputs({ ...replyInputs, [commentId]: e.target.value });
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Comments ({commentCount + comments.length})
      </h2>

      <form onSubmit={handleCommentSubmit} className="mb-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="@user" />
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
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.authorUsername} />
                  <AvatarFallback>{comment.authorUsername[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{comment.authorUsername}</p>
                  <p className="text-sm text-muted-foreground">
                    {comment.text}
                  </p>
                </div>
              </div>

              {/* Replies Section */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="pl-12 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src={reply.avatar} alt={reply.authorUsername} />
                        <AvatarFallback>{reply.authorUsername[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{reply.authorUsername}</p>
                        <p className="text-sm text-muted-foreground">
                          {reply.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              <form
                onSubmit={(e) => handleReplySubmit(e, comment.id)}
                className="pl-12 mt-2"
              >
                <Textarea
                  placeholder={`Reply to ${comment.authorUsername}`}
                  value={replyInputs[comment.id] || ""}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handleReplyInputChange(e, comment.id)
                  }
                  className="w-full min-h-[50px]"
                />
                <Button type="submit" size="sm" className="mt-2">
                  Reply
                </Button>
              </form>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
