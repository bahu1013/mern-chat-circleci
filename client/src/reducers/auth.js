import _ from 'lodash';
import {
  LOGIN,
  LOGOUT,
  LOAD_ME,
  INVALID_TOKEN,
  SET_ACCESS_TOKEN,
  CLEAR_LOGIN,
  REGISTER,
  UPDATE_PASSWORD,
  UPDATE_PROFILE
} from '../constants/actionTypes';

const defaultState = {
  authenticated: false,
  auth: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case `${LOGIN}_STARTED`:
      return {
        ...state,
        loginStarted: true,
        loginDone: false,
        auth: null
      };
    case `${SET_ACCESS_TOKEN}_SUCCEEDED`:
      return {
        ...state,
        auth: { token: action.payload }
      };
    case `${LOGIN}_FAILED`:
      return {
        ...state,
        loginStarted: false,
        authenticated: false,
        loginFailed: true,
        loginDone: true,
        auth: null,
        errorMessage: _.get(action.payload, 'response.data.message')
      };
    case `${UPDATE_PROFILE}_STARTED`:
      return {
        ...state,
        updateProfileStarted: true,
        updateProfileDone: false,
      };
    case `${UPDATE_PROFILE}_FAILED`:
      return {
        ...state,
        updateProfileStarted: false,
        updateProfileDone: true,
        updateProfileFailed: true,
      };
    case `${UPDATE_PROFILE}_SUCCEEDED`:
      return {
        ...state,
        auth: { token: action.payload.token, chat_token: action.payload.chat_token },
        currentUser: action.payload.user,
        updateProfileStarted: false,
        updateProfileDone: true
      };
    case `${UPDATE_PASSWORD}_STARTED`:
      return {
        ...state,
        updatePasswordStarted: true,
        updatePasswordDone: false,
      };
    case `${UPDATE_PASSWORD}_FAILED`:
      return {
        ...state,
        updatePasswordStarted: false,
        updatePasswordDone: true,
        updatePasswordFailed: true,
      };
    case `${UPDATE_PASSWORD}_SUCCEEDED`:
      return {
        ...state,
        pwdChangeError: action.payload.result,
        updatePasswordDone: true
      };
    case `${LOGIN}_SUCCEEDED`:
      return {
        ...state,
        auth: { token: action.payload.token, chat_token: action.payload.chat_token }
      };
    case `${REGISTER}_SUCCEEDED`:
    case `${CLEAR_LOGIN}_SUCCEEDED`:
      return {
        ...state,
        loginStarted: false,
        authenticated: true,
        loginFailed: false,
        loginDone: true,
        auth: action.payload,
        errorMessage: null
      };
    case `${INVALID_TOKEN}_SUCCEEDED`:
      return {
        ...state,
        authenticated: false,
        auth: null,
        currentUser: null,
        sessionExpired: true
      };
    case `${LOGOUT}_SUCCEEDED`:
      return {
        ...state,
        authenticated: false,
        auth: null,
        currentUser: null,
        sessionExpired: false
      };
    case `${LOAD_ME}_SUCCEEDED`:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};