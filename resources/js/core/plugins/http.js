import Vue from 'vue';
import axios from 'axios';
import { getCookie } from '../utils';
import CONSTANTS from '../utils/constants';
import config from '../../config';
const client = axios.create({
    baseURL: window.appSettings.apiUrl
});

function processData(response) {
    return response.data;
}

function isSuccess(response) {
    return response.data.success;
}

const request = function (options) {

    var token = null;
    if (!process.env.VUE_ENV)
        token = localStorage.getItem(CONSTANTS.AUTH_TOKEN);
    if (token)
        client.defaults.headers.common['token'] = token;
    client.defaults.headers.common['secret_key'] = config.secret_key;
    var fnUrl = "";
    if (options.data.url && options.data.url != '')
        fnUrl = options.data.url;
    else
        fnUrl = 'cms/' + options.data.m + '/' + options.data.fn;
    let _opts = {
        method: 'post',
        formData: false,
        url: fnUrl
    };
    Object.assign(_opts, options);
    if (_opts.formData) {
        var form_data = new FormData();

        for (var key in _opts.data) {
            form_data.append(key, _opts.data[key]);
        }
        _opts.data = form_data;
    }
    return new Promise((resolve, reject) => {
        client(_opts)
            .then(response => {
                return isSuccess(response) ? resolve(processData(response)) : reject(processData(response));
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.status == 401) {
                    error.unAuthorized = true;
                    if (typeof (localStorage) !== 'undefined') {
                        localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
                        window.location.reload();
                    }
                }

                return reject(error.response || error.message);
            });
    });
};

Vue.prototype.$http = request;

window.$http = request;
export default request;
