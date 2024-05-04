import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './CategoryTitleCard.css';
import SearchBar from '../widgets/SearchBar';

// Functional component to display a card for a category with a toggleable detailed view.
export default function CategoryTitleCard({ title, categoryData }) {
    // State to manage the toggle visibility of category details.
    const [isOpen, setIsOpen] = useState(false);
    // State to handle the search input value.
    const [searchTerm, setSearchTerm] = useState('');

    // Toggle function to expand or collapse category content.
    const toggleOpen = () => setIsOpen(!isOpen);

    // Filters categories by name based on the current search term.
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
                        <p>No categories found matching your search.</p> // Display message when no categories match the search.
                    )}
                </div>
            )}
        </div>
    );
}
