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
    <Box sx={{ padding: 3, maxWidth: 900, margin: "0 auto" }}>
      <Button
        variant="outlined"
        onClick={() => router.push("/products")}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Card elevation={3}>
        <CardContent>

          {/* Image Section */}
          <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
            {images.length > 0 && (
              <img
                src={images[imageIndex]}
                alt={singleProduct.title}
                style={{
                  maxWidth: "100%",
                  height: "350px",
                  objectFit: "contain",
                  opacity: fade ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
            )}

            {images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrev}
                  sx={{ position: "absolute", top: "50%", left: 10 }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>

                <IconButton
                  onClick={handleNext}
                  sx={{ position: "absolute", top: "50%", right: 10 }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            )}
          </Box>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setImageIndex(index)}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    border: imageIndex === index ? "2px solid black" : "1px solid #ddd",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          )}

          <Typography variant="h5" gutterBottom>
            {singleProduct.title}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            {singleProduct.description}
          </Typography>

          <Typography><strong>Price:</strong> ₹ {singleProduct.price}</Typography>
          <Typography><strong>Discount:</strong> {singleProduct.discountPercentage}%</Typography>
          <Typography><strong>Rating:</strong> {singleProduct.rating}</Typography>
          <Typography><strong>Stock:</strong> {singleProduct.stock}</Typography>
          <Typography><strong>Brand:</strong> {singleProduct.brand}</Typography>
          <Typography sx={{ mb: 3 }}>
            <strong>Category:</strong> {singleProduct.category}
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}