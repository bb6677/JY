import axios from "axios";
import qs from "qs";
let host = "http://192.168.0.123:8080";
const serve = axios.create({
    baseURL: host,
    timeout: 30000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
});

serve.interceptors.request.use(config => {
    return config;
}, error => {
    return error;
});

serve.interceptors.response.use(result => {
    return result;
}, error => {
    return error;
});

function get(url, params, callback) {
    serve({
        url: url,
        method: "get",
        params: params
    }).then(result => {
        console.log(result)
        if (result.status == 200) {
            callback(result.data);
        }
    }).catch(error => {
        console.log(error);
    });
}

function post(url, data, callback) {
    serve({
        url: url,
        method: "post",
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }).then(result => {
        if (result.status == 200) {
            callback(result.data);
        }
    }).catch(error => {
        console.log(error);
    });
}

export {
    get,
    post
}