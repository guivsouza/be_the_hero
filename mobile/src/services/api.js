import axios from 'axios'

const api = axios.create({
    baseURL: "http://172.20.30.21:3333"
})

export default api