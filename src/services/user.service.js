import axios from 'axios';
import authHeader from './auth-header';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 

class UserService {
    getPublicContent() {
        return axios.get(REACT_APP_API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(REACT_APP_API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(REACT_APP_API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(REACT_APP_API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();