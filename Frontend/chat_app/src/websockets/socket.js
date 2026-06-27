import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectSocket = (onMessageReceived,onPresenceUpdate) => {

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

            const userId = localStorage.getItem("userId");

            // Private chat
            stompClient.subscribe(
                `/topic/user${userId}`,
                (message) => {
                    onMessageReceived(
                        JSON.parse(message.body)
                    );
                }
            );

            // Online users
            stompClient.subscribe(
                "/topic/presence",
                (message) => {
                    console.log("Presence Update:", JSON.parse(message.body));
                    onPresenceUpdate(
                        JSON.parse(message.body)
                    );
                }
            );

            console.log("WebSocket Connected");
        }
    })

    stompClient.activate();
}

export const sendSocketMessage = (receiverId,content) =>{
    if(!stompClient || !stompClient.connected) return

    stompClient.publish({
        destination:"/app/sendMessage",
        body:JSON.stringify({receiverId,content})
    })
}

export const disconnectSocket = ()=>{

    if(stompClient){
        stompClient.deactivate()
        stompClient = null
    }
}


export const sendRead = (senderId)=>{

    console.log("Sending Read:",senderId)

    if(!stompClient || !stompClient.connected)
        return

    stompClient.publish({
        destination:"/app/message/read",
        body:JSON.stringify({
            senderId:senderId
        })
    })
}