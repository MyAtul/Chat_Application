package com.project.chatapp.websocket;

import com.project.chatapp.dto.ChatMessage;
import com.project.chatapp.dto.MessageResponse;
import com.project.chatapp.dto.ReadMessageRequest;
import com.project.chatapp.event.TypingEvent;
import com.project.chatapp.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ChatWebSocketController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/sendMessage")
    public void sendMessage(
            ChatMessage message,
            org.springframework.messaging.Message<?> msg
    ){

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(msg);

        String username = (String) accessor
                        .getSessionAttributes()
                        .get("username");

        MessageResponse response = messageService
                                    .saveWebSocketMessage(
                                     message,
                                    username
                        );

        messagingTemplate.convertAndSend(
                "/topic/user" +
                        response.getReceiverId(),
                response
        );

        messagingTemplate.convertAndSend(
                "/topic/user" +
                        response.getSenderId(),
                response
        );
    }

    @MessageMapping("/message/read")
    public void markAsRead(ReadMessageRequest request,
                           org.springframework.messaging.Message<?> msg)
    {

        System.out.println("In marks as Read in webSocketController");

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(msg);

        String username = (String) accessor
                .getSessionAttributes()
                .get("username");

        List<MessageResponse> messages = messageService.markAsRead(
                request.getSenderId(),
                username
        );

        messages.forEach(message->
                System.out.println(message.getStatus()));

        messages.forEach(message -> {
                    messagingTemplate.convertAndSend(
                            "/topic/user"+message.getSenderId(),
                            message
                    );

                    messagingTemplate.convertAndSend(
                            "/topic/user"+message.getReceiverId(),
                            message
                    );
                });


    }

    @MessageMapping("/typing")
    public void typing(
            TypingEvent event,
            org.springframework.messaging.Message<?> msg
    ){

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(msg);

        String username = (String) accessor
                .getSessionAttributes()
                .get("username");

        Long senderId = (Long) accessor
                .getSessionAttributes()
                .get("userId");

        event.setSenderUsername(username);
        event.setSenderId(senderId);

        messagingTemplate.convertAndSend(
                "/topic/user"+event.getReceiverId(),
                event
        );
    }
}
