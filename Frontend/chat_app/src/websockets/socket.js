import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectSocket = (onMessageReceived,onTypingReceived,onPresenceUpdate) => {

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

                    const data = JSON.parse(message.body)
                    
                    if("typing" in data){
                        onTypingReceived(data)
                    }else{
                        onMessageReceived(data)
                    }
                    
                }
            );

            // Online users
            stompClient.subscribe(
                "/topic/presence",
                (message) => {
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

export const sendSocketMessage = (message) =>{
    if(!stompClient || !stompClient.connected) return

    stompClient.publish({
        destination:"/app/sendMessage",
        body:JSON.stringify(message)
    })
}

export const disconnectSocket = ()=>{

    if(stompClient){
        stompClient.deactivate()
        stompClient = null
    }
}


export const sendRead = (senderId)=>{

    if(!stompClient || !stompClient.connected)
        return

    stompClient.publish({
        destination:"/app/message/read",
        body:JSON.stringify({
            senderId:senderId
        })
    })
}

export const sendTyping = (receiverId,typing)=>{

    if(!stompClient || !stompClient.connected)
        return

    stompClient.publish({
        destination:"/app/typing",
        body:JSON.stringify({
            receiverId,
            typing
        })
    })
}