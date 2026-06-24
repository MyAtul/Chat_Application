import React, { useState } from 'react'
import { sendMessage } from '../services/messageService'
import { sendSocketMessage } from '../websockets/socket'

const MessageInput = ({selectedUser,fetchMessages}) => {

  const [content, setContent] = useState('')

  const handelSend =async ()=>{

    if(!content.trim()) return

    if(!selectedUser) return

    try{

      await sendSocketMessage(selectedUser.id,content)

      setContent('')

    }catch(error){

      console.log(error)

    }

  }

  return (
    <div className="
      border-t
      border-slate-800
      p-4
      bg-slate-900
    ">

      <div className="flex gap-3">

        <input
          value={content}
          onChange={(elem)=>{
            setContent(elem.target.value)
          }}

          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              handelSend()
            }
          }}

          placeholder="Type a message..."
          className="
            flex-1
            bg-slate-800
            rounded-xl
            px-4
            py-3
            outline-none
          "
        />

        <button
        onClick={handelSend}
          className="bg-blue-600 px-6 rounded-xl hover:bg-blue-500"
        >
          Send
        </button>

      </div>

    </div>
  )
}

export default MessageInput