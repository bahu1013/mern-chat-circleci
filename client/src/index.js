import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { SecureRoute } from 'react-route-guard';

import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Page404 from './pages/404';

import { StaffRouteGuard } from './services/routeGuard';
import { persistor, store } from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/bootstrap.css';
import './styles/main.css';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <SecureRoute exact path='/' routeGuard={new StaffRouteGuard()} redirectToPathWhenFail='/login' render={() => <Welcome />} />
                        <SecureRoute exact path='/dashboard' routeGuard={new StaffRouteGuard()} redirectToPathWhenFail='/login' render={() => <Dashboard />} />
                        <SecureRoute exact path='/profile' routeGuard={new StaffRouteGuard()} redirectToPathWhenFail='/login' render={() => <Profile />} />
                        <Route exact path='/login' render={() => <Login />} />
                        <Route exact path='/register' render={() => <Register />} />
                        <Route exact path='**' render={() => <Page404 />} />
                    </Switch>
                </div>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);