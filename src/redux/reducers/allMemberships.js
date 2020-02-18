import { GET_ALL_MEMBERSHIPS_SUCCESS } from '../actions/actionTypes';

export default function allMemberships(state = [], action) {
  switch (action.type) {
    case GET_ALL_MEMBERSHIPS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
