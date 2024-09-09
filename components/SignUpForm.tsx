"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";
import UploadProfilePic from "./UploadProfilePic";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // Email error state
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(""); // Username error state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    setUsernameError("");
    // Validate username for spaces
    if (username.includes(" ")) {
      setUsernameError("Username cannot contain spaces.");
      return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let fileUrl = "";
      if (selectedFile) {
        const storageInstance = getStorage();
        const fileRef = ref(storageInstance, `profile_pics/${user.uid}/${selectedFile.name}`);
        await uploadBytes(fileRef, selectedFile);
        fileUrl = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: email,
        username: username,
        profilePic: fileUrl,
        watchlist: [],
        favourites: []
      });

      router.push("/");
    } catch (error: any) {
      console.error("Error signing up:", error);
      setPassword(''); // Reset password field

      // Check for Firebase "email already in use" error
      if (error.code === "auth/email-already-in-use") {
        setEmailError("Email is already in use.");
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>Create an account by filling the form below</CardDescription>
      </CardHeader>
      <UploadProfilePic onFileSelect={setSelectedFile} />
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="john_doe"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* Show username error */}
            {usernameError && <p className="text-red-500">{usernameError}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Show email error */}
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Show password error */}
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>

          <Button type="submit" className="w-full" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
