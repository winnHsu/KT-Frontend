import React, { useEffect, useState } from 'react';
import { fetchCategoryById } from '../../api/categoriesApi';
import TextButton from '../buttons/TextButton';
import SelectButton from '../buttons/SelectButton';
import './ListWindow.css';
import CategoryTitleCard from '../cards/CategoryTitleCard';
import DisplayOptionForm from '../forms/DisplayOptionForm';
import SearchBar from '../widgets/SearchBar';
import ItemListWindow from './ItemListWindow';

export default function DataListWindow({ title, data, greenButton, greenClick, blueButton, blueClick, selectButton, token }) {
    const [categories, setCategories] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
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
    const [columns, setColumns] = useState(columnSettings);
    const [showDisplayOptions, setShowDisplayOptions] = useState(false);

    const filteredItems = data.filter(items =>
        items.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleColumnVisibility = key => {
        setColumns(columns.map(column => {
            if (column.key === key) {
                return { ...column, visible: !column.visible };
            }
            return column;
        }));
    };

    const handleDisplayOptionsToggle = () => {
        setShowDisplayOptions(prev => !prev);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const newCategories = {};
            let shouldUpdate = false;

            for (const item of data) {
                if (item.category && !categories[item.category]) {
                    shouldUpdate = true;
                    try {
                        const categoryData = await fetchCategoryById(token, item.category);
                        newCategories[item.category] = categoryData;  // Store the entire category data object
                    } catch (error) {
                        console.error('Error fetching category:', error);
                        newCategories[item.category] = { error: 'Failed to fetch category' };
                    }
                }
            }

            if (shouldUpdate) {
                setCategories(prev => ({ ...prev, ...newCategories }));
            }
        };

        if (data && data.length > 0) {
            fetchCategories();
        }
    }, [data, token]);


    return (
        <div className='dataListContainer'>
            <CategoryTitleCard title={title} categoryData={Object.values(categories)} />
            <div className='dataListButton'>
                {greenButton && <TextButton onClick={greenClick} text={greenButton} backgroundColor='#5D9E52' color='#FFFFFF' />}
                {blueButton && <TextButton onClick={blueClick} text={blueButton} backgroundColor='#4286DE' color='#FFFFFF' />}
                {selectButton && <SelectButton text={selectButton} data={['Batch Edit', 'Export']} />}
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={'Search Name...'} />
                {data && <TextButton onClick={handleDisplayOptionsToggle} text="COLUMN" backgroundColor='#596D79' color='#FFFFFF' />}
                {/* {data && <TextButton onClick={handleFilterToggle} text="FILTER" backgroundColor='#424242' color='#FFFFFF' />} */}
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
