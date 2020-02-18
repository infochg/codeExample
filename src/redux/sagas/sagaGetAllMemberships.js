import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { API_HOST } from '../env';
import sagaLoading from './sagaLoading';
import { MESSAGE_ERROR, GET_ALL_MEMBERSHIPS_SUCCESS } from '../actions/actionTypes';

export default function* sagaGetAllMemberships() {
  try {
    yield call(sagaLoading, true);
    const resData = yield call(() =>
      axios({
        url: `${API_HOST}membership/getMemberships`,
        method: 'post',
      }).then(response => response.data));
    yield put({ type: GET_ALL_MEMBERSHIPS_SUCCESS, payload: resData.data });
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
