
export type TMessage = {
    type: 'text' | 'file';
    content: string;
    file?: File;
    isUser?: boolean;
}

export type TMessageContextType = {
    messages: TMessage[];
    inputMessage: string;
    selectedFile: File | null;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleCreateMessage: (message: string, file?: File) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    triggerFileInput: () => void;
    setInputMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    deleteSelectedFile: () => void
}

