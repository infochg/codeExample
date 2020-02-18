import { UPLOAD_PROGRESS } from '../actions/actionTypes';

export default function uploadProgress(state = 0, action) {
  switch (action.type) {
    case UPLOAD_PROGRESS:
      return action.payload;
    default:
      return state;
  }
}
