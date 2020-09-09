import { AUTH_SUCCESS, AUTH_LOGOUT } from "../actionTypes";
import { updateObject } from "../../shared/helpers";
const initialState = {
    token: localStorage.getItem("access-token"),
    isAuthenticated: false,
    loading: true,
    adminId: null
}
/**
 * token set in auth state
 * @param  {Object} state
 * @param  {Object} action
 */
const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        isAuthenticated:true,
        adminId: action.adminId,
        // error: null,
        loading: false
    });
};
/**
 * @param  {Object} state
 * @param  {Object} action
 */
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};
/**
 * when logout user then token and userId set null
 * @param  {Object} state
 * @param  {Object} action
 */
const authLogout = (state, action) => {
    return updateObject(state, { token: null, adminId: null, isAuthenticated: false });
};
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case AUTH_SUCCESS: return authSuccess(state, payload);
        case AUTH_SUCCESS: return authFail(state, payload);
        case AUTH_LOGOUT: return authLogout(state, payload);
        default: return state
    }
}