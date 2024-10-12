'use client'
import React, { useState } from 'react'

type TProps = {
  handleCreateMessage: (message: string) => void
}

const SendMessage = ({handleCreateMessage}: TProps) => {
  const [inputMessage, setInputMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      handleCreateMessage(inputMessage);
      setInputMessage('');
    }
  };
  return (
    <div className="p-4 border-t border-zinc-700">
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-zinc-700 text-white rounded-l-lg px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none"
      >
        Send
      </button>
    </form>
  </div>
  )
}

export default SendMessage