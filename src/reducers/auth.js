import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  /* todo fleiri actions */
} from '../actions/auth';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return action.payload;
    /* todo setja upp reducer */
    case LOGOUT_REQUEST:
      return {};
    default:
      return state;
  }
};
