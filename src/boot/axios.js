import qs from 'qs'
import axios from 'axios'
import router from '../router'
import { MAX_REQUESTS_COUNT, REQUESTS_INTERNAL_MS, API_BASE_URL } from '../config'

let PENDING_REQUESTS = 0;

const Axios = axios.create({
    baseURL: `${API_BASE_URL}`,
    paramsSerializer: function (params) {
        return qs.stringify(params, {arrayFormat: 'brackets'})
    }
})

Axios.interceptors.request.use(config => {
    //## set token, cancelToken, locale in header
    const token = localStorage.getItem('token')    
    const selectedLocale = 'en';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    config.headers.Localization = selectedLocale;

    return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
                PENDING_REQUESTS++

                clearInterval(interval)

                resolve(config)
            }
        }, REQUESTS_INTERNAL_MS)
      })
}, error => Promise.reject)

Axios.interceptors.response.use(response => {

    if (response.config.method === 'get') {
        
    }

    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)

    return Promise.resolve(response)
}, error => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('token')
        // router.replace({name: 'login'});
    }

    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)

    // if (error.response && error.response.status === 404) {
    //     if (!processNotFoundError(error)) {
    //         return false;
    //     }
    // }

    return Promise.reject(error)
});

/**
 * This function manages 404 error
 *
 * @param error
 * @returns {boolean}
 */
const processNotFoundError = (error) => {

    let routeConfig = {
        name: '404',
    };

    if (error.response.data.data) {
        routeConfig.params = { ...error.response.data.data };
    }

    router.push(routeConfig);

    return false;
};

export default Axios