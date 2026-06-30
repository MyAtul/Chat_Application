
import { FileText, Image, Music, Video } from 'lucide-react'
import React from 'react'

const AttachmentMenu = ({
    onSelect
}) => {

    const items = [
        {
            label: "Image",
            type: "IMAGE",
            icon: Image
        },
        {
            label: "Document",
            type: "FILE",
            icon: FileText
        },
        {
            label: "Video",
            type: "VIDEO",
            icon: Video
        },
        {
            label: "Audio",
            type: "AUDIO",
            icon: Music
        }
    ]
  return (
    <div className='absolute bottom-16 right-0 w-52 bg-slate-900 border border-slate-700 
    rounded-xl shadow-xl overflow-hidden z-50'
    >
        {
            items.map(item=>{
                const Icon = item.icon

                return (
                    <button 
                        key={item.type}
                        onClick={()=>onSelect(item.type)}
                        className='w-full flex  items-center hover:bg-slate-800 transition gap-3 px-3 py-4'
                    >
                        <Icon size={20}/>
                        <span>
                            {item.label}
                        </span>
                    </button>
                )
            })
        }
    </div>
  )
}

export default AttachmentMenu