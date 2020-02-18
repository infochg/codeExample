import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { API_HOST } from '../env';
import sagaLoading from './sagaLoading';
import { MESSAGE_ERROR, MESSAGE_SUCCESS, LOGIN_SUCCESS } from '../actions/actionTypes';

export default function* sagaLogin(data) {
  try {
    yield call(sagaLoading, true);
    const resData = yield call(() =>
      axios({
        url: `${API_HOST}auth/login`,
        method: 'post',
        data: data.data,
      }).then(response => response.data));
    yield call(sagaLoading, false);
    yield put({ type: LOGIN_SUCCESS, payload: resData.data });
    yield put({ type: MESSAGE_SUCCESS, payload: resData.message });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    yield call(sagaLoading, false);
    yield put({ type: MESSAGE_ERROR, payload: 'Email or password is incorrect.' });
  }
}
