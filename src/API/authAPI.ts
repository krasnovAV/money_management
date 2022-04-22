import axios from "axios";

export const authAPI = {
    login(email: string, password: string) {
        return axios.get<LoginData[]>("http://localhost:3002/auth", {params: {email: email, password: password}})
    },

    register( email: string, password: string) {
        return axios.post<LoginData>("http://localhost:3002/auth", {email, password})
    }
}

type LoginData = {
    id: string,
    email: string,
}