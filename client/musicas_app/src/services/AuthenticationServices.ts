import axios from "axios";

const BASE_URL = 'http://localhost:8080/auth'
const LOGIN_URL = BASE_URL + "/login"


export const loginApi = async (username: string, password: string) => {
    try {
        const loginData = {
            "username": username,
            "password": password
        }
        const response = await axios.post(LOGIN_URL, loginData);
        if (response.status === 200 && response.data.token) {
            return response.data.token;
        } else {
            throw new Error('Falha ao Autenticar');
        }
    } catch (error) {
        throw new Error('Login Error');
    }
};