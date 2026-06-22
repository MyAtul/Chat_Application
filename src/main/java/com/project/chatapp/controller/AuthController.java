package com.project.chatapp.controller;

import com.project.chatapp.dto.LoginRequest;
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
    public String login(@RequestBody LoginRequest request){
        return authService.login(request);
    }

    @GetMapping("/test")
    public String test(){
        return "Testing Protected";
    }
}
