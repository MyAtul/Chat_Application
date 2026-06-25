package com.project.chatapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PresenceService {


    private final Set<Long> onlineUsers =
            ConcurrentHashMap.newKeySet();

    public void userOnline(Long userId){
        onlineUsers.add(userId);
    }

    public void userOffline(Long userId){
        onlineUsers.remove(userId);
    }

    public Set<Long> getOnlineUsers(){
        return onlineUsers;
    }
}
