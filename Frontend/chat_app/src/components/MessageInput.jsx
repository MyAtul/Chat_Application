import React, { useEffect, useRef, useState } from 'react'
import { sendMessage } from '../services/messageService'
import { sendSocketMessage, sendTyping } from '../websockets/socket'

const MessageInput = (
  {
    selectedConversation,
    fetchMessages,
    fetchConversations
  }
  ) => {

  const [content, setContent] = useState('')

  const typingTimeout =  useRef(null)
  const isTyping = useRef(false)

  useEffect(()=>{

    return ()=>{
      clearTimeout(typingTimeout.current)
    }

  },[])

  const handelSend =async ()=>{

    if(!content.trim()) return

    if(!selectedConversation) return

    try{

      await sendSocketMessage(selectedConversation.userId,content)

      sendTyping(selectedConversation.userId,false)

      isTyping.current = false

      clearTimeout(typingTimeout.current)

      await fetchConversations()

      setContent('')

    }catch(error){

      console.log(error)

    }

  }

  const handleChange = (e)=>{

    if(!selectedConversation)
      return

    const value = e.target.value
    setContent(value)

    if(value.trim() === ""){

      sendTyping(selectedConversation.userId,false)

      isTyping.current = false

      clearTimeout(typingTimeout.current)
      return
    }

    if(!isTyping.current){

      sendTyping(selectedConversation.userId,true)

      isTyping.current = true

    }

    clearTimeout(typingTimeout.current)

    typingTimeout.current = setTimeout(()=>{

      sendTyping(selectedConversation.userId,false)

      isTyping.current = false

    },1000)
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
          onChange={handleChange}
          onKeyDown={(e)=>{
            if(e.key === "Enter" && !e.shiftKey){
              e.preventDefault()
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