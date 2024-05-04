import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { deleteCategory, fetchCategoryById } from '../../api/categoriesApi';
import './DetailPage.css'
import TextButton from '../../components/buttons/TextButton';

// Component for displaying detailed information about a category.
const CategoryDetailPage = () => {
    // Hooks for authentication, navigation, and URL parameter retrieval.
    const { token } = useAuth();
    const { categoryId } = useParams();
    const navigate = useNavigate();

    // State for category data and error handling.
    const [category, setCategory] = useState(null);
    const [error, setError] = useState('');

    // Fetch category details on mount or categoryId/token change.
    useEffect(() => {
        const loadCategoryDetail = async () => {
            try {
                const data = await fetchCategoryById(token, categoryId);
                setCategory(data);
            } catch (err) {
                console.error('Failed to fetch category details:', err);
                setError('Failed to load category details.');
            }
        };

        loadCategoryDetail();
    }, [categoryId, token]);

    // Handler for deleting a category and navigating back.
    const onDelete = () => {
        deleteCategory(token, categoryId);
        navigate(-1);
    };

    // Render error message if error exists.
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render loading message if category data is not yet fetched.
    if (!category) {
        return <div>Loading category details...</div>;
    }

    // Render category details page.
    return (
        <div className="detailContainer">
            <h1>Category Details: {category.name}</h1>
            <TextButton onClick={onDelete} text='DELETE THIS CATEGORY' backgroundColor='#A82E26' color='#FFFFFF' />
            <p><strong>Description:</strong> {category.description || 'No description provided'}</p>
            <p><strong>Keywords:</strong> {category.keywords || 'No keywords'}</p>
            <p><strong>Default Location:</strong> {category.default_location || 'Not specified'}</p>
            <p><strong>Parent Category:</strong> {category.parent ? category.parent.name : 'No parent category'}</p>
        </div>
    );
};

export default CategoryDetailPage;
