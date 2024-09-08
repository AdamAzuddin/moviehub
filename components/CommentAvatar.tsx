"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface UserDetails {
  uid: string;
  username: string;
  profilePic: string;
}

export default function CommentAvatar(userDetails: UserDetails) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <Avatar
        className="h-10 w-10 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AvatarImage src={userDetails.profilePic} alt={userDetails.username} />
        <AvatarFallback>
          {userDetails.username
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      {isOpen && (
        <Card className="absolute mt-2 w-72 z-10" ref={detailsRef}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Link href={`/profile/${userDetails.uid}`}>
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={userDetails.profilePic}
                    alt={userDetails.username}
                  />
                  <AvatarFallback>
                    {userDetails.username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div>
                <h3 className="font-semibold text-lg">
                  {userDetails.username}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
