import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@mui/icons-material";
import { TextField, IconButton, Alert } from "@mui/material";
import { Container } from "@mui/material";
import ProductCard from "../components/ProductCard";
import ProductService, { Product } from "../services/productService";

export function ProductSearch() {
  const [searchInput, setSearchInput] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const onSearch = async (productId: string) => {
    if (!productId) return;
    const res = await ProductService.getProductById(productId);
    if (res.ok && res.product) {
      setNotFound(false);
      setProduct(res.product);
    } else {
      setProduct(null);
      setNotFound(true);
    }
  };

  useEffect(() => {
    ProductService.getBestsellers().then(({ products }) =>
      setBestSellers(products)
    );
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        type="number"
        sx={{ mt: 4, mb: 4 }}
        fullWidth
        id="standard-search-bar"
        variant="outlined"
        placeholder="Search by product id..."
        value={searchInput}
        onChange={onSearchChange}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => onSearch(searchInput)}>
              <SearchOutlined />
            </IconButton>
          )
        }}
      />
      {product && (
        <ProductCard
          product={product}
          bestseller={bestSellers.some(
            b => b.product_id === product.product_id
          )}
        />
      )}
      {notFound && <Alert severity="info">Cannot find this product</Alert>}
    </Container>
  );
}
