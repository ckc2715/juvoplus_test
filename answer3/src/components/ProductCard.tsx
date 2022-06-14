import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Product } from "../services/productService";
import { Chip } from "@mui/material";

interface ProductCardProps {
  product: Product;
  bestseller: boolean;
}

export default function ProductCard({ product, bestseller }: ProductCardProps) {
  return (
    <Card sx={{ maxWidth: 800, mb: 4 }}>
      <CardMedia component="img" height="140" image={product.image_url1} />
      {product.image_url2 && (
        <CardMedia component="img" height="140" image={product.image_url2} />
      )}
      <CardActions sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Chip color="primary" label={product.category} />
      </CardActions>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.product_name}
          {bestseller && (
            <Chip sx={{ marginLeft: 2 }} label="Bestseller" color="success" />
          )}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Product_id: {product.product_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
