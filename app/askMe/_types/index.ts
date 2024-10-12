import { Dispatch, SetStateAction } from "react"

export type TUseMessage = {
    handleCreateMessage: (message: string) => void
    setMessage: Dispatch<SetStateAction<string>>
    message: string
}

