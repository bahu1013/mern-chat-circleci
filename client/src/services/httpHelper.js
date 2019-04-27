import axios from 'axios';
import _ from 'lodash';
import { API_URL } from '../config';
import authActions from '../actions/auth';
import { store } from '../store';

export default function http(isAuthRequired = true) {
    const instance = axios.create({ baseURL: API_URL });
    if (isAuthRequired) {
        // instance.defaults.headers.common.Authorization = `Bearer ${_.get(store.getState(), 'login.auth.token')}`;
        instance.defaults.headers.common.Authorization = _.get(store.getState(), 'login.auth.token');
    }
    instance.interceptors.response.use(null, (error) => {
        const status = _.get(error, 'response.status');
        if (status === 401) {
            localStorage.clear();
            store.dispatch(authActions.invalidedToken());
        }
        return Promise.reject(error);
    });
    return instance;
}