import React from "react";
import { MessageCircleMore } from "lucide-react";

const EmptyState = () => {
    return (
        <div
            className=" flex-1 flex items-center justify-center bg-linear-to-br from-slate-950
             via-slate-900 to-slate-950 p-6"
        >
            <div
                className=" flex flex-col items-center justify-center text-center w-full max-w-md"
            >
                {/* Icon */}
                <div
                    className=" flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-800
                        border border-slate-700 shadow-lg shadow-blue-500/10"
                >
                    <MessageCircleMore
                        size={42}
                        className="text-blue-500 sm:w-12 sm:h-12"
                    />
                </div>

                {/* Title */}
                <h1
                    className=" mt-8 text-2xl sm:text-3xl font-bold tracking-tight text-white"
                >
                    No Conversation Selected
                </h1>

                {/* Subtitle */}
                <p
                    className=" mt-4 max-w-sm text-sm sm:text-base leading-7 text-slate-400"
                >
                    Choose a conversation from the sidebar to start chatting.
                    Your messages will appear here instantly.
                </p>

                {/* Badge */}
                <div
                    className=" mt-8 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-5
                        py-2.5 text-sm text-slate-300"
                >
                    <MessageCircleMore
                        size={16}
                        className="text-blue-400"
                    />

                    <span>
                        Real-time Messaging
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;