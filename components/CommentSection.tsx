import { useState, ChangeEvent, FormEvent } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define type for comment
interface Comment {
  id: number
  text: string
  author: string
  avatar: string
}

// Define props types for MovieComments
interface MovieCommentsProps {
  commentCount?: number
}

export default function CommentSection({
  commentCount = 0,
}: MovieCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>('')

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment, author: 'User', avatar: '/placeholder-user.jpg' }])
      setNewComment('')
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Comments ({commentCount + comments.length})</h2>
      
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
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
              className="w-full min-h-[80px]"
            />
            <Button type="submit" className="mt-2">Comment</Button>
          </div>
        </div>
      </form>

      <ScrollArea className="h-[400px] rounded-md border p-4">
        {comments.length === 0 && commentCount === 0 ? (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4 mb-4">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{comment.author}</p>
                <p className="text-sm text-muted-foreground">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  )
}
