import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers'; // the value from combineReducers

function configureStore() {
    const middlewareList = [thunk];
    // Only use the redux-logger middleware in development
    if (process.env.NODE_ENV === `development`) {
        middlewareList.push(createLogger());
    }
    return createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), compose(applyMiddleware(...middlewareList)));
}

export const store = configureStore();
export const persistor = persistStore(store);
