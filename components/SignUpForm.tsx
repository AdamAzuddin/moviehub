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
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

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
      });

      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setPassword('');
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
              type="username"
              placeholder="john_doe"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
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
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
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
