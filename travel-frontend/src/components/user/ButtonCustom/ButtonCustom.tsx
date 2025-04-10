import React from 'react'

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}

const ButtonCustom: React.FC<ButtonProps> = ({
    type = 'button',
    onClick,
    className = '',
    children,
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-white text-black border border-black p-3 mt-4
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default ButtonCustom