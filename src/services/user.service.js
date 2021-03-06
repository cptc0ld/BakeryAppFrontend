import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/product/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'products/all', {headers: authHeader()})
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data;
                }
            })
            .catch(error => {
                if(error.response.data.status === 401){
                    throw Error("401")
                }
                throw   Error(error.response.data.data.err)
            });
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }

    getAdminBoard() {
        return axios.post(API_URL + 'products/add', {headers: authHeader()});
    }
}

export default new UserService();