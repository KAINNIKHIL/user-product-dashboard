"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleLogin = async () => {
    setLoading(true);

    await signIn("credentials", {
      username: "emilys",
      password: "emilyspass",
      redirect: false,
    });

    setLoading(false);
  };

  if (status === "loading") return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <Card
        sx={{
          width: 400,
          p: 2,
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Admin Login
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mb={3}
          >
            Sign in to access dashboard
          </Typography>

          <TextField
            fullWidth
            label="Username"
            value="emilys"
            disabled
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value="emilyspass"
            disabled
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}