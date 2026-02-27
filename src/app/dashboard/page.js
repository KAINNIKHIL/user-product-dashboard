"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, CircularProgress } from "@mui/material";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (!session) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      <p>Welcome: {session.user?.firstName}</p>

      <Button
        variant="contained"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
}