package com.project.chatapp.event;

public class TypingEvent {

    private Long senderId;
    private Long receiverId;
    private String senderUsername;
    private boolean typing;

    public TypingEvent() {
    }

    public TypingEvent(Long senderId, Long receiverId, String senderUsername, boolean typing) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.senderUsername = senderUsername;
        this.typing = typing;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public boolean isTyping() {
        return typing;
    }

    public void setTyping(boolean typing) {
        this.typing = typing;
    }
}
