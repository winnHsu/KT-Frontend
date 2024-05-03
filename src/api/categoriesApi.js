// categoriesApi.js
const BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchCategories = async (token) => {
    const response = await fetch(`${BASE_URL}/categories/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.error('Failed to fetch categories', response);
        throw new Error('Failed to fetch categories');
    }
    return response.json();
};

export const fetchCategoryById = async (token, categoryId) => {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.error('Failed to fetch category', response);
        throw new Error(`Failed to fetch category with ID ${categoryId}`);
    }
    return response.json();
};


export const createCategory = async (token, categoryData) => {
    const response = await fetch(`${BASE_URL}/categories/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
    });

    if (!response.ok) {
        throw new Error('Failed to create category');
    }
    return response.json();
};

export const deleteCategory = async (token, categoryId) => {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    // Check if the deletion was not successful due to the category being in use or other server errors
    if (!response.ok) {
        const errorResponse = await response.text(); // Fetch the detailed error message if any
        console.error('Failed to delete category', errorResponse);

        // You might want to handle status-specific errors differently
        if (response.status === 500) {
            alert('This category is currently being used and cannot be deleted.');
        }
        else {
            throw new Error(`Failed to delete category with ID ${categoryId}: ${errorResponse}`);
        }
    }

    return true; // Return true to indicate successful deletion
};