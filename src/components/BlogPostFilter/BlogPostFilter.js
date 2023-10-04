import React, { useState } from 'react';
import './BlogPostFilter.css'

const BlogPostFilter = ({ onFilterChange }) => {
    const [filterText, setFilterText] = useState('');

    const handleInputChange = (e) => {
        const newText = e.target.value;
        setFilterText(newText);
        onFilterChange(newText);
    };

    return (
        <div className="filter">
            <input
                type="text"
                placeholder="Filter by title or body"
                value={filterText}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default BlogPostFilter;