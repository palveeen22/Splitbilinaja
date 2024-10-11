import React from 'react'

type TProps = {
    title: string;
    handle?: () => void;
    style?: string;
}

const Button = ({ title, handle, style }: TProps) => {
  const defaultClasses = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const combinedClasses = style ? `${defaultClasses} ${style}` : defaultClasses;

  return (
    <button 
      className={combinedClasses}
      onClick={handle}
    >
      {title}
    </button>
  )
}

export default Button