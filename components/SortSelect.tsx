import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SortType } from '../types/product';

interface SortSelectProps {
  value: SortType;
  onChange: (value: SortType) => void;
}

export const SortSelect: React.FC<SortSelectProps> = React.memo(({ value, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Сортировка</InputLabel>
      <Select
        value={value}
        label="Сортировка"
        onChange={(e) => onChange(e.target.value as SortType)}
      >
        <MenuItem value="name-asc">По названию (А-Я)</MenuItem>
        <MenuItem value="name-desc">По названию (Я-А)</MenuItem>
        <MenuItem value="price-asc">По цене (возрастание)</MenuItem>
        <MenuItem value="price-desc">По цене (убывание)</MenuItem>
      </Select>
    </FormControl>
  );
});

SortSelect.displayName = 'SortSelect'; 