import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatHeader from '../components/ChatHeader'
import MessageBubble from '../components/MessageBubble'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import { getAllUsers } from '../services/userService'
import { getChatHistory } from '../services/messageService'
import { connectSocket } from '../websockets/socket'

const Chat = () => {

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])

  const fetchUser = async ()=>{

    try{

      const data = await getAllUsers()

      setUsers(data)

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

  const handleIncomingMessage =(message)=>{
    
    setMessages(prev=>[...prev,message])
    
  }

  useEffect(()=>{
    connectSocket(handleIncomingMessage)
  },[])

  useEffect(()=>{

    if(!selectedUser) return

    fetchMessages(selectedUser.id)

  },[selectedUser])

  useEffect(()=>{

    fetchUser()

  },[])

  const currentUserId = Number(localStorage.getItem("userId"))
  const currentuser = localStorage.getItem("username")

  const filterUsers = users.filter(
    user=>user.username !== currentuser
  )

  return (
    <div className='h-screen bg-linear-to-br
        from-slate-950
        via-slate-900
        to-slate-950 text-white flex'>

      <Sidebar
      users={filterUsers}
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      />
      <div className='flex-1 flex flex-col'>
        <ChatHeader
        currentuser={currentuser}
        />

        {
          selectedUser ? (
            <>
              <MessageList 
                messages={messages}
                currentUserId={currentUserId}
                />

                <MessageInput
                selectedUser={selectedUser}
                fetchMessages={fetchMessages}
              />
            </>
          ):(
            <div className='flex-1 flex items-center justify-center text-slate-400'>
              Select a user to Start conversation
            </div>
          )
        }
        

      </div>
    </div>
  )
}

export default Chat