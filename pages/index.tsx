import React, { useState, useMemo, useCallback } from "react";
import type { GetStaticProps } from 'next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ProductCard } from "../components/ProductCard";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Product, FilterState, SortType } from "../types/product";
import { products } from "../data/products";

interface HomeProps {
  products: Product[];
  maxPrice: number;
}

const sortProducts = (products: Product[], sortType: SortType) => {
  return [...products].sort((a, b) => {
    switch (sortType) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });
};

const filterProducts = (products: Product[], filters: FilterState) => {
  return products.filter((product) => {
    const priceInRange =
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max;
    const newOnly = !filters.showOnlyNew || product.isNew;
    return priceInRange && newOnly;
  });
};

const ProductList = React.memo(({ products }: { products: Product[] }) => (
  <Grid container spacing={3}>
    {products.map((product) => (
      <Grid item key={product.id} xs={12} sm={6} md={4}>
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
));

ProductList.displayName = 'ProductList';

const SortSelect = React.memo(({ 
  value, 
  onChange 
}: { 
  value: SortType; 
  onChange: (event: SelectChangeEvent<SortType>) => void;
}) => (
  <FormControl fullWidth>
    <InputLabel>Сортировка</InputLabel>
    <Select
      value={value}
      label="Сортировка"
      onChange={onChange}
    >
      <MenuItem value="name-asc">По названию (А-Я)</MenuItem>
      <MenuItem value="name-desc">По названию (Я-А)</MenuItem>
      <MenuItem value="price-asc">По цене (возрастание)</MenuItem>
      <MenuItem value="price-desc">По цене (убывание)</MenuItem>
    </Select>
  </FormControl>
));

SortSelect.displayName = 'SortSelect';

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const maxPrice = Math.max(...products.map((p) => p.price));

  return {
    props: {
      products,
      maxPrice,
    },
    revalidate: 3600,
  };
};

export default function Home({ products, maxPrice }: HomeProps) {
  const [sortType, setSortType] = useState<SortType>("name-asc");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: {
      min: 0,
      max: maxPrice,
    },
    showOnlyNew: false,
  });

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((event: SelectChangeEvent<SortType>) => {
    setSortType(event.target.value as SortType);
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortType);
  }, [products, sortType, filters]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Sidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              maxPrice={maxPrice}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 3 }}>
              <SortSelect value={sortType} onChange={handleSortChange} />
            </Box>
            <ProductList products={filteredProducts} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
