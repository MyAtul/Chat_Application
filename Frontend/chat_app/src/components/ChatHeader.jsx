import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import { disconnectSocket } from '../websockets/socket'

const ChatHeader = (
  {
    selectedConversation,
    onlineUsers,
    typingEvent
  }

) => {

  const navigate = useNavigate()

  const handleLogout = ()=>{

    disconnectSocket()
    
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("username")

    navigate("/login")
  }

  const isOnline =
        selectedConversation &&
        onlineUsers.includes(selectedConversation.userId)
  
  const isTyping = 
        typingEvent &&
        selectedConversation &&
        typingEvent.senderId === selectedConversation.userId

  return (
    <div className="
      h-20
      border-b
      border-slate-800
      flex
      items-center
      justify-between
      px-6
      bg-slate-900
    ">

      <div className='flex items-center gap-4'>

        {
          selectedConversation &&
          <Avatar 
            username={selectedConversation.username}
          />
        }

        <div>

          <h2 className='text-lg font-semibold captalize'>
            {
              selectedConversation
              ?selectedConversation.username
              :"ChatApp"
            }
          </h2>

          <p className={`
            text-sm
            ${
              isTyping
                ?"text-blue-400 italic animate-pulse"
                :isOnline
                  ?"text-green-500"
                  :"text-gray-500"
            }
          `}
          >
            
            {

              isTyping
                ?"Typing..."
                :isOnline
                  ?"online"
                  :"offline"

            }

          </p>
        </div>

      </div>

      <div className='flex gap-5'>
        <button 
        onClick={handleLogout}
        className="bg-red-700 px-4 py-2 rounded-lg hover:bg-red-600">
          Logout
        </button>

        <Link 
        to='/register'
        className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700">
          Register
        </Link>
      </div>
      

    </div>
  )
}

export default ChatHeader