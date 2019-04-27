import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import authReducer from './auth';
import common from './common';

const persistAuthConfig = {
    key: 'root',
    storage,
    whitelist: ['authenticated', 'auth', 'currentUser'],
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
    login: persistReducer(persistAuthConfig, authReducer),
    common
});

export default rootReducer;
