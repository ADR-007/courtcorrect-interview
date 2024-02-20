import { Box, Pagination, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import FiltersRow, { SelectedFilterValues } from './components/FiltersRow';
import PaginationHeader, { PaginationOptions } from './components/PaginationHeader';
import { Results } from './components/Results';
import SearchRow from './components/SearchRow';

import { useRegulationsServiceGetRegulations, useRegulationsServiceGetRegulationsKey } from '../../api/queries';
import { Page_RegulatorySchema_ } from '../../api/requests';

type SearchQueryParams = SelectedFilterValues & PaginationOptions & { page: number, search: string };
const QuickSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams(new URLSearchParams());
  const searchParamsValues: SearchQueryParams = {
    categoryId: searchParams.get('categoryId') ? parseInt(searchParams.get('categoryId') as string, 10) : null,
    companyId: searchParams.get('companyId') ? parseInt(searchParams.get('companyId') as string, 10) : null,
    decisionId: searchParams.get('decisionId') ? parseInt(searchParams.get('decisionId') as string, 10) : null,
    publishDate: searchParams.get('publishDate') ? dayjs(searchParams.get('publishDate') as string) : null,
    page: searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1,
    search: searchParams.get('search') || '',
    size: searchParams.get('size') ? parseInt(searchParams.get('size') as string, 10) : 5,
    sortBy: searchParams.get('sortBy') || '-publish_date',
  };
  const updateFilter = useCallback((values: Partial<SearchQueryParams>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        if (key === 'publishDate') {
          newSearchParams.set(key, (value as dayjs.Dayjs)?.format('YYYY-MM-DD'));
        } else {
          newSearchParams.set(key, value.toString());
        }
      } else {
        newSearchParams.delete(key);
      }
    });
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  const queryClient = useQueryClient();
  const { data, isLoading } = useRegulationsServiceGetRegulations(
    { ...searchParamsValues, publishDate: searchParamsValues.publishDate?.format('YYYY-MM-DD') },
    undefined,
    { enabled: searchParamsValues.search !== '' },
  );

  // Store the data while loading to avoid flickering
  const [storedData, setStoredData] = useState<Page_RegulatorySchema_ | undefined>();
  useEffect(() => {
    if (!isLoading) {
      setStoredData(data);
    }
  }, [isLoading, data]);

  const handleSearchChange = useCallback(async (newSearchValue: string) => {
    // Invalidate the query to trigger a new fetch
    await queryClient.invalidateQueries([useRegulationsServiceGetRegulationsKey]);
    updateFilter({ search: newSearchValue, page: 1 });
  }, [queryClient, updateFilter]);

  const handlePaginationChange = useCallback(async (options: PaginationOptions) => {
    updateFilter({ page: 1, ...options });
  }, [updateFilter]);


  return (
    <Box>
      <Typography variant="h3" color="textPrimary" align="center">
        AI-Powered Regulatory Search
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" align="center" sx={{ marginTop: 4 }}>
        Use the search engine to search for publications from courts and regulators.
      </Typography>

      <SearchRow
        searchValue={searchParamsValues.search} onSearchChange={handleSearchChange}
      />
      <FiltersRow
        selectedFilterValues={searchParamsValues}
        onSelectionChange={updateFilter}
      />
      <PaginationHeader
        paginationOptions={searchParamsValues}
        onPaginationChange={handlePaginationChange}
        displayPage={(storedData?.page || 1)}
        displaySize={storedData?.size || 0}
        displayItems={storedData?.items.length || 0}
        displayTotal={storedData?.total || 0}
      />
      <Results items={storedData?.items} />

      <Box justifyContent="center" display="flex" marginTop={4}>
        <Pagination
          count={storedData?.pages || 0}
          page={searchParamsValues.page}
          onChange={(event, value) => updateFilter({ page: value })}
        />
      </Box>
    </Box>
  );
};

export default QuickSearch;