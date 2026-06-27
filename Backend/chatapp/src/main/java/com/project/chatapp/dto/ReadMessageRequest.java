package com.project.chatapp.dto;

public class ReadMessageRequest {

    private Long senderId;

    public ReadMessageRequest(){

    }

    public ReadMessageRequest(Long senderId){
        this.senderId = senderId;
    }

    public Long getSenderId(){
        return senderId;
    }

    public void setSenderId(Long senderId){
        this.senderId = senderId;
    }
}
