import React from 'react'

const MessageBubble = (
    {
        message,
        currentUserId
    }
) => {

  const mine = message.senderId === currentUserId
  return (
    <div
      className={`
        max-w-md
        px-4
        py-3
        rounded-2xl
        mb-4

        ${
          mine
          ?"bg-blue-600 ml-auto"
          :"bg-slate-800"
        }
      `}
    >
      {message.content}
    </div>
  )
}

export default MessageBubble