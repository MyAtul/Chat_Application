import axios from "axios";

const API_URL = "http://localhost:8080"

export const loginUser = async (loginData)=>{
    const response = await axios.post(`${API_URL}/auth/login`,loginData)
    return response.data
}