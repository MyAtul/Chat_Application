import React from 'react'
import { Check, CheckCheck } from 'lucide-react'

const MessageStatus = ({status}) => {
 
    switch (status){
        case 'SENT':
        return(
            <Check 
                size={18}
                className='text-gray-300'
                strokeWidth={2.5}
            />
        )
        break

        case 'DELIVERED':
            return(
                <CheckCheck 
                    size={18}
                    className='text-gray-300'
                    strokeWidth={2.5}
                />
            )
            break

        case 'READ':
            return(
                <CheckCheck 
                    size={18}
                    className='text-sky-400'
                    strokeWidth={2.5}
                />
            )
        break

        default:null
        
    }
        
}

export default MessageStatus