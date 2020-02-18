import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { API_HOST } from '../env';
import sagaLoading from './sagaLoading';
import sagaGetAllMemberships from './sagaGetAllMemberships';
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '../actions/actionTypes';

export default function* sagaAddMembership(data) {
  try {
    yield call(sagaLoading, true);
    const resData = yield call(() =>
      axios({
        url: `${API_HOST}membership/createMembership`,
        method: 'post',
        data: data.data,
      }).then(response => response.data));
    yield call(sagaGetAllMemberships);
    yield put({ type: MESSAGE_SUCCESS, payload: resData.message });
    yield call(sagaLoading, false);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    yield call(sagaLoading, false);
    yield put({
      type: MESSAGE_ERROR,
      payload: error.message ? error.message : 'There is something wrong, please, try again.',
    });
  }
}
