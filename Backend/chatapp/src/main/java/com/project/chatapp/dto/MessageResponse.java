package com.project.chatapp.dto;

import com.project.chatapp.enums.MessageStatus;
import com.project.chatapp.enums.MessageType;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MessageResponse {

    private Long id;
    private Long senderId;
    private Long receiverId;
    private String content;

    private MessageType messageType;
    private String attachmentUrl;
    private String attachmentName;
    private Long attachmentSize;

    private LocalDateTime timeStamp;
    private MessageStatus status;

    public MessageResponse() {
    }

    public MessageResponse(
            Long id, Long senderId, Long receiverId, String content, MessageType messageType, String attachmentUrl,
            String attachmentName, Long attachmentSize, LocalDateTime timeStamp, MessageStatus status
    ) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.messageType = messageType;
        this.attachmentUrl = attachmentUrl;
        this.attachmentName = attachmentName;
        this.attachmentSize = attachmentSize;
        this.timeStamp = timeStamp;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public void setMessageType(MessageType messageType) {
        this.messageType = messageType;
    }

    public String getAttachmentUrl() {
        return attachmentUrl;
    }

    public void setAttachmentUrl(String attachmentUrl) {
        this.attachmentUrl = attachmentUrl;
    }

    public String getAttachmentName() {
        return attachmentName;
    }

    public void setAttachmentName(String attachmentName) {
        this.attachmentName = attachmentName;
    }

    public Long getAttachmentSize() {
        return attachmentSize;
    }

    public void setAttachmentSize(Long attachmentSize) {
        this.attachmentSize = attachmentSize;
    }
}
