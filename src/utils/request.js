import axios from "axios"

const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 8000
})

request.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.data
        } else {
            return Promise.reject(res.data)
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default request