import axios from "axios";

const API_URL = "http://localhost:8080"

export const getChatHistory = async (receiverId)=>{

    const token = localStorage.getItem("token")

    const response = await axios.get(
        `${API_URL}/messages/${receiverId}`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )

    return response.data

}

export const sendMessage =async (receiverId,content)=>{
    
    const token = localStorage.getItem("token")

    const response = await axios.post(
        `${API_URL}/messages/send`,{
            receiverId,
            content
        },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )

    return response.data
}