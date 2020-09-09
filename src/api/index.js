import axios from "axios";
import { apiBaseUrl } from "../shared/helpers";

const axiosInstance = axios.create({
    baseURL: apiBaseUrl + "/admin/"
})
export default axiosInstance;

export const callApi = (url, method, data) => {
    const dataObj = !data ? {} : { [['GET', 'DELETE'].indexOf(method.toUpperCase()) !== -1 ? 'params' : 'data']: data }

    return new Promise((resolve, reject) => {
        return axiosInstance({
            url,
            method: method.toUpperCase(),
            ...dataObj
        }).then(response => {

            if (response.status === 200) {
                resolve(response.data.data);
            }
            else {
                reject();
            }
        }).catch(error => {
            reject();
            console.log('api response error:', error)
        })
    })

}
