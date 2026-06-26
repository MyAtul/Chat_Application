import React from 'react'
import Avatar from './Avatar'

const Sidebar = (
  {
    conversations,
    selectedConversation,
    setSelectedConversation,
    onlineUsers
  }
) => {

  return (
    <div className="hidden md:flex flex-col w-80 border-r border-slate-800 bg-slate-900">

      <div className="p-6">

        <h1 className="text-3xl font-bold">
          Chats
        </h1>

        <input
          placeholder="Search users..."
          className="
            mt-6
            w-full
            hover:bg-slate-800
            transition
            rounded-xl
            px-4
            py-3
            outline-none
          "
        />

      </div>

      <div className="flex-1 overflow-y-auto">
        {

          conversations.map((conversation)=>{

            const isOnline = onlineUsers.includes(conversation.userId)
            return(
              <div 
              key={conversation.userId}
              onClick={()=>setSelectedConversation(conversation)}
              className={`
                mx-3 mb-2 p-4 rounded cursor-pointer transition
                ${
                  selectedConversation?.userId === conversation.userId
                  ?"bg-slate-800 border-l-4 border-blue-500"
                  :"hover:bg-slate-800"
                }
                
              `}
            >
              <div className='flex gap-2 items-center'>
                <div className="relative">

                    <Avatar username={conversation.username}/>

                    <span
                        className={`
                            absolute
                            bottom-0
                            right-0
                            w-3
                            h-3
                            rounded-full
                            border-2
                            border-slate-900
                            ${
                                isOnline
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                            }
                        `}
                    />

                </div>

                <div>
                  <p className='font-medium'>{conversation.username}</p>
                   <p className='text-sm text-gray-400 truncate'>
                    {conversation.lastMessage}
                   </p>
                </div>
              </div>
              
              
            </div>
            )   
          })
        }
        
      </div>

    </div>
  )
}

export default Sidebar