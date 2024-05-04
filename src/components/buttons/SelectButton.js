import React, { useState } from 'react';
import { GoTriangleDown } from "react-icons/go";

export default function SelectButton({ text, data }) {
    // Initialize state for dropdown visibility and selected item
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(text);

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Update selected item and close dropdown
    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpen(false); // Automatically close dropdown after selection
    }

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={toggleDropdown}
                className='page-button'
                style={{ backgroundColor: data ? '#4994EC' : '#E0E0E0', color: data ? '#FFFFFF' : '#A6A6A6' }}>
                {selectedItem}
                <GoTriangleDown style={{ marginLeft: '6px' }} color={data ? '#FFFFFF' : '#A6A6A6'} />
            </button>
            {/* Render dropdown menu if it is open and data is available */}
            {isOpen && data && (
                <ul className="dropdown-menu">
                    {data.map((item, index) => (
                        <li key={index} onClick={() => handleSelect(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}