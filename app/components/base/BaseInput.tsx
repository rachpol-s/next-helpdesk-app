import { InputHTMLAttributes } from 'react'

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    placeholder: string
    value: string | number
    required?: boolean
    type?: string
}

const BaseInput: React.FC<BaseInputProps> = ({
    type = 'text',
    label,
    placeholder,
    value,
    required = false,
    className,
    ...props
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                required={required}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm ${className}`}
                {...props}
            />
        </div>
    )
}

export default BaseInput
