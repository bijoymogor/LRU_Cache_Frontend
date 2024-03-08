import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const requestHandler = options => {
    switch (options.method) {
        case 'POST':
            return axios
                .post(
                    options.url,
                    JSON.stringify(options.body),
                )
                .then(response => response.data)
                .catch(err => err);
        case 'PUT':
            return axios
                .put(
                    options.url,
                    JSON.stringify(options.body)
                )
                .then(response => response.data)
                .catch(err => err);
        default:
            return axios
                .get(
                    options.url,
                )
                .then(response => response.data)
                .catch(err => err);
    }
};

axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export function getKey(key) {
    return requestHandler({
        url: `cache/get/${key}/`,
        method: 'GET',
    });
}

export function setKeyValue(body) {
    return requestHandler({
        url: `cache/set/`,
        method: 'POST',
        body,
    });
}

