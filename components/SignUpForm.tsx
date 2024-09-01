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
import Link from "next/link"; // Assuming you're using Next.js
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State to hold password error message

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check password length
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return; // Exit the function early if password is too short
    }

    try {
      // Sign up user with email and password
      console.log("Connecting to firestore");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Proceed to add additional information to Firestore
      await addUserToFirestore(user.uid);

      console.log("User signed up and added to Firestore successfully");
      router.push("/"); // Redirect to profile page after sign up
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const addUserToFirestore = async (userId: string) => {
    try {
      let userData: any = {
        email,
      };

      await addDoc(collection(db, "users"), {
        uid: userId,
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
      <CardContent>
        <div className="space-y-4">
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
                setPasswordError(""); // Clear password error message when user types in the password field
              }}
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleSignUp}>
            Sign Up
          </Button>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
