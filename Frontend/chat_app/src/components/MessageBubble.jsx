import React from 'react'
import MessageStatus from './MessageStatus'

const MessageBubble = (
    {
        message,
        currentUserId
    }
) => {

    const mine = message.senderId === currentUserId

    const timestamp = message.timestamp || message.timeStamp;

    return (
        <div
            className={`max-w-[75%] md:max-w-[65%] px-4 py-3 rounded-2xl mb-4 shadow-md

                ${
                    mine
                        ? "bg-[#005c4b] ml-auto"
                        : "bg-slate-800"
                }
            `}
        >
            <p className="wrap-break-words">
                {message.content}
            </p>

            <div className="flex justify-end items-center gap-1 mt-1 opacity-80">

                <span className="text-xs text-gray-300">
                    {
                        timestamp &&
                        new Date(timestamp).toLocaleTimeString(
                            [],
                            {
                                hour: "2-digit",
                                minute: "2-digit"
                            }
                        )
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