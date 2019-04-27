import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { SecureRoute } from 'react-route-guard';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Page404 from './pages/404';

import { StaffRouteGuard } from './services/routeGuard';
import { persistor, store } from './store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <div className="App">
                            <Switch>
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/register' component={Register} />
                                <Route exact path='**' component={Page404} />
                                <SecureRoute exact path='/' routeGuard={new StaffRouteGuard()} redirectToPathWhenFail='/login' component={Dashboard} />
                                <SecureRoute exact path='/profile' routeGuard={new StaffRouteGuard()} redirectToPathWhenFail='/login' component={Profile} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;