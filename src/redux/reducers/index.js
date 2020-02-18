import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import notifications from './notifications';
import loading from './loading';
import uploadProgress from './uploadProgress';
import currentUser from './login';
import allMemberships from './allMemberships';

export const rootReducer = combineReducers({
  loading,
  uploadProgress,
  notifications,
  currentUser,
  allMemberships,
  form: formReducer,
});
