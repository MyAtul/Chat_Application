import axios from "axios";

const API_URL = "http://localhost:8080"

export const getAllUsers = async ()=>{
    const token = localStorage.getItem("token")

    const response = await axios.get(
        `${API_URL}/users`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    return response.data
}

export const registerUser = ({username,password}) =>{
    return axios.post(`${API_URL}/auth/register`,{username,password})
}

export const getOnlineUsers = async () =>{
    
    const token = localStorage.getItem("token")

    const response = await axios.get(
        `${API_URL}/users/online`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    return response.data
}