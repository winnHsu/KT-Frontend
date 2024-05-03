import React, { useState, useEffect } from 'react';
import { createCategory, fetchCategories } from '../../api/categoriesApi';
import { useAuth } from '../../context/AuthContext';
import './CategoryForm.css';

export default function CategoryForm({ onClose }) {
    const { token } = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parent, setParent] = useState('');
    const [keywords, setKeywords] = useState('');
    const [defaultLocation, setDefaultLocation] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (token) {
            fetchCategories(token).then(setCategories).catch(console.error);
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const categoryData = { name, description, parent, keywords, default_location: defaultLocation };
            await createCategory(token, categoryData);
            onClose(); // Close the form on success
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <div className="category-form-container">
            <div className="category-form-header">
                <h2>Create New Item Category</h2>
                <button onClick={onClose} className="close-button">X</button>
            </div>
            <form onSubmit={handleSubmit} className="category-form">
                <label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                </label>
                <label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                </label>
                <label>
                    Parent Category:
                    <select value={parent} onChange={(e) => setParent(e.target.value)}>
                        <option value="">No Data Available</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords" />
                </label>
                <label>
                    Default Location:
                    <select value={defaultLocation} onChange={(e) => setDefaultLocation(e.target.value)} disabled>
                        <option>No Data Available</option>
                    </select>
                </label>
                <button type="submit" className="create-button">CREATE</button>
            </form>
        </div>
    );
}
