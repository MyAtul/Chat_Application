package com.project.chatapp.listner;

import com.project.chatapp.repo.UserRepo;
import com.project.chatapp.service.PresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    @Autowired
    private PresenceService presenceService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void handleWebSocketDisconnectionListener(SessionDisconnectEvent event){

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        if(accessor.getSessionAttributes() != null){
            Long userId = (Long) accessor
                    .getSessionAttributes()
                    .get("userId");

            if(userId != null){
                presenceService.userOffline(userId);
                messagingTemplate.convertAndSend(
                        "/topic/presence",
                        presenceService.getOnlineUsers()
                );

                System.out.println("User Offline "+userId);

                System.out.println("online user "+presenceService.getOnlineUsers());
            }
        }
    }

}
