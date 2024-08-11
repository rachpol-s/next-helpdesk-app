interface BasePaginationProps {
    totalPages?: number
    currentPage?: number
    onPageChange: (page: number) => void
}

const BasePagination: React.FC<BasePaginationProps> = ({ totalPages = 1, currentPage = 1, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const handlePageClick = (page: number) => {
        onPageChange(page)
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxPagesToShow = 5
        const ellipsis = '...'

        if (totalPages <= maxPagesToShow + 2) {
            Array.from({ length: totalPages }).forEach((_, index) => {
                pages.push(index + 1)
            })
        } else {
            if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
                Array.from({ length: maxPagesToShow }).forEach((_, index) => {
                    pages.push(index + 1)
                })
                pages.push(ellipsis)
                pages.push(totalPages)
            } else if (currentPage > totalPages - Math.floor(maxPagesToShow / 2)) {
                pages.push(1)
                pages.push(ellipsis)
                Array.from({ length: maxPagesToShow }).forEach((_, index) => {
                    pages.push(totalPages - maxPagesToShow + index + 1)
                })
            } else {
                pages.push(1)
                pages.push(ellipsis)
                Array.from({ length: maxPagesToShow }).forEach((_, index) => {
                    pages.push(currentPage - Math.floor(maxPagesToShow / 2) + index)
                })
                pages.push(ellipsis)
                pages.push(totalPages)
            }
        }
        return pages
    }

    return (
        <div className="flex items-center justify-center space-x-2 mt-4">
            <button
                className="px-2.5 py-1 rounded-md bg-white text-black hover:bg-pagination"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                {`<`}
            </button>
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={`px-2.5 py-1 rounded-md hover:bg-pagination ${page === currentPage ? 'bg-pagination-hover text-white' : 'bg-white text-black'
                        }`}
                    onClick={() => typeof page === 'number' && handlePageClick(page)}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}
            <button
                className="px-2.5 py-1 rounded-md bg-white text-black hover:bg-pagination"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                {`>`}
            </button>
        </div>
    )
}

export default BasePagination
