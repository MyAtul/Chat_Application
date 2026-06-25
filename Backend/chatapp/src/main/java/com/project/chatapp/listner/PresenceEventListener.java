package com.project.chatapp.listner;

import com.project.chatapp.event.UserConnectedEvent;
import com.project.chatapp.service.PresenceService;
import com.project.chatapp.websocket.PresenceBroadcaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Controller;

@Controller
public class PresenceEventListener {

    @Autowired
    private PresenceService presenceService;

    @Autowired
    private PresenceBroadcaster presenceBroadcaster;

    @EventListener
    public void handleUserConnected(UserConnectedEvent event){

        presenceService.userOnline(event.getUserId());

        presenceBroadcaster.broadCastOnlineUsers();
    }
}
