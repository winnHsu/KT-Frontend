// Base API URL for category-related requests
const BASE_URL = 'http://127.0.0.1:8000/api';

// Fetches all categories using an authorization token
export const fetchCategories = async (token) => {
    const response = await fetch(`${BASE_URL}/categories/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    // Handle unsuccessful API calls
    if (!response.ok) {
        console.error('Failed to fetch categories', response);
        throw new Error('Failed to fetch categories');
    }
    return response.json(); // Parse and return the response body
};

// Fetches a specific category by ID using an authorization token
export const fetchCategoryById = async (token, categoryId) => {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    // Handle unsuccessful API calls
    if (!response.ok) {
        console.error('Failed to fetch category', response);
        throw new Error(`Failed to fetch category with ID ${categoryId}`);
    }
    return response.json(); // Parse and return the response body
};

// Creates a new category using the provided data and authorization token
export const createCategory = async (token, categoryData) => {
    const response = await fetch(`${BASE_URL}/categories/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
    });

    // Handle unsuccessful API calls
    if (!response.ok) {
        throw new Error('Failed to create category');
    }
    return response.json(); // Parse and return the response body
};

// Deletes a category by its ID using an authorization token
export const deleteCategory = async (token, categoryId) => {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    // Handle unsuccessful API calls
    if (!response.ok) {
        const errorResponse = await response.text(); // Retrieve detailed error message
        console.error('Failed to delete category', errorResponse);
        // Custom error handling based on status
        if (response.status === 500) {
            alert('This category is currently being used and cannot be deleted.');
        } else {
            throw new Error(`Failed to delete category with ID ${categoryId}: ${errorResponse}`);
        }
    }
    return true; // Indicate successful deletion
};
