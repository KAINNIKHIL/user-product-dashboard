"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TextField,
  Pagination,
  CircularProgress,
} from "@mui/material";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const {
    users,
    total,
    limit,
    skip,
    search,
    loading,
    fetchUsers,
  } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e) => {
    fetchUsers({ search: e.target.value, skip: 0 });
  };

  const handlePageChange = (event, page) => {
    const newSkip = (page - 1) * limit;
    fetchUsers({ skip: newSkip });
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>

      <TextField
        label="Search Users"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearch}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover style={{ cursor: "pointer" }} onClick={() => router.push(`/users/${user.id}`)} >
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.company?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={totalPages}
            page={skip / limit + 1}
            onChange={handlePageChange}
            style={{ marginTop: 20 }}
          />
        </>
      )}
    </div>
  );
}