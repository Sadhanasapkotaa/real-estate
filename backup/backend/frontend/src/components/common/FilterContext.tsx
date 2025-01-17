"use client";
import { createContext, useState, ReactNode } from 'react';

interface Filters {
  minPrice: string;
  maxPrice: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  location: string;
  propertyType: string;
  saleOrRent: string;
}

interface FilterContextProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const defaultFilters: Filters = {
  minPrice: '',
  maxPrice: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  location: '',
  propertyType: '',
  saleOrRent: '',
};

export const FilterContext = createContext<FilterContextProps>({
  filters: defaultFilters,
  setFilters: () => {},
});

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};