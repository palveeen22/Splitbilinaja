"use client"
import React, { createContext, useContext, useRef, useState, ReactNode } from "react";
import { TMessage, TMessageContextType } from "../askMe/_types";

const DefaultContextValue: TMessageContextType = {
  messages: [],
  inputMessage: '',
  selectedFile: null,
  fileInputRef: { current: null },
  handleCreateMessage: () => { },
  handleFileChange: () => { },
  triggerFileInput: () => { },
  setInputMessage: () => { },
  handleSubmit: () => { },
  deleteSelectedFile: () => { }
};

const MessageContext = createContext<TMessageContextType>(DefaultContextValue);

export const useMessage = (): TMessageContextType => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};


type TProps = {
  children: ReactNode
}

export const MessageProvider = ({ children }: TProps) => {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleCreateMessage = (message: string, file?: File) => {
  //   if (file) {
  //     setMessages(prevMessages => [...prevMessages, {
  //       type: 'file',
  //       content: file.name,
  //       file: file
  //     }]);
  //     console.log('Successfully created file message:', file.name);
  //   } else if (message.trim()) {
  //     setMessages(prevMessages => [...prevMessages, {
  //       type: 'text',
  //       content: message
  //     }]);
  //     console.log('Successfully created text message:', message);
  //   }
  // };


  const handleCreateMessage = async (message: string, file?: File) : Promise<void> => {
    console.log(message);
    if (file) {
      setMessages(prevMessages => [...prevMessages, {
        type: 'file',
        content: file.name,
        file: file,
        isUser: true
      }]);
      console.log('Successfully created file message:', file.name);
    } else if (message.trim()) {
      // Add user message
      setMessages(prevMessages => [...prevMessages, {
        type: 'text',
        content: message,
        isUser: true
      }]);
      console.log('Successfully created user text message:', message);
  
      try {
        // Call Gemini AI API
        const response = await fetch('api/gemini/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body: message }),
        })
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        console.log(response, "<<<");
        // const response = await axios.post('/api/gemini/generate', { body: message });
        // const aiResponse = response.data;
  
        // Add AI response
        // setMessages(prevMessages => [...prevMessages, {
        //   type: 'text',
        //   content: aiResponse,
        //   isUser: false
        // }]);
        // console.log('Successfully created AI response message:', aiResponse);
      } catch (error) {
        console.error('Error getting AI response:', error);
        // Optionally, add an error message to the chat
        setMessages(prevMessages => [...prevMessages, {
          type: 'text',
          content: 'Sorry, I encountered an error while processing your message.',
          isUser: false
        }]);
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    console.log("tes");
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() || selectedFile) {
      handleCreateMessage(inputMessage, selectedFile || undefined);
      setInputMessage('');
      setSelectedFile(null);
    }
  };

  const deleteSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  const MessageContextValue: TMessageContextType = {
    messages,
    inputMessage,
    selectedFile,
    fileInputRef,
    handleCreateMessage,
    handleFileChange,
    triggerFileInput,
    setInputMessage,
    handleSubmit,
    deleteSelectedFile
  };

  return <MessageContext.Provider value={MessageContextValue}> {children} </MessageContext.Provider>
};