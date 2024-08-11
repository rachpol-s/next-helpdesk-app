interface BaseLoadingProps {
    message?: string
    fullPage?: boolean
}

const BaseLoading: React.FC<BaseLoadingProps> = ({ message = 'Loading...', fullPage = false }) => {
    return (
        <div className={`flex flex-col items-center justify-center ${fullPage ? 'fixed inset-0 z-50 bg-white bg-opacity-75' : 'h-1/2'}`}>
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l2.828 2.829c1.562 1.562 4.094 1.562 5.656 0l2.829-2.829A8.962 8.962 0 0016 20.535V24c1.562-.347 3.064-.938 4.294-2.168l-2.829-2.828C14.562 21.532 9.438 21.532 7.293 19.293L4 20.535A8.962 8.962 0 006 24v-3.709z"></path>
            </svg>
            <p className="mt-2 text-gray-600">{message}</p>
        </div>
    )
}

export default BaseLoading
