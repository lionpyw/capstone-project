import axios from "axios";
import { getCookie } from 'typescript-cookie';


let refresh = false

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
    'X-CSRFToken': getCookie('csrftoken')
}

axios.interceptors.response.use(resp => resp, async error => 
   { if (error.response.status === 401 && !refresh){
    refresh = true
    const response = await axios.post('api/token/refresh/')
    if (response.status === 200){
        return axios(error.config)
    }
    return Promise.reject(error);
   }
   refresh = false
   return error
})
