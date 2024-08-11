import { useState, useEffect, useRef } from 'react'

interface Option {
    label: string
    value: string | number
}

interface BaseDropdownProps {
    label: string
    placeholder: string
    options: Option[]
    value: string | number
    required?: boolean
    onChange: (selectedValue: string | number) => void
}

const BaseDropdown: React.FC<BaseDropdownProps> = ({
    label,
    placeholder,
    options,
    value,
    required = false,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSelect = (option: Option) => {
        onChange(option.value)
        setIsOpen(false)
    }

    const isValueSelected = options.some(option => option.value === value)

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    className={`bg-white text-justify block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm
                        ${isValueSelected ? '' : 'text-gray-400'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isValueSelected ? options.find(option => option.value === value)?.label : placeholder}
                </button>
                {isOpen && (
                    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                        {options.map((option) => (
                            <li key={option.value} className="px-1 py-0.5">
                                <div className="rounded-lg cursor-pointer hover:bg-dropdown-hover select-none relative py-2 pl-2"
                                    onClick={() => handleSelect(option)}>
                                    <span className={`block truncate ${value === option.value ? 'font-semibold' : 'font-normal'}`}>
                                        {option.label}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {required && !isValueSelected && <p className="text-red-500 text-xs mt-1">This field is required</p>}
        </div>
    )
}

export default BaseDropdown
