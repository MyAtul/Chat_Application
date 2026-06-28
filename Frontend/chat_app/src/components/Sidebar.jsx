import React from 'react'
import Avatar from './Avatar'
import { Search } from 'lucide-react'

const Sidebar = ({
    conversations,
    selectedConversation,
    setSelectedConversation,
    onlineUsers,
    typingUsers
}) => {

    return (
        <div className="hidden md:flex flex-col w-80 border-r border-slate-800 bg-slate-900">

            {/* Header */}
            <div className="p-6 border-b border-slate-800">

                <div className="flex items-center justify-between">

                    <h1 className="text-3xl font-bold">
                        Chats
                    </h1>

                    <span className="text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                        {conversations.length}
                    </span>

                </div>

                {/* Search */}
                <div className="relative mt-6">

                    <Search
                        size={18}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    />

                    <input
                        placeholder="Search users..."
                        className="
                            w-full
                            bg-slate-800
                            hover:bg-slate-700
                            focus:bg-slate-700
                            transition
                            rounded-xl
                            pl-11
                            pr-4
                            py-3
                            outline-none
                            text-sm
                            placeholder:text-slate-400
                        "
                    />

                </div>

            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto py-3">

                {
                    conversations.map((conversation) => {

                        const isOnline =
                            onlineUsers.includes(conversation.userId)

                        const isTyping = !!typingUsers[conversation.userId]

                        return (

                            <div
                                key={conversation.userId}
                                onClick={() =>
                                    setSelectedConversation(conversation)
                                }
                                className={`
                                    mx-3
                                    mb-2
                                    p-4
                                    rounded-2xl
                                    cursor-pointer
                                    transition-all
                                    duration-200

                                    ${
                                        selectedConversation?.userId === conversation.userId
                                            ? "bg-slate-800 border border-blue-500/40 shadow-lg shadow-blue-500/10"
                                            : "hover:bg-slate-800 hover:scale-[1.01]"
                                    }
                                `}
                            >

                                <div className="flex items-center gap-3">

                                    {/* Avatar */}
                                    <div className="relative">

                                        <Avatar
                                            username={conversation.username}
                                        />

                                        <span
                                            className={`
                                                absolute
                                                -bottom-0.5
                                                -right-0.5
                                                w-3.5
                                                h-3.5
                                                rounded-full
                                                border-2
                                                border-slate-900
                                                ${
                                                    isOnline
                                                        ? "bg-green-500 animate-pulse"
                                                        : "bg-gray-500"
                                                }
                                            `}
                                        />

                                    </div>

                                    {/* Username + Last Message */}
                                    <div className="flex-1 min-w-0">

                                        <div className='flex justify-between items-center'>

                                            <p className='font-medium truncate'>
                                                {conversation.username}
                                            </p>

                                            {
                                                conversation.unreadCount > 0 && (
                                                    <span className='flex justify-center items-center ml-2 h-5 bg-blue-500
                                                        rounded-full min-w-5 px-2 text-white font-semibold text-xs'
                                                    >
                                                        {conversation.unreadCount}
                                                    </span>
                                                )
                                            }

                                        </div>

                                        <p className={`
                                            text-sm truncate ${
                                                isTyping
                                                ?"text-blue-500"
                                                :"text-gray-500"
                                            }
                                        `}
                                        >
                                            {
                                                isTyping
                                                ?"Typing..."
                                                : conversation.lastMessage
                                            }
                                        </p>

                                    </div>

                                </div>

                            </div>

                        )

                    })
                }

            </div>

        </div>
    )
}

export default Sidebar