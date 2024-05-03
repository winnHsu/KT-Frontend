import React from 'react'
import './SearchBar.css'

export default function SearchBar({ searchTerm, setSearchTerm, placeholder }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="searchInput"
        />
    )
}
