import axios from 'axios';

const AxiosInstance = axios.create({
    //baseURL:"http://10.0.2.2:8080"
    baseURL:"http://192.168.1.10:8080"

});

export default AxiosInstance;