import React, { useEffect } from 'react';
import axiosInstance from "./index";
import { NotificationManager } from 'react-notifications';
const isHandlerEnabled = (config = {}) => {
    console.log(config.hasOwnProperty('handlerEnabled'))
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
        false : true
}
/**
 * @param  {function} setLoader  // loader show
 * @param  {function} removeLoader} // loader hide
 */
export default function ({ setLoader, removeLoader }) {
    /**
     * axios success response handle
     * @param  {object} res 
     */
    const successHandler = (res) => {
        // removeLoader();
        // if (isHandlerEnabled(res.config)) {
        //     console.log("successHandler", res)
        //     setAlert("Post fetch successfully", "success")
        // }
        // if response message is not blanck then show  swal
        const { msg } = res.data;
        if (msg && msg !== "") {
            const alertType = res.status === 200 ? 'success' : 'error'
            NotificationManager[alertType](msg, alertType);
        }
        return res;
    }
    /**
     * axios error response handle
     * @param  {Object} error
     */
    const errorHandler = (error) => {
        console.log(error)
        // removeLoader();
        if (isHandlerEnabled(error.config)) {
            if (error.response.status === 401)
                NotificationManager.error(error.response.data.msg, "Unautharized");
            else if (error.response)
                NotificationManager.error("something went wrong, try again later " + error.response.status, "Server Error");
            else
                NotificationManager.error("something went wrong, try again later", "Server Error");
        }
    }
    useEffect(() => {
        axiosInstance.interceptors.request.use(req => {
            console.log(req)
            // setLoader()
            // const token = localStorage.getItem('token');
            // config.headers.Authorization = token ? `Bearer ${token}` : '';
            return req;
        });
        axiosInstance.interceptors.response.use(
            res => successHandler(res),
            error => errorHandler(error)
        );
    }, [])

    return null;
}