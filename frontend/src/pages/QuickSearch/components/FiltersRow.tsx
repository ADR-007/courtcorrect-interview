import { Button, Stack, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import React from 'react';

import {
  useCategoriesServiceGetCategories,
  useCompaniesServiceGetCompanies,
  useDecisionsServiceGetDecisions,
} from '../../../api/queries';
import { ListResponse_NamedModelSchema_ } from '../../../api/requests';

export type SelectedFilterValues = {
  categoryId: number | null;
  decisionId: number | null;
  companyId: number | null;
  publishDate: Dayjs | null;
};


export interface FiltersRowProps {
  selectedFilterValues: SelectedFilterValues | undefined;
  onSelectionChange: (values: SelectedFilterValues) => void;
};

const FiltersRow = (props: FiltersRowProps) => {
  const { onSelectionChange, selectedFilterValues: nullableFilterValues } = props;
  const selectedFilterValues = nullableFilterValues || {
    categoryId: null,
    decisionId: null,
    companyId: null,
    publishDate: null,
  };
  const { data: categories } = useCategoriesServiceGetCategories();
  const { data: decisions } = useDecisionsServiceGetDecisions();
  const { data: companies } = useCompaniesServiceGetCompanies();

  const findById = (id: number | null, response: ListResponse_NamedModelSchema_ | undefined) => (
    response?.items.find((item) => item.id === id) || null
  );
  const handleSearchChange = (newValues: Partial<SelectedFilterValues>) => {
    onSelectionChange({
      ...selectedFilterValues,
      ...newValues,
    });
  }

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
          value={findById(selectedFilterValues.categoryId, categories)}
          onChange={(event, newValue) => {
            handleSearchChange({ categoryId: newValue?.id || null });
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" label="Category" fullWidth />}
        />

        <Autocomplete
          fullWidth
          options={decisions?.items || []}
          getOptionLabel={(option) => option.name}
          value={findById(selectedFilterValues.decisionId, decisions)}
          onChange={(event, newValue) => {
            handleSearchChange({ decisionId: newValue?.id || null });
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" label="Decision" fullWidth />}
        />

        <Autocomplete
          disablePortal
          fullWidth
          options={companies?.items || []}
          getOptionLabel={(option) => option.name}
          value={findById(selectedFilterValues.companyId, companies)}
          onChange={(event, newValue) => {
            handleSearchChange({ companyId: newValue?.id || null });
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" label="Company" fullWidth />}
        />
        <DatePicker
          sx={{ width: '100%' }}
          label="Date"
          value={selectedFilterValues.publishDate}
          onChange={(newValue: Dayjs | null) => {
            handleSearchChange({ publishDate: newValue });
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
          handleSearchChange({
            categoryId: null,
            decisionId: null,
            companyId: null,
            publishDate: null,
          });
        }}
      >
        Clear Filters
      </Button>
    </Stack>
  );
};

export default FiltersRow;
