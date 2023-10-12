import cityApi from 'api/cityApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { cityActions } from './citySlice';
import { City, GetResponse } from 'models';

function* fetchCity() {
  try {
    const response: GetResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCitySuccess(response));
  } catch (error) {
    console.log('Failed to fetch city:', error);
    put(cityActions.fetchCityFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCity.type, fetchCity);
}
