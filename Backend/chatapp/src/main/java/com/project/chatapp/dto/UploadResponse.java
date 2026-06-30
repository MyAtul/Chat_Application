package com.project.chatapp.dto;

public class UploadResponse {

    private String attachmentUrl;
    private String attachmentName;
    private Long attachmentSize;

    public UploadResponse(){}

    public UploadResponse(String attachmentUrl, String attachmentName, Long attachmentSize) {
        this.attachmentUrl = attachmentUrl;
        this.attachmentName = attachmentName;
        this.attachmentSize = attachmentSize;
    }

    public String getAttachmentUrl() {
        return attachmentUrl;
    }

    public void setAttachmentUrl(String attachmentUrl) {
        this.attachmentUrl = attachmentUrl;
    }

    public String getAttachmentName() {
        return attachmentName;
    }

    public void setAttachmentName(String attachmentName) {
        this.attachmentName = attachmentName;
    }

    public Long getAttachmentSize() {
        return attachmentSize;
    }

    public void setAttachmentSize(Long attachmentSize) {
        this.attachmentSize = attachmentSize;
    }
}
