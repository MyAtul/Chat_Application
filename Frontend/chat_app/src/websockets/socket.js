import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectSocket = (onMessageReceived) => {

    const token = localStorage.getItem("token");

    const socket =
        new SockJS(
            "http://localhost:8080/chat"
        )

    stompClient = new Client({

        webSocketFactory: () => socket,

        connectHeaders: {
            Authorization:
                `Bearer ${token}`
        },

        onConnect: () => {

            const userId = localStorage.getItem("userId")

            stompClient.subscribe(
                `/topic/user${userId}`,
                (message) => {

                    onMessageReceived(
                        JSON.parse(message.body))
                }
            )

            console.log("WebSocket Connected")
        }
    })

    stompClient.activate();
}

export const sendSocketMessage = (receiverId,content) =>{
    if(!stompClient) return

    stompClient.publish({
        destination:"/app/sendMessage",
        body:JSON.stringify({receiverId,content})
    })
}