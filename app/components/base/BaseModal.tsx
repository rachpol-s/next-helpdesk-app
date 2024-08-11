import { ReactNode } from 'react'

interface BaseModalProps {
    isOpen: boolean
    title: string
    children: ReactNode
    onClose: () => void
    width: string
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, title, children, onClose, width }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-75 z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-full" style={{ width: `${width}px` }}>
                <div className="flex items-center px-4 py-3 border-b border-gray-200">
                    <p className="text-lg font-semibold">{title}</p>
                    <div className="ml-auto cursor-pointer text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</div>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    )
}

export default BaseModal