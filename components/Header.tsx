import React, { useMemo } from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './Cart';
import Link from 'next/link';

export const Header: React.FC = React.memo(() => {
  const { items, getTotalPrice } = useCart();
  
  const { totalItems, totalPrice } = useMemo(() => ({
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: getTotalPrice()
  }), [items, getTotalPrice]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            Магазин товаров
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            Итого: {totalPrice} ₽
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}); 