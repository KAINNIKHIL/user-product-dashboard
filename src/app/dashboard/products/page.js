"use client";

import { useEffect } from "react";
import {
  Grid,
  Card,
  Box,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useProductStore from "@/store/productStore";

export default function ProductsPage() {
  const router = useRouter();

  const {
    products,
    categories,
    total,
    limit,
    skip,
    search,
    selectedCategory,
    loading,
    fetchProducts,
    fetchCategories,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleSearch = (e) => {
    fetchProducts({ search: e.target.value, skip: 0 });
  };

  const handleCategoryChange = (e) => {
    fetchProducts({ selectedCategory: e.target.value, skip: 0 });
  };

  const handlePageChange = (event, page) => {
    const newSkip = (page - 1) * limit;
    fetchProducts({ skip: newSkip });
  };

  const totalPages = Math.ceil(total / limit);

  return (
  <Box sx={{ p: 4, background: "#f4f6f8", minHeight: "100vh" }}>
    <Typography variant="h4" fontWeight="bold" mb={3}>
      Products
    </Typography>

    {/* Search + Filter */}
    <Grid container spacing={2} mb={3}>
      <Grid item xs={12} md={6}>
        <TextField
          label="Search Products"
          fullWidth
          value={search}
          onChange={handleSearch}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Select
          fullWidth
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
  <MenuItem key={cat.slug} value={cat.slug}>
    {cat.name}
  </MenuItem>
))}
        </Select>
      </Grid>
    </Grid>

    {loading ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 6,
        }}
      >
        <CircularProgress />
      </Box>
    ) : (
      <>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                onClick={() =>
                  router.push(`/dashboard/products/${product.id}`)
                }
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.thumbnail}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {product.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight="bold"
                  >
                    ₹ {product.price}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    ⭐ {product.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={skip / limit + 1}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </>
    )}
  </Box>
);
}