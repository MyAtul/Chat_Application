package com.project.chatapp.service;

import com.project.chatapp.dto.ChatMessage;
import com.project.chatapp.dto.MessageResponse;
import com.project.chatapp.dto.SendMessageRequest;
import com.project.chatapp.entity.Message;
import com.project.chatapp.entity.User;
import com.project.chatapp.enums.MessageStatus;
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

    // REST API (optional)
    public Message sendMessage(SendMessageRequest request, String username) {

        User sender = userRepo.findByUsername(username).orElseThrow();

       Message message = createMessage(
               sender.getId(),
               request.getReceiverId(),
               request.getContent()
       );

        return messageRepo.save(message);
    }

    // Chat History
    public List<Message> getChatHistory(Long receiverId, String username) {

        User currentUser = userRepo.findByUsername(username).orElseThrow();

        return messageRepo.findChatHistory(
                currentUser.getId(),
                receiverId
        );
    }

    // WebSocket
    public MessageResponse saveWebSocketMessage(
            ChatMessage chatMessage,
            String username
    ) {

        User sender = userRepo.findByUsername(username).orElseThrow();

        Message message = createMessage(
                sender.getId(),
                chatMessage.getReceiverId(),
                chatMessage.getContent()
        );

        Message savedMessage = messageRepo.save(message);

        return toMessageResponse(savedMessage);
    }

    public List<MessageResponse> markAsRead(Long senderId,String username){
        System.out.println("In service of mark as read");
        User receiver = userRepo.findByUsername(username).orElseThrow();

        System.out.println("Receiver : " + receiver.getId());
        System.out.println("Sender : " + senderId);

        List<Message> messages = messageRepo.findBySenderIdAndReceiverIdAndStatus(
                senderId,
                receiver.getId(),
                MessageStatus.DELIVERED
        );

        messages.forEach(message ->
                message.setStatus(MessageStatus.READ));

        List<Message> updatedMessages = messageRepo.saveAll(messages);

        System.out.println("Messages Found : " + messages.size());

        return updatedMessages
                .stream()
                .map(this::toMessageResponse)
                .toList();
    }

    public List<MessageResponse> markPendingMessagesAsDelivered(Long receiverId){

        List<Message> messages = messageRepo.findByReceiverIdAndStatus(
                receiverId,
                MessageStatus.SENT
        );

        messages.forEach(message ->
                message.setStatus(MessageStatus.DELIVERED)
                );

        List<Message> updatedMessages = messageRepo.saveAll(messages);

        System.out.println("Pending message " + messages.size());

        return updatedMessages.stream()
                .map(this::toMessageResponse)
                .toList();
    }

    private MessageResponse toMessageResponse(Message message){
        return new MessageResponse(
                message.getId(),
                message.getSenderId(),
                message.getReceiverId(),
                message.getContent(),
                message.getTimestamp(),
                message.getStatus()
        );
    }

    private Message createMessage(Long senderId,Long receiverId,String content) {

        Message message = new Message();

        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        message.setStatus(MessageStatus.SENT);

        return message;
    }
}