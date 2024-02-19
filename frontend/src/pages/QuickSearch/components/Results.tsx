import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

import ResultItem from './ResultItem';

import { RegulatorySchema } from '../../../api/requests';


export const Results = (props: { items?: RegulatorySchema[] }) => {
  const { items } = props;
  return (
    <Stack>
      {items?.length ? items.map((item, index) => (
        <Stack key={index}>
          <Box marginTop={index ? 5 : 0} marginBottom={5}>
            <ResultItem {...item} />
          </Box>
          <Divider />
        </Stack>
      )) : <Typography marginTop={5} fontStyle="italic" variant="body1">Nothing to show</Typography>}
    </Stack>
  );
};