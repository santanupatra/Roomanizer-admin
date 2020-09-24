import {  RESET_SUCESS,RESET_FAIL } from "../actionTypes";
import { updateObject } from "../../shared/helpers";
// const initialState = {
//     token: localStorage.getItem("access-token"),
//     isAuthenticated: false,
//     loading: true,
//     adminId: null
// }
/**
 * token set in auth state
 * @param  {Object} state
 * @param  {Object} action
 */
// const authSuccess = (state, action) => {
//     return updateObject(state, {
//         token: action.token,
//         isAuthenticated:true,
//         adminId: action.adminId,
//         // error: null,
//         loading: false
//     });
// };
/**
 * @param  {Object} state
 * @param  {Object} action
 */
const RESET_FAIL = (state, action) => {
    return fail(state, {
        error: action.error,
        loading: false
    });
};
const RESET_SUCESS=(state,action)=>{
    return sucess(state, {
        sucess: action.sucess,
    });
}
/**
 * when logout user then token and userId set null
 * @param  {Object} state
 * @param  {Object} action
 */
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case RESET_SUCESS: return sucess(state, payload);
        case RESET_FAIL: return fail(state, payload);
        default: return state
    }
}