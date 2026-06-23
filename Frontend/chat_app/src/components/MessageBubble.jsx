import React from 'react'

const MessageBubble = (
    {
        content,
        mine
    }
) => {
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
            ? "bg-blue-600 ml-auto"
            : "bg-slate-800"
        }
      `}
    >
      {content}
    </div>
  )
}

export default MessageBubble