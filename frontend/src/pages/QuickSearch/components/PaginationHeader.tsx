import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';

export type PaginationOptions = {
  pageSize: number;
  sortBy: string;
}

export interface PaginationHeaderProps {
  onPaginationChange?: (options: PaginationOptions) => void;
  displayPage: number;
  displayPageSize: number;
  displayItems: number;
  displayTotal: number;
}


const PaginationHeader = (props: PaginationHeaderProps) => {
  const { onPaginationChange, displayPage, displayPageSize, displayItems, displayTotal } = props;
  const [pageSize, setPageSize] = React.useState(5);
  const [sortBy, setSortBy] = React.useState<string>('-publish_date');

  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange({ pageSize, sortBy });
    }
  }, [onPaginationChange, pageSize, sortBy]);

  const displayPageStart = (displayPage - 1) * displayPageSize;
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
          defaultValue={pageSize}
          onChange={(event) => {
            setPageSize(event.target.value as number);
          }}
          value={pageSize}
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
            onChange={(event) => {
              setSortBy(event.target.value as string);
            }}
            value={sortBy}
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