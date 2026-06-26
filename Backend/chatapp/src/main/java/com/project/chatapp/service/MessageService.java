package com.project.chatapp.service;

import com.project.chatapp.dto.ChatMessage;
import com.project.chatapp.dto.MessageResponse;
import com.project.chatapp.dto.SendMessageRequest;
import com.project.chatapp.entity.Message;
import com.project.chatapp.entity.User;
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

    public Message sendMessage(SendMessageRequest request, String username) {
        User sender = userRepo.findByUsername(username).orElseThrow();
        Message message = new Message();

        message.setSenderId(sender.getId());

        message.setReceiverId(request.getReceiverId());
        message.setContent(request.getContent());
        message.setTimestamp(LocalDateTime.now());

        return messageRepo.save(message);
    }

    public List<Message> getChatHistory(Long receiverId, String username) {
        User currentUser = userRepo.findByUsername(username).orElseThrow();

        return messageRepo.findChatHistory(currentUser.getId(), receiverId);
    }

    public MessageResponse saveWebSocketMessage(ChatMessage chatMessage, String username) {

        User sender = userRepo.findByUsername(username).orElseThrow();

        Message message = new Message();

        message.setSenderId(sender.getId());
        message.setReceiverId(chatMessage.getReceiverId());
        message.setContent(chatMessage.getContent());
        message.setTimestamp(LocalDateTime.now());

        Message messageSaved = messageRepo.save(message);

        return new MessageResponse(
                messageSaved.getId(),
                messageSaved.getSenderId(),
                messageSaved.getReceiverId(),
                messageSaved.getContent(),
                messageSaved.getTimestamp()
        );
    }
}
