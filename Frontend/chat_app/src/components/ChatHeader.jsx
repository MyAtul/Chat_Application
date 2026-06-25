import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import { disconnectSocket } from '../websockets/socket'

const ChatHeader = ({currentuser}) => {

  const navigate = useNavigate()

  const handleLogout = ()=>{

    disconnectSocket()
    
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("username")

    navigate("/login")
  }
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

      <div>
        <h2 className="font-semibold text-xl capitalize flex items-center gap-3">
          <Avatar username={currentuser}/> {currentuser}
        </h2>

        <p className="text-green-500 text-sm">
          Online
        </p>
      </div>

      <div className='flex gap-5'>
        <button 
        onClick={handleLogout}
        className="bg-red-700 px-4 py-2 rounded-lg hover:bg-red-600">
          Logout
        </button>

        <Link 
        to='/register'
        onClick={handleLogout}
        className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700">
          Register
        </Link>
      </div>
      

    </div>
  )
}

export default ChatHeader