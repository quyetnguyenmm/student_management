import { Box, Grid, LinearProgress, Typography, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { BiFemale, BiMale, BiSad, BiSmile } from 'react-icons/bi';
import StatisticItem from './components/statisticItem';
import StudentRankingList from './components/studentRankingList';
import Widget from './components/widget';
import { dashboardActions } from './dashboardSlice';

const DashboardWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(1),

  '& .MuiLinearProgress-root': {
    position: 'absolute',
    width: '100%',
    top: theme.spacing(-1),
  },
}));

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { loading, statistics, highestStudentList, lowestStudentList, rankingByCityList } =
    useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <DashboardWrapper>
      {loading && <LinearProgress />}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<BiMale fontSize="1.5rem" color="#1976d2" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<BiFemale fontSize="1.5rem" color="#1976d2" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<BiSmile fontSize="1.5rem" color="#1976d2" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<BiSad fontSize="1.5rem" color="#1976d2" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h4">All Students</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box mt={5}>
        <Typography variant="h4">Rankings by city</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid item xs={12} md={6} lg={3} key={ranking.cityId}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </DashboardWrapper>
  );
}
