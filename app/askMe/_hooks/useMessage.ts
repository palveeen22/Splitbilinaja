import { useState } from "react"
import { TUseMessage } from "../_types"

export const useMessage = (): TUseMessage => {
    const [message, setMessage] = useState<string>('')


    const handleCreateMessage = (message: string) => {
        setMessage(message)
        console.log('Success created message');
    }
 
    return{
        handleCreateMessage,
        setMessage,
        message
    }
}