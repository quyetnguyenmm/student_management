import { Box, Button, LinearProgress, Pagination, Paper, Typography, styled } from '@mui/material';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { getTotalPage } from 'utils';
import StudentFilter from '../components/studentFilter';
import StudentTable from '../components/studentTable';
import { studentActions } from '../studentSlice';
import { history } from 'utils';
import { toast } from 'react-toastify';

const ListPageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',

  '& .MuiBox-root': {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  '& .css-wjh20t-MuiPagination-ul': {
    justifyContent: 'center',
  },

  '& .MuiLinearProgress-root': {
    position: 'absolute',
    width: '100%',
    top: theme.spacing(-1),
  },
}));

export default function ListPage() {
  const dispatch = useAppDispatch();
  const match = useRouteMatch();

  const {
    data: studentList,
    pagination,
    filter,
    loading,
  } = useAppSelector((state) => state.student);
  const { data: cityList } = useAppSelector((state) => state.city);
  const cityMap = useAppSelector(selectCityMap);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      }),
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setSearchDebounce(newFilter));
  };

  const handleFilterchange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.removeStudent(student.id as string);
      dispatch(studentActions.fetchStudent({ ...filter }));

      toast.success('Remove student successfully!');
    } catch (error) {
      console.log('Failed to remove student:', error);
    }
  };

  const handleEditStudent = (student: Student) => {
    history.push(`${match.path}/edit/${student.id}`);
  };

  useEffect(() => {
    dispatch(studentActions.fetchStudent(filter));
  }, [dispatch, filter]);

  return (
    <ListPageWrapper>
      {loading && <LinearProgress />}
      <Box mb={2}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.path}/add`}>
          <Button variant="contained" color="primary">
            Add student
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterchange}
        />
      </Box>

      <Paper sx={{ marginBottom: '1rem' }}>
        <StudentTable
          studentList={studentList}
          cityMap={cityMap}
          onEdit={handleEditStudent}
          onRemove={handleRemoveStudent}
        />
      </Paper>

      <Pagination
        color="primary"
        count={getTotalPage(pagination._totalRows, pagination._limit)}
        page={pagination._page}
        onChange={handlePageChange}
      />
    </ListPageWrapper>
  );
}
