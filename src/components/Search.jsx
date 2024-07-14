import React, { useState } from 'react';

function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <input
            type="text"
            placeholder="Search for a story..."
            value={searchTerm}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 text-white rounded py-2 px-4"
        />
    );
}

export default SearchBox;
