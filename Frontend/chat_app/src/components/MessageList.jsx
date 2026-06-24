import React, { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

const MessageList = ({messages,currentUserId}) => {

  const messagesEndRef = useRef(null);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        })

    }, [messages])

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

        <div ref={messagesEndRef}></div>
    </div>
  )
}

export default MessageList