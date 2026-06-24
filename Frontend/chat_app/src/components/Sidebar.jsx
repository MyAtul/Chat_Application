import React from 'react'
import Avatar from './Avatar'

const Sidebar = (
  {
    users,
    selectedUser,
    setSelectedUser
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

          users.map((user)=>(
            <div 
              key={user.id}
              onClick={()=>setSelectedUser(user)}
              className={`
                mx-3 mb-2 p-4 rounded cursor-pointer transition
                ${
                  selectedUser?.id === user.id
                  ?"bg-slate-800 border-l-4 border-blue-500"
                  :"hover:bg-slate-800"

                }
              `}
            >
              <div className='flex gap-2 items-center'>
                <Avatar username={user.username}/>
                <div>
                  <p className='font-medium'>{user.username}</p>
                </div>
              </div>
              
              
            </div>
          ))  
        }
        
      </div>

    </div>
  )
}

export default Sidebar