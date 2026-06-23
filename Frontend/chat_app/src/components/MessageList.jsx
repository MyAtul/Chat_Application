import React from 'react'
import MessageBubble from './MessageBubble'

const MessageList = () => {

    const messages = [
        {
            id:1,
            content:"Hello",
            mine:true
        },
        {
            id:2,
            content:"How are you?",
            mine:false
        }
    ]
  return (
    <div className='flex-1 overflow-y-auto p-6'>
        {
            messages.map(message =>(
                <MessageBubble 
                key={message.id}
                content={message.content}
                mine={message.mine}
                />
            ))
        }
    </div>
  )
}

export default MessageList