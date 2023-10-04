import './Pagination.css'

const Pagination = ({ currentPage, setCurrentPage, currentPosts, postsPerPage }) => {
    return <div className="pagination">
        <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
        >
            Previous
        </button>
        <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPosts.length < postsPerPage}
        >
            Next
        </button>
    </div>
}

export default Pagination