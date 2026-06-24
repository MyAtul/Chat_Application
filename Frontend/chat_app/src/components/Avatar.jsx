import React from 'react'

const Avatar = ({username}) => {

    const firstLetter = username?.charAt(0)?.toUpperCase()

    const colors = [
        "bg-red-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-yellow-500"
    ]

    const color =
        colors[
            username.length %
            colors.length
        ]

  return (
    <div
    className={`w-12 h-12 flex justify-center items-center rounded-full ${color} bg-blue-700 shrink-0 font-bold text-lg`}
    >
        {firstLetter}
    </div>
  )
}

export default Avatar