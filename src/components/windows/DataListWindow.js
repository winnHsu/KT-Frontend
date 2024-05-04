import React, { useEffect, useState } from 'react';
import { fetchCategoryById } from '../../api/categoriesApi';
import TextButton from '../buttons/TextButton';
import SelectButton from '../buttons/SelectButton';
import './ListWindow.css';
import CategoryTitleCard from '../cards/CategoryTitleCard';
import DisplayOptionForm from '../forms/DisplayOptionForm';
import SearchBar from '../widgets/SearchBar';
import ItemListWindow from './ItemListWindow';

// DataListWindow component for displaying a list of data items with customizable visibility and search.
export default function DataListWindow({ title, data, greenButton, greenClick, blueButton, blueClick, selectButton, token }) {
    const [categories, setCategories] = useState({}); // State for category details fetched from API.
    const [searchTerm, setSearchTerm] = useState(''); // State for managing search input.
    // Default settings for data columns shown in the UI.
    const columnSettings = [
        { key: 'SKU', label: 'SKU', visible: true },
        { key: 'name', label: 'Name', visible: true },
        { key: 'tags', label: 'Tags', visible: true },
        { key: 'description', label: 'Description', visible: true },
        { key: 'category', label: 'Category', visible: true },
        { key: 'price', label: 'Price', visible: true },
        { key: 'in_stock', label: 'In Stock', visible: true },
        { key: 'net_stock', label: 'Net Stock', visible: false },
        { key: 'available_stock', label: 'Available Stock', visible: true },
    ];
    const [columns, setColumns] = useState(columnSettings); // State for managing column visibility.
    const [showDisplayOptions, setShowDisplayOptions] = useState(false); // State to toggle display options.

    // Filter items based on search term.
    const filteredItems = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Toggle visibility of a column.
    const toggleColumnVisibility = key => {
        setColumns(columns.map(column => {
            if (column.key === key) {
                return { ...column, visible: !column.visible };
            }
            return column;
        }));
    };

    // Toggle the display options panel.
    const handleDisplayOptionsToggle = () => {
        setShowDisplayOptions(prev => !prev);
    };

    // Effect to fetch categories as needed.
    useEffect(() => {
        const fetchCategories = async () => {
            const newCategories = {};
            let shouldUpdate = false;

            // Fetch categories if not already fetched.
            for (const item of data) {
                if (item.category && !categories[item.category]) {
                    shouldUpdate = true;
                    try {
                        const categoryData = await fetchCategoryById(token, item.category);
                        newCategories[item.category] = categoryData; // Store the fetched category data.
                    } catch (error) {
                        console.error('Error fetching category:', error);
                        newCategories[item.category] = { error: 'Failed to fetch category' };
                    }
                }
            }

            // Update state with new categories.
            if (shouldUpdate) {
                setCategories(prev => ({ ...prev, ...newCategories }));
            }
        };

        if (data && data.length > 0) {
            fetchCategories();
        }
    }, [data, token]);

    // Render component UI.
    return (
        <div className='dataListContainer'>
            <CategoryTitleCard title={title} categoryData={Object.values(categories)} />
            <div className='dataListButton'>
                {greenButton && <TextButton onClick={greenClick} text={greenButton} backgroundColor='#5D9E52' color='#FFFFFF' />}
                {blueButton && <TextButton onClick={blueClick} text={blueButton} backgroundColor='#4286DE' color='#FFFFFF' />}
                {selectButton && <SelectButton text={selectButton} data={['Batch Edit', 'Export']} />}
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={'Search Name...'} />
                {data && <TextButton onClick={handleDisplayOptionsToggle} text="COLUMN" backgroundColor='#596D79' color='#FFFFFF' />}
            </div>
            {showDisplayOptions && <DisplayOptionForm options={columns} onToggleColumn={toggleColumnVisibility} onClose={() => setShowDisplayOptions(false)} />}
            {data ?
                <ItemListWindow columns={columns} filteredItems={filteredItems} categories={categories} />
                :
                <p>No data available</p>
            }
        </div>
    );
}
