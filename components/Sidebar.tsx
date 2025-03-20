import React, { useCallback } from 'react';
import { Box, Typography, Slider, FormControlLabel, Switch, Paper } from '@mui/material';
import { FilterState } from '../types/product';

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  maxPrice: number;
}

export const Sidebar: React.FC<SidebarProps> = React.memo(({ filters, onFilterChange, maxPrice }) => {
  const handlePriceChange = useCallback((event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onFilterChange({
        ...filters,
        priceRange: {
          min: newValue[0],
          max: newValue[1]
        }
      });
    }
  }, [filters, onFilterChange]);

  const handleNewOnlyChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      showOnlyNew: event.target.checked
    });
  }, [filters, onFilterChange]);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>
          Цена
        </Typography>
        <Slider
          value={[filters.priceRange.min, filters.priceRange.max]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
          marks={[
            { value: filters.priceRange.min, label: filters.priceRange.min },
            { value: filters.priceRange.max, label: filters.priceRange.max}
          ]}
        />
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={filters.showOnlyNew}
            onChange={handleNewOnlyChange}
          />
        }
        label="Только новинки"
      />
    </Paper>
  );
});

Sidebar.displayName = 'Sidebar'; 