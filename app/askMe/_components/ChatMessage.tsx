import React from 'react';

type TProps = {
    message:string,
    isUser: boolean
}

const ChatMessage = ({ message, isUser }: TProps) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        {message}
      </div>
    </div>
  );

export default ChatMessage