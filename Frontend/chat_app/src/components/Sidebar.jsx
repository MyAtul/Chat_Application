import React from 'react'

const Sidebar = () => {
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
            cursor-pointer
            rounded-xl
            px-4
            py-3
            outline-none
          "
        />

      </div>

      <div className="flex-1 overflow-y-auto">

        <div className="
          mx-3
          p-4
          rounded-xl
          bg-slate-800
            border-l-4
        border-blue-500
          cursor-pointer
        ">
          Alex
        </div>

      </div>

    </div>
  )
}

export default Sidebar