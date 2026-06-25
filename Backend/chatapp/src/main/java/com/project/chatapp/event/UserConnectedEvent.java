package com.project.chatapp.event;

public class UserConnectedEvent {

    private final Long userId;

    public UserConnectedEvent(Long userId) {
        this.userId = userId;
    }

    public Long getUserId(){
        return userId;
    }
}
