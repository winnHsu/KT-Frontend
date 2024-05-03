import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ListWindow.css';

export default function ItemListWindow({ columns, filteredItems, categories }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...filteredItems];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredItems, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const renderSortingArrow = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    };

    return (
        <div className="itemListContainer">
            <table className="itemTable">
                <thead>
                    <tr>
                        {columns.filter(col => col.visible).map(col => (
                            <th key={col.key} onClick={() => requestSort(col.key)}>
                                {col.label}{renderSortingArrow(col.key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map(item => (
                        <tr key={item.id}>
                            {columns.filter(col => col.visible).map(col => (
                                <td key={col.key}>
                                    {col.key === 'name' ? (
                                        <NavLink to={`/items/${item.id}/detail`}>{item[col.key]}</NavLink>
                                    ) : col.key === 'category' ? (
                                        item.category ? (categories[item.category] ? categories[item.category].name || 'Loading...' : 'No category') : 'No category'
                                    ) : col.key.indexOf('stock') !== -1 ? (
                                        item[col.key] || 0
                                    ) : (
                                        item[col.key] || ''
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
