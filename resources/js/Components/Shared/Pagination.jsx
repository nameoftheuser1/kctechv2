const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

    return (
        <div className="flex justify-between mt-4 items-center">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="bg-gray-200 text-gray-600 p-2 rounded disabled:opacity-50"
            >
                Previous
            </button>

            <div className="flex space-x-1">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`p-2 rounded ${
                            currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className="bg-gray-200 text-gray-600 p-2 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
