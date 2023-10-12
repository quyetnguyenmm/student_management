import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GetResponse, ListParams, PaginationParams, Student } from 'models';

export interface StudentState {
  loading: boolean;
  data: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  data: [],
  filter: {
    _page: 1,
    _limit: 10,
  },
  pagination: {
    _page: 1,
    _limit: 10,
    _totalRows: 20,
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudent: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },

    fetchStudentSuccess: (state, action: PayloadAction<GetResponse<Student>>) => {
      state.loading = false;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    },

    fetchStudentFailed: (state) => {
      state.loading = false;
    },

    setFilter: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload;
    },

    setSearchDebounce: (state, action: PayloadAction<ListParams>) => {},
  },
});

export const studentActions = studentSlice.actions;
const studentReducer = studentSlice.reducer;

export default studentReducer;
