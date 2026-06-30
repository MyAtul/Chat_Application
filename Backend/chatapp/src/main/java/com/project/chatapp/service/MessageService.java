package com.project.chatapp.service;

import com.project.chatapp.dto.ChatMessage;
import com.project.chatapp.dto.MessageResponse;
import com.project.chatapp.dto.SendMessageRequest;
import com.project.chatapp.entity.Message;
import com.project.chatapp.entity.User;
import com.project.chatapp.enums.MessageStatus;
import com.project.chatapp.enums.MessageType;
import com.project.chatapp.repo.MessageRepo;
import com.project.chatapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PresenceService presenceService;

    public Message sendMessage(SendMessageRequest request, String username) {

        User sender = userRepo.findByUsername(username).orElseThrow();

        Message message = createMessage(
                sender.getId(),
                request.getReceiverId(),
                request.getContent()
        );

        return messageRepo.save(message);
    }

    public List<Message> getChatHistory(Long receiverId, String username) {

        User currentUser = userRepo.findByUsername(username).orElseThrow();

        return messageRepo.findChatHistory(
                currentUser.getId(),
                receiverId
        );
    }

    public MessageResponse saveWebSocketMessage(
            ChatMessage chatMessage,
            String username
    ) {

        User sender = userRepo.findByUsername(username).orElseThrow();

        Message message = createMessage(
                sender.getId(),
                chatMessage
        );

        Message savedMessage = messageRepo.save(message);

        return toMessageResponse(savedMessage);
    }

    public List<MessageResponse> markAsRead(Long senderId, String username) {

        User receiver = userRepo.findByUsername(username).orElseThrow();

        List<Message> messages = messageRepo.findBySenderIdAndReceiverIdAndStatus(
                senderId,
                receiver.getId(),
                MessageStatus.DELIVERED
        );

        messages.forEach(message ->
                message.setStatus(MessageStatus.READ));

        List<Message> updatedMessages = messageRepo.saveAll(messages);

        return updatedMessages
                .stream()
                .map(this::toMessageResponse)
                .toList();
    }

    public List<MessageResponse> markPendingMessagesAsDelivered(Long receiverId) {

        List<Message> messages = messageRepo.findByReceiverIdAndStatus(
                receiverId,
                MessageStatus.SENT
        );

        messages.forEach(message ->
                message.setStatus(MessageStatus.DELIVERED)
        );

        List<Message> updatedMessages = messageRepo.saveAll(messages);

        return updatedMessages
                .stream()
                .map(this::toMessageResponse)
                .toList();
    }

    private MessageResponse toMessageResponse(Message message) {

        return new MessageResponse(
                message.getId(),
                message.getSenderId(),
                message.getReceiverId(),
                message.getContent(),
                message.getMessageType(),
                message.getAttachmentUrl(),
                message.getAttachmentName(),
                message.getAttachmentSize(),
                message.getTimeStamp(),
                message.getStatus()
        );
    }

    private Message createMessage(
            Long senderId,
            Long receiverId,
            String content
    ) {

        Message message = new Message();

        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setContent(content);
        message.setMessageType(MessageType.TEXT);
        message.setTimeStamp(LocalDateTime.now());

        if (presenceService.isOnline(receiverId)) {
            message.setStatus(MessageStatus.DELIVERED);
        } else {
            message.setStatus(MessageStatus.SENT);
        }

        return message;
    }

    private Message createMessage(
            Long senderId,
            ChatMessage chatMessage
    ) {

        Message message = new Message();

        message.setSenderId(senderId);
        message.setReceiverId(chatMessage.getReceiverId());

        message.setContent(chatMessage.getContent());

        message.setMessageType(
                chatMessage.getMessageType() == null
                        ? MessageType.TEXT
                        : chatMessage.getMessageType()
        );

        message.setAttachmentUrl(chatMessage.getAttachmentUrl());
        message.setAttachmentName(chatMessage.getAttachmentName());
        message.setAttachmentSize(chatMessage.getAttachmentSize());

        message.setTimeStamp(LocalDateTime.now());

        if (presenceService.isOnline(chatMessage.getReceiverId())) {
            message.setStatus(MessageStatus.DELIVERED);
        } else {
            message.setStatus(MessageStatus.SENT);
        }

        return message;
    }
}