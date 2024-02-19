import { Box, Pagination, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';

import FiltersRow, { SelectedFilterValues } from './components/FiltersRow';
import PaginationHeader, { PaginationOptions } from './components/PaginationHeader';
import { Results } from './components/Results';
import SearchRow from './components/SearchRow';

import { useRegulationsServiceGetRegulations, useRegulationsServiceGetRegulationsKey } from '../../api/queries';
import { Page_RegulatorySchema_ } from '../../api/requests';
// component

const QuickSearch = () => {
  const [filtersValues, setFiltersValues] = useState<SelectedFilterValues>();
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    pageSize: 5,
    sortBy: '-publish_date',
  });
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const queryClient = useQueryClient();
  const { data, isLoading } = useRegulationsServiceGetRegulations({
    orderBy: paginationOptions?.sortBy,
    page: page || 1,
    size: paginationOptions?.pageSize,
    search: searchValue,
    categoryId: filtersValues?.category?.id,
    companyId: filtersValues?.company?.id,
    decisionId: filtersValues?.decision?.id,
    publishDate: filtersValues?.publishDate?.toISOString().split('T')[0],
  }, undefined, {
    enabled: searchValue !== '',
  });
  const [storedData, setStoredData] = useState<Page_RegulatorySchema_ | undefined>();
  useEffect(() => {
    if (!isLoading) {
      setStoredData(data);
    }
  }, [isLoading, data]);

  const handleSearchChange = useCallback(async (newSearchValue: string) => {
    // Invalidate the query to trigger a new fetch
    await queryClient.invalidateQueries([useRegulationsServiceGetRegulationsKey]);
    setSearchValue(newSearchValue);
  }, [queryClient]);

  const handlePaginationChange = useCallback(async (options: PaginationOptions) => {
    setPage(1);
    setPaginationOptions(options);
  }, []);

  return (
    <Box>
      <Typography variant="h3" color="textPrimary" align="center">
        AI-Powered Regulatory Search
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" align="center" sx={{ marginTop: 4 }}>
        Use the search engine to search for publications from courts and regulators.
      </Typography>

      <SearchRow onSearchChange={handleSearchChange} />
      <FiltersRow onSelectionChange={setFiltersValues} />
      <PaginationHeader
        onPaginationChange={handlePaginationChange}
        displayPage={(storedData?.page || 1)}
        displayPageSize={storedData?.size || 0}
        displayItems={storedData?.items.length || 0}
        displayTotal={storedData?.total || 0}
      />
      <Results items={storedData?.items} />

      <Box justifyContent="center" display="flex" marginTop={4}>
        <Pagination
          count={storedData?.pages || 0}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
};

export default QuickSearch;