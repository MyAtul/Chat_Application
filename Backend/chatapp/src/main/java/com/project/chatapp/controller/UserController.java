package com.project.chatapp.controller;

import com.project.chatapp.dto.UserResponse;
import com.project.chatapp.service.PresenceService;
import com.project.chatapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PresenceService presenceService;

    @GetMapping
    public List<UserResponse> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/online")
    public Set<Long> getOnlineUser(){
        return presenceService.getOnlineUsers();
    }
}
