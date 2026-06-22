package com.project.chatapp.service;

import com.project.chatapp.dto.LoginRequest;
import com.project.chatapp.dto.RegisterRequest;
import com.project.chatapp.entity.User;
import com.project.chatapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String register(RegisterRequest request) {

        if(userRepo.findByUsername(request.getUsername()).isPresent()){
            return "User Already exist";
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepo.save(user);
         return "User Register";
    }

    public String login(LoginRequest request) {

        User user = userRepo.findByUsername(request.getUsername()).orElse(null);

        if(user == null){
            return "User not found";
        }

        if(passwordEncoder.matches(
                request.getPassword(),user.getPassword())){
            return jwtService.generateToken(user.getUsername());
        }
        return "Invalid Credential";
    }
}
