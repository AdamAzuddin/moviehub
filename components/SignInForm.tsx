"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // General error message

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error message
    setErrorMessage("");

    try {
      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user data from Firestore based on email
      const q = query(collection(db, "users"), where("email", "==", email));
      const userSnapshot = await getDocs(q);

      if (!userSnapshot.empty) {
        // Get the user document data
        const userData = userSnapshot.docs[0].data();
        let redirectRoute = "/"; // Default route
        router.push(redirectRoute); // Redirect to appropriate route after sign in
      } else {
        console.error("User data not found in Firestore");
      }
    } catch (error: any) {
      // If an error occurs during sign in, display a general message
      setErrorMessage("Invalid email or password.");
      console.error("Error signing in:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold auth-title">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Show general error message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <Button type="submit" className="w-full" onClick={handleSignIn}>
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
