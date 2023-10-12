import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, GetResponse } from 'models';

export interface CityState {
  loading: boolean;
  data: City[];
}
const initialState: CityState = {
  loading: false,
  data: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCity: (state) => {
      state.loading = true;
    },

    fetchCitySuccess: (state, action: PayloadAction<GetResponse<City>>) => {
      state.loading = false;
      state.data = action.payload.data;
    },

    fetchCityFailed: (state) => {
      state.loading = false;
    },
  },
});

const cityList = (state: RootState) => state.city.data;

export const selectCityMap = createSelector(cityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {}),
);

export const selectCityOptions = createSelector(cityList, (cityList) =>
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  })),
);

export const cityActions = citySlice.actions;
const cityReducer = citySlice.reducer;

export default cityReducer;
