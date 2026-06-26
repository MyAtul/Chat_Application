package com.project.chatapp.service;

import com.project.chatapp.dto.ConversationResponse;
import com.project.chatapp.entity.Message;
import com.project.chatapp.entity.User;
import com.project.chatapp.repo.MessageRepo;
import com.project.chatapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class ConversationService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MessageRepo messageRepo;

    public List<ConversationResponse> getConversations(String username) {

        User currentUser = userRepo.findByUsername(username).orElseThrow();

        List<User> users = userRepo.findAll()
                .stream()
                .filter(user -> !user.getId().equals(currentUser.getId()))
                .toList();

        return users.stream()
                .map(user -> {
                    List<Message>  conversation = messageRepo
                            .findConversations(
                                    currentUser.getId(),
                                    user.getId()
                            );

                    Message latestMessage = conversation.isEmpty()
                            ? null
                            : conversation.get(0);

                    String lastMessage = latestMessage == null
                            ? "No message yet"
                            :latestMessage.getContent();

                    LocalDateTime lastMessageTime = latestMessage == null
                            ?null
                            : latestMessage.getTimestamp();

                    return new ConversationResponse(
                            user.getId(),
                            user.getUsername(),
                            lastMessage,
                            lastMessageTime
                    );
                }).sorted(
                        Comparator.comparing(
                                ConversationResponse::getLastMessageTime,
                                Comparator.nullsLast(Comparator.reverseOrder())
                        )
                ).toList();

    }
}
