import React, { useState } from 'react';
import { GoTriangleDown } from "react-icons/go";

export default function SelectButton({ text, data }) {
    // State to manage dropdown open/close
    const [isOpen, setIsOpen] = useState(false);
    // State to manage selected item
    const [selectedItem, setSelectedItem] = useState(text);

    // Function to toggle dropdown open/close
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Function to handle item selection
    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpen(false); // Close the dropdown after selection
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
