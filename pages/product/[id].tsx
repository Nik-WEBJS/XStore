import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import { ProductCard } from '../../components/ProductCard';
import { Header } from '../../components/Header';
import { Product } from '../../types/product';
import { products } from '../../data/products';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  if (!product) {
    return (
      <>
        <Header />
        <Container>
          <Typography variant="h4">Товар не найден</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: 'auto' }}
                loading="lazy"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {product.price} ₽
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Бренд: {product.brand}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <ProductCard product={product} hideImage />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p) => p.id === params?.id);

  return {
    props: {
      product,
    },
  };
}; 