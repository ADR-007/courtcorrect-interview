import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

export type PaginationOptions = {
  size: number;
  sortBy: string;
}

export interface PaginationHeaderProps {
  paginationOptions: PaginationOptions | undefined;
  onPaginationChange?: (options: PaginationOptions) => void;
  displayPage: number;
  displaySize: number;
  displayItems: number;
  displayTotal: number;
}


const PaginationHeader = (props: PaginationHeaderProps) => {
  const {
    paginationOptions: nullablePaginationOptions,
    onPaginationChange,
    displayPage,
    displaySize,
    displayItems,
    displayTotal,
  } = props;
  const paginationOptions = nullablePaginationOptions || {
    size: 5,
    sortBy: '-publish_date',
  };

  const handlePaginationChange = (options: Partial<PaginationOptions>) => {
    onPaginationChange?.({
      ...paginationOptions,
      ...options,
    });
  };

  const displayPageStart = (displayPage - 1) * displaySize;
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      marginTop={4}
    >
      <Stack direction="column" spacing={1}>
        <Typography variant="displayLargePrimary">
          Results
        </Typography>
        <Typography variant="body1">
          Showing {displayPageStart + displayItems ? 1 : 0}-{displayPageStart + displayItems} of {displayTotal} results
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Select
          sx={{ width: '109px' }}
          onChange={(event) => (
            handlePaginationChange({ size: event.target.value as number })
          )}
          value={paginationOptions.size}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        <FormControl>
          <InputLabel htmlFor="select-sort-by">Order By</InputLabel>
          <Select
            id="select-sort-by"
            label="Sort By"
            sx={{ width: '193px' }}
            onChange={(event) => (
              handlePaginationChange({ sortBy: event.target.value as string })
            )}
            value={paginationOptions.sortBy}
          >
            <MenuItem value="publish_date">Date: Earliest First</MenuItem>
            <MenuItem value="-publish_date">Date: Latest First</MenuItem>
            <MenuItem value="title">Title: A to Z</MenuItem>
            <MenuItem value="-title">Title: Z to A</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default PaginationHeader;