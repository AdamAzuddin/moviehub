"use client";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const OtherUserProfilePage = ({ params }: { params: { uid: string } }) => {
  const { uid } = params;
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(
    "/images/default_profile_pic.jpg"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("uid", "==", uid));
        const userSnapshot = await getDocs(q);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUsername(userData.username);
          setProfilePic(
            userData.profilePic || "/images/default_profile_pic.jpg"
          );
        } else {
          setError("User not found");
        }
      } catch (error) {
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <Image
            src={profilePic}
            alt={`${username}'s profile picture`}
            className="w-32 h-32 rounded-full sm:w-16 sm:h-16 object-cover"
            width={32}
            height={32}
          />
          <h2 className="mt-4 text-2xl font-bold ">@{username}</h2>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfilePage;
