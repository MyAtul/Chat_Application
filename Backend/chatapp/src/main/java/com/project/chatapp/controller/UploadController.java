package com.project.chatapp.controller;

import com.project.chatapp.dto.UploadResponse;
import com.project.chatapp.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @PostMapping("/image")
    public UploadResponse uploadImage(
            @RequestParam("file") MultipartFile file
    )throws IOException{
        System.out.println("in Image upload");
        return uploadService.uploadImage(file);
    }
}
