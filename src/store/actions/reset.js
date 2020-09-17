import { RESET_SUCESS,RESET_FAIL } from '../actionTypes';
import { createBrowserHistory } from 'history';
import { callApi } from "../../api";
import { NotificationManager } from 'react-notifications'
import { getMethod } from "../../shared/helpers";
import { FORGET_URL } from '../../shared/allApiUrl';
import Axios from 'axios';
const history = createBrowserHistory()

/**
 * login api call
 * @param {Object} data
 */
export const reset = (data) => {
    console.log('reset==>', data)

    return async dispatch => {
        Axios.post('http://127.0.0.1:5073/admin/admin-api/admin/forgetPassword ', data)
            .then((response) => {
                console.log('api res', response)
                if (response.status === 201) {
                    // Notification
                    NotificationManager.error(response.data.msg, 'error');
                    dispatch({ type: RESET_FAIL, payload: {} })
                }
                else if (response.status === 200) {
                    // set token in localStorage
                    // console.log(response.resetPasswordToken)
                    // localStorage.setItem('access-token', response.data.data.resetPasswordToken);
                    // localStorage.setItem('adminId', response.data.data.admin._id);
                    // // Notification
                    // NotificationManager.success('Successfully login', 'success');
                    // set token in redux
                    dispatch({ type: RESET_SUCESS, payload: { message:'email sent'} });
                }
            })
            .catch((error) => {
                console.log('error...', error)
                if (error.toString().includes('401')) {
                    NotificationManager.error("Please enter valid email Id", 'error');
                }
            })
        // try {


        //     // set token in localStorage
        //     localStorage.setItem('access-token', 'abc123');
        //     localStorage.setItem('adminId', '123');
        //     // set token in redux
        //     dispatch({ type: AUTH_SUCCESS, payload: { token: 'abc123', adminId: 123 } });
        // } catch (err) {
        //     console.log(err)
        //     dispatch({ type: AUTH_FAIL, payload: {} })
        // }
    }
}

/**
 * logout api call
 */