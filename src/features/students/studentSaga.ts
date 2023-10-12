import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { GetResponse, ListParams, Student } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studentSlice';

function* fetchStudent(action: PayloadAction<ListParams>) {
  try {
    const response: GetResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student:', error);
    yield put(studentActions.fetchStudentFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudent.type, fetchStudent);
  yield debounce(500, studentActions.setSearchDebounce.type, handleSearchDebounce);
}
