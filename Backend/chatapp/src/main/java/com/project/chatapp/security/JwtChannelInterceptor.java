package com.project.chatapp.security;

import com.project.chatapp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class JwtChannelInterceptor implements ChannelInterceptor {

    @Autowired
    private JwtService jwtService;

    @Override
     public Message<?> preSend(
             Message<?> message,
             MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if(StompCommand.CONNECT.equals(accessor.getCommand())){

            String authHeader = accessor.getFirstNativeHeader("Authorization");

            if(authHeader != null && authHeader.startsWith("Bearer ")){

                String token = authHeader.substring(7);
                String username = jwtService.extractUsername(token);

                accessor.setUser(
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                Collections.emptyList()
                        )
                );

                accessor.getSessionAttributes()
                                .put("username",username);
            }
        }

        return message;
    }
}
