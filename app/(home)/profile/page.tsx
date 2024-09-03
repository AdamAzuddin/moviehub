"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useStore from "@/store/store";

const ProfilePage = () => {
  const user = useStore((state) => state.user);

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
