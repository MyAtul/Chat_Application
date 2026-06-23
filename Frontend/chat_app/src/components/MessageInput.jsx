import React from 'react'

const MessageInput = () => {
  return (
    <div className="
      border-t
      border-slate-800
      p-4
      bg-slate-900
    ">

      <div className="flex gap-3">

        <input
          placeholder="Type a message..."
          className="
            flex-1
            bg-slate-800
            rounded-xl
            px-4
            py-3
            outline-none
          "
        />

        <button
          className="bg-blue-600 px-6 rounded-xl hover:bg-blue-500"
        >
          Send
        </button>

      </div>

    </div>
  )
}

export default MessageInput