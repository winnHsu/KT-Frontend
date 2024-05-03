import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { deleteCategory, fetchCategoryById } from '../../api/categoriesApi';
import './DetailPage.css'
import TextButton from '../../components/buttons/TextButton';

const CategoryDetailPage = () => {
    const { token } = useAuth();
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadCategoryDetail = async () => {
            try {
                const data = await fetchCategoryById(token, categoryId); // Replace 'your-token-here' with actual token handling logic
                setCategory(data);
            } catch (err) {
                console.error('Failed to fetch category details:', err);
                setError('Failed to load category details.');
            }
        };

        loadCategoryDetail();
    }, [categoryId, token]);

    const onDelete = () => {
        deleteCategory(token, categoryId)
        navigate(-1);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!category) {
        return <div>Loading category details...</div>;
    }

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
