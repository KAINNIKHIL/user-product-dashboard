"use client";

import { useEffect } from "react";
import {
  Grid,
  Card,
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
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      <TextField
        label="Search Products"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearch}
      />

      <Select
        fullWidth
        value={selectedCategory}
        onChange={handleCategoryChange}
        displayEmpty
        style={{ marginBottom: 20 }}
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(`/products/${product.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.thumbnail}
                  />
                  <CardContent>
                    <Typography variant="h6">
                      {product.title}
                    </Typography>
                    <Typography>₹ {product.price}</Typography>
                    <Typography>Category: {product.category}</Typography>
                    <Typography>Rating: {product.rating}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

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