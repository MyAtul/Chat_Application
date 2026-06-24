import React from 'react'
import MessageBubble from './MessageBubble'

const MessageList = ({messages,currentUserId}) => {

  return (
    <div className='flex-1 overflow-y-auto p-6'>
        {
            messages.map(message =>(
                <MessageBubble 
                key={message.id}
                message={message}
                currentUserId={currentUserId}
                />
            ))
        }
    </div>
  )
}

export default MessageList