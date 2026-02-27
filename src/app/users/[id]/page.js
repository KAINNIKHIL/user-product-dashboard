"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  Box
} from "@mui/material";
import useUserStore from "@/store/userStore";

export default function SingleUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    singleUser,
    loading,
    fetchSingleUser,
    clearSingleUser,
  } = useUserStore();

  useEffect(() => {
    fetchSingleUser(id);

    return () => {
      clearSingleUser();
    };
  }, [id, fetchSingleUser, clearSingleUser]);

    if (loading) return <CircularProgress />;
    if (!singleUser) return null;

  return (
    <div style={{ padding: 20 }}>
      <Button
        variant="outlined"
        onClick={() => router.push("/users")}
        style={{ marginBottom: 20 }}
      >
        Back to Users
      </Button>

      <Card>
  <CardContent>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mb={3}
    >
      <Avatar
        src={singleUser.image}
        alt={singleUser.firstName}
        sx={{ width: 120, height: 120, mb: 2 }}
      />

      <Typography variant="h5">
        {singleUser.firstName} {singleUser.lastName}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {singleUser.email}
      </Typography>
    </Box>

    <Typography><strong>Phone:</strong> {singleUser.phone}</Typography>
    <Typography><strong>Gender:</strong> {singleUser.gender}</Typography>
    <Typography><strong>Company:</strong> {singleUser.company?.name}</Typography>
    <Typography><strong>Address:</strong> {singleUser.address?.address}</Typography>
  </CardContent>
</Card>
    </div>
  );
}