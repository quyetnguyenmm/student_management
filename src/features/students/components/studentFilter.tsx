import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { City, ListParams } from 'models';
import { Fragment, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';

interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];
  onChange: (newFilter: ListParams) => void;
  onSearchChange: (newFilter: ListParams) => void;
}

export default function StudentFilter(props: StudentFilterProps) {
  const { filter, cityList, onSearchChange, onChange } = props;
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: event.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    const newFilter: ListParams = {
      ...filter,
      city: event.target.value || undefined,
      _page: 1,
    };

    onChange(newFilter);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value;

    const [_sort, _order] = value.split('.');
    const newFilter = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onChange(newFilter);
  };

  const handleClearFilter = () => {
    const newFilter = {
      _page: 1,
      _limit: 10,
    };
    onChange(newFilter);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Fragment>
      <Grid container spacing={3} sx={{ alignItems: 'flex-end' }}>
        <Grid item md={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Search by name</InputLabel>
            <OutlinedInput
              label="Search by name"
              endAdornment={<BiSearch />}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <FormControl size="small" fullWidth>
            <InputLabel>Filter by city</InputLabel>
            <Select value={filter.city || ''} label="Filter by city" onChange={handleCityChange}>
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              {cityList?.map((city) => (
                <MenuItem value={city.code} key={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <FormControl size="small" fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select
              label="sortby"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}>
              <MenuItem value="">
                <em>Không sắp sếp</em>
              </MenuItem>
              <MenuItem value="name.asc">Name asc</MenuItem>
              <MenuItem value="name.desc">Name desc</MenuItem>
              <MenuItem value="mark.asc">Mark asc</MenuItem>
              <MenuItem value="mark.desc">Mark desc</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={1}>
          <Button fullWidth variant="outlined" color="primary" onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}
