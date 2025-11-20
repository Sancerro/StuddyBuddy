"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/config";

export function useSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      router.push("/feed");
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : "Failed to create account.";
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/feed");
    } catch (err) {
      setError("Failed to sign up with Google.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    onNameChange: setName,
    email,
    onEmailChange: setEmail,
    password,
    onPasswordChange: setPassword,
    error,
    loading,
    onSubmit: handleSignup,
    onGoogleLogin: handleGoogleLogin,
  };
}

