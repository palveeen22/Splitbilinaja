"use client"
import React, { createContext, useContext, useRef, useState, ReactNode } from "react";
import { TMessage, TMessageContextType } from "../_types";



const DefaultContextValue: TMessageContextType = {
  messages: [],
  inputMessage: '',
  selectedFile: null,
  fileInputRef: { current: null },
  handleCreateMessage: () => { },
  handleFileChange: () => { },
  triggerFileInput: () => { },
  setInputMessage: () => { },
  handleSubmit: () => { }
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

  const handleCreateMessage = (message: string, file?: File) => {
    if (file) {
      setMessages(prevMessages => [...prevMessages, {
        type: 'file',
        content: file.name,
        file: file
      }]);
      console.log('Successfully created file message:', file.name);
    } else if (message.trim()) {
      setMessages(prevMessages => [...prevMessages, {
        type: 'text',
        content: message
      }]);
      console.log('Successfully created text message:', message);
    }
  };

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

  const MessageContextValue: TMessageContextType = {
    messages,
    inputMessage,
    selectedFile,
    fileInputRef,
    handleCreateMessage,
    handleFileChange,
    triggerFileInput,
    setInputMessage,
    handleSubmit
  };

  return <MessageContext.Provider value={ MessageContextValue }> { children } </MessageContext.Provider>
};