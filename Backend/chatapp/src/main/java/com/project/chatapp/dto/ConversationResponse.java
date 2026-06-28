package com.project.chatapp.dto;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ConversationResponse {

    private Long userId;
    private String username;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private Long unreadCount;
    public ConversationResponse(){}

    public ConversationResponse(Long userId, String username, String lastMessage, LocalDateTime lastMessageTime,Long unreadCount) {
        this.userId = userId;
        this.username = username;
        this.lastMessage = lastMessage;
        this.lastMessageTime = lastMessageTime;
        this.unreadCount = unreadCount;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public LocalDateTime getLastMessageTime() {
        return lastMessageTime;
    }

    public void setLastMessageTime(LocalDateTime lastMessageTime) {
        this.lastMessageTime = lastMessageTime;
    }

    public Long getUnreadCount() {
        return unreadCount;
    }

    public void setUnreadCount(Long unreadCount) {
        this.unreadCount = unreadCount;
    }
}
