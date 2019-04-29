import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {
    Route, BrowserRouter, Switch, Redirect 
} from 'react-router-dom';
// import { SecureRoute } from 'react-route-guard';

// import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Page404 from './pages/404';

import { persistor, store } from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/bootstrap.css';
import './styles/main.css';

const PrivateRoute = ({ component: Component, fallback, ...rest }) => (
    <Route {...rest} render={props => ((store.getState().login.authenticated && store.getState().login.auth && store.getState().login.currentUser != null) ? <Component /> : <Redirect to={{ pathname: fallback, state: { from: props.location } }} />)} />
);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path='/' component={Dashboard} fallback='/login' />
                    <PrivateRoute exact path='/profile' component={Profile} fallback='/login' />
                    <Route exact path='/login' render={() => <Login />} />
                    <Route exact path='/register' render={() => <Register />} />
                    <Route exact path='**' render={() => <Page404 />} />
                </Switch>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);