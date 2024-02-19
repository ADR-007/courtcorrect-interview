import { Link, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { type NamedModelSchema } from '../../../api/requests';


export interface ResultItemProps {
  id: number,
  title: string;
  description: string;
  publish_date: string;
  category: NamedModelSchema;
  company: NamedModelSchema;
  decision: NamedModelSchema;
}

const OptionTitle = styled(Typography)`
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
`;


const ResultItem = (props: ResultItemProps) => {
  const { id, title, description, publish_date, category, company, decision } = props;
  return (
    <Stack direction="column" paddingY={4} spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subheadingPrimary">{publish_date}</Typography>
      </Stack>
      <Link
        variant="displayMediumPrimary"
        href={`/regulations/${id}`}
        underline="none"
      >
        {title}
      </Link>
      <Typography variant="body1">{description}</Typography>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="column" flexGrow={1}>
          <Typography variant="caption">Category</Typography>
          <OptionTitle>{category.name}</OptionTitle>
        </Stack>
        <Stack direction="column" flexGrow={1}>
          <Typography variant="caption">Company</Typography>
          <OptionTitle>{company.name}</OptionTitle>
        </Stack>
        <Stack direction="column" flexGrow={1}>
          <Typography variant="caption">Decision</Typography>
          <OptionTitle>{decision.name}</OptionTitle>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ResultItem;