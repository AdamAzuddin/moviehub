"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePic, setProfilePic] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div>
      {user ? (
        <Button variant="secondary" onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Link href={"/auth"}>
          <Button variant="outline">Sign In</Button>
        </Link>
      )}
    </div>
  );
};

export default ProfilePage;
