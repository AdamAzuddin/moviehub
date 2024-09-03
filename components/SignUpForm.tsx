"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { Users } from "@/types/types";
import UploadProfilePic from "./UploadProfilePic";
export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("")

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check password length
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
  
    try {
      // Dynamically import Firebase SDK functions
      const { createUserWithEmailAndPassword: dynamicCreateUserWithEmailAndPassword } = await import('firebase/auth');
      const { collection, addDoc } = await import('firebase/firestore');
  
      console.log("Connecting to firestore");
  
      const userCredential = await dynamicCreateUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
  
      // Proceed to add additional information to Firestore
      await addUserToFirestore(user.uid, collection, addDoc);
  
      console.log("User signed up and added to Firestore successfully");
      router.push("/"); // Redirect to profile page after sign up
    } catch (error) {
      console.error("Error signing up:", error);
      setPassword(''); // Reset password input
    }
  };
  

  const addUserToFirestore = async (userId: string, collection: Function, addDoc: Function) => {
    try {
      let userData: Users = {
        uid: userId,
        email: email,
        username: username
      };
  
      await addDoc(collection(db, "users"), {
        ...userData,
      });
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
      throw error;
    }
  };
  
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>
          Create an account by filling the form below
        </CardDescription>
      </CardHeader>
      <UploadProfilePic/>
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
