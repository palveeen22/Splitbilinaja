'use client'
import React from 'react';
import ChatMessage from './_components/ChatMessage';
// import { messages } from './constants';
import SendMessage from './_components/SendMessage';
import { CiFileOn } from "react-icons/ci";
import { useMessage } from '../contexts/useMessage';
import { TiDeleteOutline } from "react-icons/ti";



const ChatRoom = () => {
  const { selectedFile, deleteSelectedFile, messages } = useMessage()

  return (
    <div className="flex flex-col h-screen bg-zinc-800 text-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.content} isUser={msg.isUser} />
        ))}
      </div>
      {selectedFile && (
        <div className='m-4 p-3 bg-zinc-700 rounded-lg'>
          <div className='flex justify-between items-center'>
            <span className='flex justify-start items-center gap-4'>
              <CiFileOn size={25} />
              <p className='underline'>{`File selected: ${selectedFile.name}`}</p>
            </span>
            <TiDeleteOutline size={25} onClick={deleteSelectedFile} className='cursor-pointer' />
          </div>
        </div>
      )}
      <SendMessage />
    </div>
  );
};

export default ChatRoom;