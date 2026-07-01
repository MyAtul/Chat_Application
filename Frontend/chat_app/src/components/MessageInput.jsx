import React, { useEffect, useRef, useState } from 'react'
import { sendMessage } from '../services/messageService'
import { sendSocketMessage, sendTyping } from '../websockets/socket'
import { Paperclip, Smile } from 'lucide-react'
import EmojiPicker from "emoji-picker-react";
import AttachmentMenu from './AttachmentMenu';
import { uploadAudio, uploadDocument, uploadImage, uploadVideo } from '../services/uploadService';

const ATTACHMENT_CONFIG = {
    IMAGE: {
        upload: uploadImage,
        messageType: "IMAGE"
    },
    FILE: {
        upload: uploadDocument,
        messageType: "FILE"
    },
    VIDEO: {
        upload: uploadVideo,
        messageType: "VIDEO"
    },
    AUDIO: {
        upload: uploadAudio,
        messageType: "AUDIO"
    }
}

const MessageInput = (
  {
    selectedConversation,
    fetchMessages,
    fetchConversations
  }
  ) => {

  const [content, setContent] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [selectedAttachmentType, setSelectedAttachmentType] = useState(null)

  const typingTimeout =  useRef(null)
  const isTyping = useRef(false)
  const emojiPickerRef = useRef(null)
  const attachmentMenuRef = useRef(null)
  const imageInputRef = useRef(null)
  const audioInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const documentInputRef = useRef(null)

  useEffect(()=>{

    return ()=>{
      clearTimeout(typingTimeout.current)
    }

  },[])

  const handelSend =async ()=>{

    if(!content.trim()) return

    if(!selectedConversation) return

    try{

      await sendSocketMessage({
        receiverId:selectedConversation.userId,
        content:content,
        messageType: "TEXT",
        attachmentUrl: null,
        attachmentName: null,
        attachmentSize: null
      })

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

  const handleEmojiClick = (emojiData)=>{
    setContent(prev => prev + emojiData.emoji)
  }

  useEffect(()=>{
    const handleClickOutside = (event)=>{


      if(
        emojiPickerRef.current  && 
        !emojiPickerRef.current.contains(event.target)
      ){
        setShowEmojiPicker(false)
      }

      if (
        attachmentMenuRef.current &&
        !attachmentMenuRef.current.contains(event.target)
      ) {
        setShowAttachmentMenu(false)
      }

    }

    document.addEventListener("mousedown",handleClickOutside)

    return ()=>{
      document.removeEventListener("mousedown",handleClickOutside)
    }

  },[])

  const handleAttachmentSelect = (type)=>{

    setSelectedAttachmentType(type)
    setShowAttachmentMenu(false)

    switch(type){
      
      case "IMAGE":
        imageInputRef.current.click()
        break

      case "VIDEO":
        videoInputRef.current.click()
        break

      case "FILE":
        documentInputRef.current.click()
        break

      case "AUDIO":
        audioInputRef.current.click()
        break

      default:
        break

    }

  }


  const handleFileUpload = async (e) => {

    const file = e.target.files[0]

    if(!file || !selectedConversation)
        return

    const config = ATTACHMENT_CONFIG[selectedAttachmentType]


    if(!config){
      e.target.value=""
      return
    }

    try{

      const uploadResponse = await config.upload(file)


        sendSocketMessage({

          receiverId:selectedConversation.userId,

          content:null,

          messageType:config.messageType,

          attachmentUrl:uploadResponse.attachmentUrl,

          attachmentName:uploadResponse.attachmentName,

          attachmentSize:uploadResponse.attachmentSize

        })

      await fetchConversations()
      setSelectedAttachmentType(null)

      e.target.value = ""

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

      <div 
      ref={emojiPickerRef}
      className="relative flex gap-3 items-end ">

        <button
          className='p-3 bg-slate-700 hover:bg-slate-600 transition rounded-xl'
          type='button'
          onClick={()=> setShowEmojiPicker(prev => !prev)}
        >
          <Smile
            size={22}
          />
        </button>

        {
          showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className='absolute bottom-16 left-0 z-50'
            >
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                lazyLoadEmojis={true}
                searchDisabled={false}
                skinTonesDisabled={true}
                width={320}
                height={400}
              />
            </div>
          )
        }

        

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
          type='button'
          onClick={()=>setShowAttachmentMenu(prev=> !prev)}
          className='p-3 bg-slate-900 hover:bg-slate-700 rounded-xl transition'
        >
          <Paperclip 
            size={22}
          />
        </button>
          
          {
            showAttachmentMenu && (
              <div ref={attachmentMenuRef}>
                <AttachmentMenu
                  onSelect={handleAttachmentSelect}
                />
              </div>
            )
          }

        <button
        onClick={handelSend}
          className="bg-blue-600 px-6 rounded-xl hover:bg-blue-500"
        >
          Send
        </button>

      </div>

      <input 
        ref={imageInputRef}
        onChange={handleFileUpload}
        type='file'
        accept='image/*'
        hidden
      />

      <input 
        ref={documentInputRef}
        onChange={handleFileUpload}
        type='file'
        accept='.pdf,.doc,.txt,.docx'
        hidden
      />

      <input 
        ref={audioInputRef}
        onChange={handleFileUpload}
        type='file'
        accept='audio/*'
        hidden
      />

      <input 
        ref={videoInputRef}
        onChange={handleFileUpload}
        type='file'
        accept='video/*'
        hidden
      />

    </div>
  )
}

export default MessageInput