package com.project.chatapp.service;

import com.project.chatapp.dto.UploadResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;
import java.util.UUID;

@Service
public class UploadService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private static final Set<String> IMAGE_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/gif",
            "image/webp"
    );

    private static final Set<String> DOCUMENT_TYPES = Set.of(
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain"
    );

    private static final Set<String> VIDEO_TYPES = Set.of(
            "video/mp4",
            "video/webm",
            "video/quicktime",
            "video/x-msvideo"
    );

    private static final Set<String> AUDIO_TYPES = Set.of(
            "audio/mpeg",
            "audio/wav",
            "audio/ogg",
            "audio/x-wav"
    );

    public UploadResponse uploadImage(MultipartFile file) throws IOException {
        return uploadFile(file, "images", IMAGE_TYPES);
    }

    public UploadResponse uploadDocument(MultipartFile file) throws IOException {
        return uploadFile(file, "documents", DOCUMENT_TYPES);
    }

    public UploadResponse uploadVideo(MultipartFile file) throws IOException {
        return uploadFile(file, "videos", VIDEO_TYPES);
    }

    public UploadResponse uploadAudio(MultipartFile file) throws IOException {
        return uploadFile(file, "audio", AUDIO_TYPES);
    }

    private UploadResponse uploadFile(MultipartFile file,String folder,Set<String> allowedTypes) throws IOException {

        if (file.isEmpty()) {
            throw new RuntimeException("File is empty.");
        }

        if (!allowedTypes.contains(file.getContentType())) {
            throw new RuntimeException("Unsupported file type.");
        }

        String originalFileName = file.getOriginalFilename();
        String uniqueFileName = UUID.randomUUID() + "-" + originalFileName;

        Path uploadPath = Paths.get(uploadDir, folder);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(uniqueFileName);

        file.transferTo(filePath);

        return new UploadResponse(
                "/uploads/" + folder + "/" + uniqueFileName,
                originalFileName,
                file.getSize()
        );
    }
}