import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatHeader from '../components/ChatHeader'
import MessageBubble from '../components/MessageBubble'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'

const Chat = () => {
  return (
    <div className='h-screen bg-linear-to-br
        from-slate-950
        via-slate-900
        to-slate-950 text-white flex'>

      <Sidebar/>
      <div className='flex-1 flex flex-col'>
        <ChatHeader/>
  
        <MessageList />

        <MessageInput/>

      </div>
    </div>
  )
}

export default Chat