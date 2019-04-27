import { store } from '../store';

/**
 * route guard for staff
 */
export class StaffRouteGuard {
    shouldRoute() {
        const appState = store.getState();
        // return appState.login.authenticated && appState.login.auth && appState.login.currentUser;
        return appState.login.authenticated && appState.login.auth != null && appState.login.currentUser != null;
    }
}