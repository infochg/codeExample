import cookie from 'react-cookies';
import { LOGIN_SUCCESS } from '../actions/actionTypes';

export default function currentUser(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      if (action.payload['auth-token']) {
        cookie.save('token', action.payload['auth-token'], { path: '/' });
      }
      return action.payload;
    default:
      return state;
  }
}
