import { ReactNode, InputHTMLAttributes } from 'react'

interface BaseButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: 'button' | 'submit'
    color?: 'blue' | 'green' | 'gray'
    onClick?: () => void
    children: ReactNode
}

const BaseButton: React.FC<BaseButtonProps> = ({ type = 'button', className, color = 'blue', onClick, children }) => {
    const colorClasses = {
        blue: 'bg-button-blue hover:bg-button-blue-hover active:bg-button-blue',
        green: 'bg-button-green hover:bg-button-green-hover active:bg-button-green',
        gray: 'bg-button-gray hover:bg-button-gray-hover active:bg-button-gray',
    }

    return (
        <button
            type={type}
            className={`${className} px-4 py-2 text-sm text-center text-white font-medium rounded-lg ${colorClasses[color]}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default BaseButton