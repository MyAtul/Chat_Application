import React from 'react'
import MessageStatus from './MessageStatus'

const BASE_URL = "http://localhost:8080";

const MessageBubble = ({
    message,
    currentUserId
}) => {

    const mine = message.senderId === currentUserId;

    const timestamp = message.timestamp || message.timeStamp;

    const formatFileSize = (bytes) => {

        if (!bytes) return "";

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const renderMessage = () => {

        switch (message.messageType) {

            case "IMAGE":
                return (
                    <button
                        type="button"
                        className="rounded-xl overflow-hidden"
                    >
                        <img
                            src={`${BASE_URL}${message.attachmentUrl}`}
                            alt={message.attachmentName}
                            className="
                                rounded-xl
                                max-w-xs
                                md:max-w-sm
                                max-h-80
                                object-cover
                                cursor-pointer
                                hover:opacity-90
                                transition
                            "
                        />
                    </button>
                );

            case "FILE":
                return (
                    <a
                        href={`${BASE_URL}${message.attachmentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            bg-slate-700
                            p-3
                            hover:bg-slate-600
                            transition
                        "
                    >
                        <div className="text-3xl">
                            📄
                        </div>

                        <div className="flex flex-col">
                            <span className="font-medium break-all">
                                {message.attachmentName}
                            </span>

                            <span className="text-xs text-gray-300">
                                {formatFileSize(message.attachmentSize)}
                            </span>
                        </div>
                    </a>
                );

            case "VIDEO":
                return (
                    <video
                        controls
                        className="
                            rounded-xl
                            max-w-xs
                            md:max-w-sm
                            max-h-80
                        "
                    >
                        <source
                            src={`${BASE_URL}${message.attachmentUrl}`}
                        />
                        Your browser does not support video playback.
                    </video>
                );

            case "AUDIO":
                return (
                    <audio
                        controls
                        className="w-full"
                    >
                        <source
                            src={`${BASE_URL}${message.attachmentUrl}`}
                        />
                        Your browser does not support audio playback.
                    </audio>
                );

            case "TEXT":
            default:
                return (
                    <p className="wrap-break-words whitespace-pre-wrap">
                        {message.content}
                    </p>
                );
        }
    };

    return (
        <div
            className={`
                max-w-[75%]
                md:max-w-[65%]
                px-4
                py-3
                rounded-2xl
                mb-4
                shadow-md

                ${
                    mine
                        ? "bg-[#005c4b] ml-auto"
                        : "bg-slate-800"
                }
            `}
        >

            {renderMessage()}

            <div className="flex justify-end items-center gap-1 mt-2 opacity-80">

                <span className="text-xs text-gray-300">
                    {
                        timestamp &&
                        new Date(timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    }
                </span>

                {
                    mine &&
                    <MessageStatus
                        status={message.status}
                    />
                }

            </div>

        </div>
    )
}

export default MessageBubble