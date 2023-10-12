import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Student } from 'models';

export interface Statistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: Statistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData: (state) => {
      state.loading = true;
    },

    fetchDataSuccess: (state) => {
      state.loading = false;
    },

    fetchDataFailed: (state) => {
      state.loading = false;
    },

    setStatistics: (state, action: PayloadAction<Statistics>) => {
      state.statistics = action.payload;
    },

    setHighestStudentList: (state, action: PayloadAction<Student[]>) => {
      state.highestStudentList = action.payload;
    },

    setLowestStudentList: (state, action: PayloadAction<Student[]>) => {
      state.lowestStudentList = action.payload;
    },

    setRankingByCityList: (state, action: PayloadAction<RankingByCity[]>) => {
      state.rankingByCityList = action.payload;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;
const dashboardReducer = dashboardSlice.reducer;

export default dashboardReducer;
