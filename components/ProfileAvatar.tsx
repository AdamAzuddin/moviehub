import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { ProfileAvatarProps } from "@/types/types"
  
  export function ProfileAvatar({profilePicUrl, altText}: ProfileAvatarProps) {
    return (
      <Avatar>
        <AvatarImage src={profilePicUrl} alt={altText} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  