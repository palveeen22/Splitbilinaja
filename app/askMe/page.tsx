import React from 'react';
import ChatMessage from './_components/ChatMessage';
import { messages } from './constants';
import SendMessage from './_components/SendMessage';



const ChatRoom = () => {

  return (
    <div className="flex flex-col h-screen bg-zinc-800 text-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <SendMessage/>
    </div>
  );
};

export default ChatRoom;