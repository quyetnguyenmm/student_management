import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, take } from 'redux-saga/effects';
import { history } from 'utils/history';
import { LoginPayload, authActions } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  yield localStorage.setItem('access_token', 'login_success');
  history.push('/admin/dashboard');
}
function* handleLogout() {
  localStorage.clear();
  yield delay(500);
  history.push('/login');
}

function* watchLoginFlow() {
  while (true) {
    const accessToken = Boolean(localStorage.getItem('access_token'));
    if (!accessToken) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield call(handleLogin, action.payload);
    } else {
      yield take(authActions.logout.type);
      yield call(handleLogout);
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
