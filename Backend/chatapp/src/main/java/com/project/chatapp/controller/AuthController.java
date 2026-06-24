package com.project.chatapp.controller;

import com.project.chatapp.dto.LoginRequest;
import com.project.chatapp.dto.LoginResponse;
import com.project.chatapp.dto.RegisterRequest;
import com.project.chatapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return authService.login(request);
    }
}
