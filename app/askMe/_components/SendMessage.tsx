import React from 'react'

const SendMessage = () => {
  return (
    <div className="p-4 border-t border-zinc-700">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-zinc-700 text-white rounded-l-lg px-4 py-2 focus:outline-none"
          />
          <button className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none">
            {/* <Send size={20} /> */}
            send
          </button>
        </div>
      </div>
  )
}

export default SendMessage