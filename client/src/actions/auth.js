import { createActionThunk } from 'redux-thunk-actions';
import {
    LOGIN,
    LOGOUT,
    LOAD_ME,
    INVALID_TOKEN,
    SET_ACCESS_TOKEN,
    CLEAR_LOGIN,
    REGISTER,
    UPDATE_PROFILE,
    UPDATE_PASSWORD
} from '../constants/actionTypes';
import authService from '../services/auth';

const Login = createActionThunk(LOGIN, (email, password) => authService.login(email, password).then((res) => res.data));
const clearLogin = createActionThunk(CLEAR_LOGIN, () => { });
const Logout = createActionThunk(LOGOUT, () => authService.logout().then((res) => res.data));
const LoadMe = createActionThunk(LOAD_ME, () => authService.loadMe().then((res) => res.data));
const Register = createActionThunk(REGISTER, (user) => authService.register(user).then((res) => res.data));
const UpdateUserProfile = createActionThunk(UPDATE_PROFILE, (user) => authService.updateProfile(user).then((res) => res.data));
const UpdateUserPassword = createActionThunk(UPDATE_PASSWORD, (pwds, _id, token) => authService.updatePassword(pwds, _id, token).then((res) => res.data));
const invalidedToken = createActionThunk(INVALID_TOKEN, () => { });
const setAccessToken = createActionThunk(SET_ACCESS_TOKEN, (token) => token);

export default {
    Login,
    clearLogin,
    Logout,
    LoadMe,
    invalidedToken,
    setAccessToken,
    Register,
    UpdateUserProfile,
    UpdateUserPassword
};