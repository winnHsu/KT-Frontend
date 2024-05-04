// Base API URL
const BASE_URL = 'http://127.0.0.1:8000/api';

// Fetches list of items using the provided token for authorization
export const fetchItems = async (token) => {
    const response = await fetch(`${BASE_URL}/items/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }
    return response.json();
};

// Fetches a single item by ID using the provided token for authorization
export const fetchItemById = async (token, itemId) => {
    const response = await fetch(`${BASE_URL}/items/${itemId}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch item');
    }
    return response.json();
};

// Creates an item with the provided data and token for authorization
export const createItem = async (token, itemData) => {
    const response = await fetch(`${BASE_URL}/items/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(itemData)
    });
    if (!response.ok) {
        throw new Error('Failed to create item');
    }
    return response.json();
};

// Deletes an item by ID using the provided token for authorization
export const deleteItem = async (token, itemId) => {
    const response = await fetch(`${BASE_URL}/items/${itemId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const errorResponse = await response.text();
        if (response.status === 500) {
            alert('This item is currently being used and cannot be deleted.');
        } else {
            throw new Error(`Failed to delete item with ID ${itemId}: ${errorResponse}`);
        }
    }
    return true; // Indicates successful deletion
};
