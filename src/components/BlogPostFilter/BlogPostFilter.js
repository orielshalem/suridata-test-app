import React, { useEffect, useState } from 'react';
import './BlogPostFilter.css'
import useDebounce from '../../hooks/useDebounce';

const BlogPostFilter = ({ onFilterChange }) => {
    const [filterText, setFilterText] = useState('');
    const debouncedFilterText = useDebounce(filterText, 300);

    const handleInputChange = ({ target: { value } }) => {
        setFilterText(value);
    };

    useEffect(() => {
        onFilterChange(debouncedFilterText);
    }, [debouncedFilterText, onFilterChange]);

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