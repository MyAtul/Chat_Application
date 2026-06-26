package com.project.chatapp.service;

import com.project.chatapp.dto.UserResponse;
import com.project.chatapp.entity.Message;
import com.project.chatapp.entity.User;
import com.project.chatapp.repo.MessageRepo;
import com.project.chatapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MessageRepo messageRepo;

    public List<UserResponse> getAllUsers() {
        return userRepo.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getUsername()
                )).toList();
    }
}
