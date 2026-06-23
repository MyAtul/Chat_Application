package com.project.chatapp.controller;

import com.project.chatapp.dto.ChatMessage;
import com.project.chatapp.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/sendMessage")
    public void sendMessage(ChatMessage message ,
                            org.springframework.messaging.Message<?> msg){

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(msg);

        String username = (String) accessor
                .getSessionAttributes().get("username");

        messageService.saveWebSocketMessage(message,username);

        messagingTemplate.convertAndSend(
                "/topic/user" + message.getReceiverId(),
                message);
    }
}
