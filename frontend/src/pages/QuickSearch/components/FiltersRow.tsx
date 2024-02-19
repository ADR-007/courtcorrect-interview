import { Button, Stack, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';

import {
  useCategoriesServiceGetCategories,
  useCompaniesServiceGetCompanies,
  useDecisionsServiceGetDecisions,
} from '../../../api/queries';
import { NamedModelSchema } from '../../../api/requests';

export type FilterItem = NamedModelSchema | null;

export type SelectedFilterValues = {
  category: FilterItem;
  decision: FilterItem;
  company: FilterItem;
  publishDate: Date | null;
};


export interface FiltersRowProps {
  onSelectionChange: (values: SelectedFilterValues) => void;
};

const FiltersRow = ({ onSelectionChange }: FiltersRowProps) => {
  const { data: categories } = useCategoriesServiceGetCategories();
  const { data: decisions } = useDecisionsServiceGetDecisions();
  const { data: companies } = useCompaniesServiceGetCompanies();
  const [selectedCategory, setSelectedCategory] = useState<FilterItem>(null);
  const [selectedDecision, setSelectedDecision] = useState<FilterItem>(null);
  const [selectedCompany, setSelectedCompany] = useState<FilterItem>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    onSelectionChange({
      category: selectedCategory,
      decision: selectedDecision,
      company: selectedCompany,
      publishDate: selectedDate,
    });
  }, [selectedCategory, selectedDecision, selectedCompany, selectedDate, onSelectionChange]);

  return (
    <Stack alignItems="center" spacing={4} marginTop={4}>
      <Stack
        direction="row"
        spacing={2}
        width="100%"
      >
        <Autocomplete
          fullWidth
          options={categories?.items || []}
          getOptionLabel={(option) => option.name}
          value={selectedCategory}
          onChange={(event, newValue) => {
            setSelectedCategory(newValue);
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" label="Category" fullWidth />}
        />

        <Autocomplete
          fullWidth
          options={decisions?.items || []}
          getOptionLabel={(option) => option.name}
          value={selectedDecision}
          onChange={(event, newValue) => {
            setSelectedDecision(newValue);
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" label="Decision" fullWidth />}
        />

        <Autocomplete
          disablePortal
          fullWidth
          options={companies?.items || []}
          getOptionLabel={(option) => option.name}
          value={selectedCompany}
          onChange={(event, newValue) => {
            setSelectedCompany(newValue);
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" label="Company" fullWidth />}
        />
        <DatePicker
          sx={{ width: '100%' }}
          label="Date"
          value={selectedDate}
          onChange={(newValue: Date | null) => {
            setSelectedDate(newValue);
          }}
          slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }}
        />
      </Stack>
      <Button
        variant="text"
        sx={{ height: 'auto' }}
        onClick={() => {
          setSelectedCategory(null);
          setSelectedDecision(null);
          setSelectedCompany(null);
          setSelectedDate(null);
        }}
      >
        Clear Filters
      </Button>
    </Stack>
  );
};

export default FiltersRow;
