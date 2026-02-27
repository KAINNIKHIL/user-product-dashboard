"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Skeleton,
  Alert,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useProductStore from "@/store/productStore";

export default function SingleProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    singleProduct,
    loading,
    error,
    fetchSingleProduct,
    clearSingleProduct,
  } = useProductStore();

  const [imageIndex, setImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (id) fetchSingleProduct(id);

    return () => {
      clearSingleProduct();
    };
  }, [id, fetchSingleProduct, clearSingleProduct]);

  const handleNext = () => {
    if (!singleProduct?.images?.length) return;
    setFade(false);
    setTimeout(() => {
      setImageIndex((prev) =>
        prev === singleProduct.images.length - 1 ? 0 : prev + 1
      );
      setFade(true);
    }, 150);
  };

  const handlePrev = () => {
    if (!singleProduct?.images?.length) return;
    setFade(false);
    setTimeout(() => {
      setImageIndex((prev) =>
        prev === 0 ? singleProduct.images.length - 1 : prev - 1
      );
      setFade(true);
    }, 150);
  };

  if (loading) {
    return (
      <Box sx={{ padding: 3, maxWidth: 900, margin: "0 auto" }}>
        <Skeleton variant="rectangular" height={350} sx={{ mb: 3 }} />
        <Skeleton width="60%" height={40} />
        <Skeleton width="80%" />
        <Skeleton width="40%" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!singleProduct) return null;

  const images = singleProduct.images || [];

  return (
  <Box sx={{ p: 4, background: "#f4f6f8", minHeight: "100vh" }}>
    <Button
      variant="outlined"
      onClick={() => router.push("/dashboard/products")}
      sx={{ mb: 3 }}
    >
      Back to Products
    </Button>

    <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
      <CardContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            alignItems: "center",
          }}
        >
          {/* Image Section */}
          <Box sx={{ position: "relative", textAlign: "center" }}>
            {images.length > 0 && (
              <Box
                component="img"
                src={images[imageIndex]}
                alt={singleProduct.title}
                sx={{
                  width: "100%",
                  height: 400,
                  objectFit: "contain",
                  borderRadius: 2,
                  opacity: fade ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                  background: "#fff",
                  p: 2,
                }}
              />
            )}

            {images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 10,
                    background: "white",
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>

                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 10,
                    background: "white",
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            )}
          </Box>

          {/* Details Section */}
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {singleProduct.title}
            </Typography>

            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              ₹ {singleProduct.price}
            </Typography>

            <Typography sx={{ mb: 2 }} color="text.secondary">
              {singleProduct.description}
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 2 }}>
              <Typography><strong>⭐ Rating:</strong> {singleProduct.rating}</Typography>
              <Typography><strong> Stock:</strong> {singleProduct.stock}</Typography>
              <Typography><strong> Brand:</strong> {singleProduct.brand}</Typography>
              <Typography><strong> Category:</strong> {singleProduct.category}</Typography>
              <Typography>
                <strong> Discount:</strong> {singleProduct.discountPercentage}%
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 4,
              flexWrap: "wrap",
            }}
          >
            {images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                onClick={() => setImageIndex(index)}
                sx={{
                  width: 70,
                  height: 70,
                  objectFit: "contain",
                  borderRadius: 2,
                  border:
                    imageIndex === index
                      ? "2px solid #1976d2"
                      : "1px solid #ddd",
                  cursor: "pointer",
                  p: 1,
                  background: "#fff",
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  </Box>
);
}