import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './CategoryTitleCard.css';
import SearchBar from '../widgets/SearchBar';

export default function CategoryTitleCard({ title, categoryData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleOpen = () => setIsOpen(!isOpen);

    // Filter categories based on search term
    const filteredCategories = categoryData.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="categoryCard">
            <div className="categoryHeader" onClick={toggleOpen}>
                <p className="categoryTitle">{title}</p>
                <button className="toggleButton">
                    {isOpen ? '▲' : '▼'}
                </button>
            </div>
            {isOpen && (
                <div className="categoryContent">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={'Search categories...'} />
                    {filteredCategories.length > 0 ? (
                        <ul>
                            {filteredCategories.map((category, index) => (
                                <li key={index}>
                                    <NavLink to={`/categories/${category.id}/detail`}>
                                        {category.name || 'Unnamed Category'}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No categories found matching your search.</p>
                    )}
                </div>
            )}
        </div>
    );
}
