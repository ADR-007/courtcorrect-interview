import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export interface SearchRowProps {
  searchValue: string;
  onSearchChange: (search: string) => void;
}


const SearchRow = (props: SearchRowProps) => {
  const { onSearchChange, searchValue } = props;
  const [newSearchValue, setNewSearchValue] = useState<string>('');

  const handleSearchChange = () => {
    onSearchChange(newSearchValue);
  };
  useEffect(() => {
    setNewSearchValue(searchValue);
  }, [searchValue]);

  return (
    <Stack
      direction="row"
      spacing={2}
      width="100%"
      justifyContent="flex-end"
      sx={{ marginTop: 8 }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={newSearchValue}
          onChange={(event) => setNewSearchValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearchChange();
            }
          }}
        />
      </Box>

      <Button
        sx={{ width: '193px' }}
        variant="contained"
        color="primary"
        onClick={handleSearchChange}
        disabled={!newSearchValue}
        fullWidth
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchRow;