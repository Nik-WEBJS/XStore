import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Product } from "../types/product";
import { useCart } from "./Cart";

const Card = dynamic(() => import("@mui/material/Card"), { ssr: false });
const CardContent = dynamic(() => import("@mui/material/CardContent"), {
  ssr: false,
});
const CardMedia = dynamic(() => import("@mui/material/CardMedia"), {
  ssr: false,
});
const Typography = dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});
const Button = dynamic(() => import("@mui/material/Button"), { ssr: false });
const Box = dynamic(() => import("@mui/material/Box"), { ssr: false });

const CartButtons = React.memo(
  ({
    quantity,
    onAdd,
    onQuantityChange,
  }: {
    quantity: number;
    onAdd: () => void;
    onQuantityChange: (q: number) => void;
  }) => {
    if (quantity === 0) {
      return (
        <Button variant="contained" color="primary" fullWidth onClick={onAdd}>
          В корзину
        </Button>
      );
    }

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="outlined"
          onClick={() => onQuantityChange(quantity - 1)}
        >
          -
        </Button>
        <Typography>{quantity}</Typography>
        <Button
          variant="outlined"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          +
        </Button>
      </Box>
    );
  }
);

CartButtons.displayName = "CartButtons";

export interface ProductCardProps {
  product: Product;
  hideImage?: boolean;
}

export const ProductCard = React.memo(
  ({ product, hideImage }: ProductCardProps) => {
    const { items, addItem, updateQuantity } = useCart();
    const quantity =
      items.find((item) => item.id === product.id)?.quantity || 0;

    const handleAddToCart = useCallback(() => {
      addItem(product);
    }, [addItem, product]);

    const handleQuantityChange = useCallback(
      (newQuantity: number) => {
        updateQuantity(product.id, newQuantity);
      },
      [updateQuantity, product.id]
    );

    return (
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {!hideImage && (
          <Link
            href={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <CardMedia
              component={"img"}
              sx={{
                height: "250px",
                objectFit: "contain",
              }}
              objectFit="contain"
              image={product.image}
            />
          </Link>
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Link
            href={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <Typography gutterBottom variant="h6">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.brand}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
              {product.price} ₽
            </Typography>
          </Link>

          <Box sx={{ mt: 2 }}>
            <CartButtons
              quantity={quantity}
              onAdd={handleAddToCart}
              onQuantityChange={handleQuantityChange}
            />
          </Box>
        </CardContent>
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard";
