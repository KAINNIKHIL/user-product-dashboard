"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f4f6f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Card sx={{ width: 550, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Stack spacing={3} alignItems="center">
            <Avatar
              sx={{ width: 80, height: 80 }}
              src={session.user?.image}
            />

            <Typography variant="h5" fontWeight="bold">
              Welcome, {session.user?.firstName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Manage users and products from here.
            </Typography>

            {/* Navigation Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<PeopleIcon />}
                onClick={() => router.push("/dashboard/users")}
                sx={{ borderRadius: 2 }}
              >
                Users
              </Button>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<InventoryIcon />}
                onClick={() => router.push("/dashboard/products")}
                sx={{ borderRadius: 2 }}
              >
                Products
              </Button>
            </Stack>

            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={() => signOut({ callbackUrl: "/" })}
              sx={{ borderRadius: 2, mt: 2 }}
            >
              Logout
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}