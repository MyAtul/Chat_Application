package com.project.chatapp.listner;

import com.project.chatapp.dto.MessageResponse;
import com.project.chatapp.event.UserConnectedEvent;
import com.project.chatapp.service.MessageService;
import com.project.chatapp.service.PresenceService;
import com.project.chatapp.websocket.PresenceBroadcaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class PresenceEventListener {

    @Autowired
    private MessageService messageService;

    @Autowired
    private PresenceService presenceService;

    @Autowired
    private PresenceBroadcaster presenceBroadcaster;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void handleUserConnected(UserConnectedEvent event){

        presenceService.userOnline(event.getUserId());

        List<MessageResponse> messages = messageService.
                markPendingMessagesAsDelivered(event.getUserId());

        messages.forEach(message->
                messagingTemplate.convertAndSend(
                        "/topic/user"+message.getSenderId(),
                        message
                ));

        presenceBroadcaster.broadCastOnlineUsers();
    }
}
