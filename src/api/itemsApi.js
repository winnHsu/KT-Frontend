const BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchItems = async (token) => {
    const response = await fetch(`${BASE_URL}/items/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Make sure this line is correct
        }
    });
    if (!response.ok) {
        console.log(token);
        throw new Error('Failed to fetch items');
    }
    return response.json();
};

export const fetchItemById = async (token, itemId) => {
    const response = await fetch(`${BASE_URL}/items/${itemId}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Ensure token is included for authorization
        }
    });
    if (!response.ok) {
        console.log(token);
        throw new Error('Failed to fetch item');
    }
    return response.json();
};


// Add this in the same file where fetchItems is defined
export const createItem = async (token, itemData) => {
    alert(JSON.stringify(itemData));
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

export const deleteItem = async (token, itemId) => {
    const response = await fetch(`${BASE_URL}/items/${itemId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` // Assuming token is necessary for authentication
        }
    });

    // Check if the deletion was not successful due to the category being in use or other server errors
    if (!response.ok) {
        const errorResponse = await response.text(); // Fetch the detailed error message if any
        console.error('Failed to delete item', errorResponse);

        // You might want to handle status-specific errors differently
        if (response.status === 500) {
            alert('This item is currently being used and cannot be deleted.');
        }
        else {
            throw new Error(`Failed to delete item with ID ${itemId}: ${errorResponse}`);
        }
    }

    return true; // Return true to indicate successful deletion
};