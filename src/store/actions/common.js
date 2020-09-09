import { callApi } from "../../api";
import { getMethod } from "../../shared/helpers";
import * as allApiUrl from "../../shared/allApiUrl";
/**
 * @param  {String} url          https://redux.js.org/recipes
 * @param  {Object} data         {id:1,name:'Jhon'}   
 * @param  {String} actionType  ADD ,UPDATE ,DELETE ,GET_[name]
 * @param  {String} name        Lesson,User,Role,Semester
 */
export const crudAction = (url = "", data = null, actionType, name) => {
    // const sendUrl = url === "" ? allApiUrl[`${actionType}_${name}_URL`] : url;

    return async dispatch => {
        dispatch({ type: `RESET_${name}_ACTION` })
        try {

            let response = await callApi(url, getMethod(actionType), data);

            console.log('api response', response)
            dispatch({
                // create dispatch action type  like 'SET_USER_ACTION'  , 'SET_PROPERTY_ACTION'
                type: `SET_${name}_ACTION`,
                payload: {
                    type: actionType,
                    isSuccess: true,
                    data: response || data
                }
            })
        }
        catch (error) {
            dispatch({
                type: `SET_${name}_ACTION`,
                payload: {
                    type: actionType,
                    isSuccess: false,
                    data: null
                }
            })
        }

    }
}
