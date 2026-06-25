package com.project.chatapp.websocket;

import com.project.chatapp.service.PresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class PresenceBroadcaster {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private PresenceService presenceService;

    public void broadCastOnlineUsers(){
        messagingTemplate.convertAndSend(
                "/topic/presence",
                presenceService.getOnlineUsers()
        );
    }
}
