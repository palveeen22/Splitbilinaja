'use client'
import React from 'react'
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import { useMessage } from '../../contexts/useMessage';



const SendMessage = () => {
  const { triggerFileInput, handleFileChange, fileInputRef, inputMessage, setInputMessage, handleSubmit } = useMessage()

  return (
    <div className="p-4 border-t border-zinc-700">
      <form onSubmit={handleSubmit} className="flex items-center relative">
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div
          onClick={triggerFileInput}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        >
          <AiOutlinePaperClip size={20} className='hover:text-white' />
        </div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-zinc-700 text-white rounded-l-lg pl-10 pr-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none"
        >
          <AiOutlineSend size={24} />
        </button>
      </form>
    </div>
  )
}

export default SendMessage