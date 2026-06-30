package com.project.chatapp.service;

import com.project.chatapp.dto.UploadResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UploadService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public UploadResponse uploadImage(MultipartFile file) throws IOException {

        if(file.isEmpty()){
            throw new RuntimeException("file is empty");
        }

        String originalFileName = file.getOriginalFilename();
        String uniqueFileName = UUID.randomUUID() + "-" + originalFileName;

        System.out.println(originalFileName);
        System.out.println(uniqueFileName);
        System.out.println(file.getContentType());
        System.out.println(file.getSize());

        Path uploadPath = Paths.get(uploadDir,"images");
        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(uniqueFileName);

        file.transferTo(filePath);

        return new UploadResponse(
                "/uploads/images/"+uniqueFileName,
                originalFileName,
                file.getSize()
        );
    }
}
