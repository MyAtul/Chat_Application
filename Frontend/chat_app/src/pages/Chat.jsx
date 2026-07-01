import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatHeader from '../components/ChatHeader'
import MessageBubble from '../components/MessageBubble'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import { getOnlineUsers } from '../services/userService'
import { getChatHistory } from '../services/messageService'
import { connectSocket,  sendRead } from '../websockets/socket'
import { getConversation } from '../services/conversationService'
import EmptyState from '../components/EmptyState'

const Chat = () => {

  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [typingEvent, setTypingEvent] = useState(null)
  const [typingUsers, setTypingUsers] = useState({})

  const selectedConversationRef = useRef(null)


  const fetchOnlineUsers =async ()=>{

    try{

      const data = await getOnlineUsers()

      setOnlineUsers(data)
    }catch(error){
      console.log(error)
    }
  }

  const fetchConversations = async ()=>{

    try{

      const data = await getConversation()

      setConversations(data)

    }catch(error){
      console.log(error)
    }
    
  }


  const fetchMessages =async (receiverId)=>{

    try{

      const message = await getChatHistory(receiverId)
      
      setMessages(message)

    }catch(error){

      console.log(error)

    }
  }


  useEffect(()=>{

    selectedConversationRef.current = selectedConversation

  },[selectedConversation])

  const handleIncomingMessage =(message)=>{
  
    fetchConversations()

    const conversation = selectedConversationRef.current
    
    if(!conversation) return

    const belongToConversation = 
          (message.senderId === conversation.userId &&
            message.receiverId === currentUserId) || 

            (message.senderId === currentUserId && 
              message.receiverId === conversation.userId)

    if(belongToConversation){

        setMessages(prev=>{
          
          const exists = prev.some(msg=>msg.id === message.id)

          if(exists){
            return prev.map(msg =>
              msg.id === message.id ? message : msg
            )
          }
          return [...prev,message]
        })

        if (
              message.senderId === conversation.userId &&
              message.receiverId === currentUserId &&
              message.status === "DELIVERED"
          ) {
              sendRead(conversation.userId);
          }
    }
    
  }

  const handlePresenceUpdate = (onlineUsers)=>{
    setOnlineUsers(onlineUsers)
  }

  const handleTyping = (event)=>{

    setTypingEvent(event.typing ? event : null)

    setTypingUsers(prev =>{
      
      const update = {...prev}

      if(event.typing){

        update[event.senderId] = event

      }else{

        delete update[event.senderId]

      }
      return update
    })

  }

  useEffect(()=>{

    connectSocket(
      handleIncomingMessage,
      handleTyping,
      handlePresenceUpdate
    )

  },[])

  useEffect(()=>{

    if(!selectedConversation) return

    fetchMessages(selectedConversation.userId)

    sendRead(selectedConversation.userId)

  },[selectedConversation])

  useEffect(()=>{

    fetchConversations()
    fetchOnlineUsers()

  },[])

  useEffect(()=>{

    setTypingEvent(null)

  },[selectedConversation])

  const currentUserId = Number(localStorage.getItem("userId"))
  const currentuser = localStorage.getItem("username")

  return (
    <div className='h-screen bg-linear-to-br
        from-slate-950
        via-slate-900
        to-slate-950 text-white flex'>

      <Sidebar
      conversations={conversations}
      selectedConversation={selectedConversation}
      setSelectedConversation={setSelectedConversation}
      onlineUsers={onlineUsers}
      typingUsers={typingUsers}
      />
      <div className='flex-1 flex flex-col'>
        <ChatHeader
        selectedConversation={selectedConversation}
        onlineUsers={onlineUsers}
        typingEvent={typingEvent}
        />

        {
          selectedConversation ? (
            <>
              <MessageList 
                messages={messages}
                currentUserId={currentUserId}
                />

                <MessageInput
                selectedConversation={selectedConversation}
                fetchMessages={fetchMessages}
                fetchConversations={fetchConversations}
              />
            </>
          ):(
            <EmptyState/>
          )
        }
        

      </div>
    </div>
  )
}

export default Chat