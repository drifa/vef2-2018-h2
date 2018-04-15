
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'LOGIN_REQUEST';

export function requestLogin(auth) {
  return {
    type: LOGIN_REQUEST,
    payload: auth,
  };
}

export function requestLogout(auth) {
  return {
    type: LOGIN_REQUEST,
    payload: {},
  };
}

/* todo fleiri action */

/* todo async "thunk" fyrir tengingu við vefþjónustu */
