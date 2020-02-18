import { takeEvery } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  MEMBERSHIP_ADD_REQUEST,
  MEMBERSHIP_UPDATE_REQUEST,
  MEMBERSHIP_DELETE_REQUEST,
  GET_ALL_MEMBERSHIPS_REQUEST,
} from '../actions/actionTypes';

import sagaLogin from './sagaLogin';
import sagaAddMembership from './sagaAddMembership';
import sagaUpdateMembership from './sagaUpdateMembership';
import sagaDeleteMembership from './sagaDeleteMembership';
import sagaGetAllMemberships from './sagaGetAllMemberships';

export default function* sagas() {
  yield takeEvery(LOGIN_REQUEST, sagaLogin);
  yield takeEvery(MEMBERSHIP_ADD_REQUEST, sagaAddMembership);
  yield takeEvery(MEMBERSHIP_UPDATE_REQUEST, sagaUpdateMembership);
  yield takeEvery(MEMBERSHIP_DELETE_REQUEST, sagaDeleteMembership);
  yield takeEvery(GET_ALL_MEMBERSHIPS_REQUEST, sagaGetAllMemberships);
}
