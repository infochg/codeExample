import { NotificationManager } from 'react-notifications';
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '../actions/actionTypes';

export default function notifications(state = {}, action) {
  switch (action.type) {
    case MESSAGE_ERROR:
      NotificationManager.error(action.payload);
      return action.payload;
    case MESSAGE_SUCCESS:
      NotificationManager.success(action.payload);
      return action.payload;
    default:
      return state;
  }
}
