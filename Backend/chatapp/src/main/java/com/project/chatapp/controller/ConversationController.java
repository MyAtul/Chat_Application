package com.project.chatapp.controller;

import com.project.chatapp.dto.ConversationResponse;
import com.project.chatapp.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/conversations")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    @GetMapping
    public List<ConversationResponse> getConversations(Principal principal){
        return conversationService
                .getConversations(principal.getName());
    }
}
