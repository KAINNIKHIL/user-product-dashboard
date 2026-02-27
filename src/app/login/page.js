"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log("Logged in user:", session);
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleLogin = async () => {
    await signIn("credentials", {
      username: "emilys",
      password: "emilyspass",
      redirect: false,
    });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Test Login</button>
    </div>
  );
}