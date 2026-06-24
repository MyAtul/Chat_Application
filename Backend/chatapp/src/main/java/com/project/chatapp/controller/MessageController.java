package com.project.chatapp.controller;

import com.project.chatapp.dto.SendMessageRequest;
import com.project.chatapp.entity.Message;
import com.project.chatapp.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public Message message(@RequestBody SendMessageRequest request, Authentication authentication){
        return messageService.sendMessage(request,authentication.getName());
    }

    @GetMapping("/{receiverId}")
    public List<Message> getChatHistory(@PathVariable Long receiverId,
                                        Authentication authentication){

        return messageService.getChatHistory(receiverId,authentication.getName());
    }
}
