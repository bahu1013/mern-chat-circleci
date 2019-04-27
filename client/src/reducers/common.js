import {
    CLEAR_ERRORS,
} from '../constants/actionTypes';

const defaultState = {};
export default (state = defaultState, action) => {
    switch (action.type) {
        case `${CLEAR_ERRORS}_SUCCEEDED`:
            return {
                ...state,
                serverErrorMessage: null,
            };
        default:
            return {
                ...state
            };
    }
};