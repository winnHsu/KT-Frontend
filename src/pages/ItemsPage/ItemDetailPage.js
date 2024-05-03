import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailPage.css'
import { deleteItem, fetchItemById } from '../../api/itemsApi';
import { useAuth } from '../../context/AuthContext';
import TextButton from '../../components/buttons/TextButton';

const ItemDetailPage = () => {
    const { token } = useAuth();
    const { itemId } = useParams(); // Get item ID from URL
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetchItemById(token, itemId)
            .then(data => {
                setItem(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [itemId, token]);

    const onDelete = () => {
        deleteItem(token, itemId);
        navigate(-1);
    };

    if (!item) return <div>Loading...</div>;

    return (
        <div className="detailContainer">
            <h1>Item Details: {item.name}</h1>
            <TextButton onClick={onDelete} text='DELETE THIS ITEM' backgroundColor='#A82E26' color='#FFFFFF' />
            <div className="detail">
                <strong>SKU:</strong> {item.SKU || 'N/A'}
            </div>
            <div className="detail">
                <strong>Description:</strong> {item.description || 'No description provided'}
            </div>
            <div className="detail">
                <strong>Category:</strong> {item.category ? item.category.name : 'No category'}
            </div>
            <div className="detail">
                <strong>Tags:</strong> {item.tags || 'No tags'}
            </div>
            <div className="detail">
                <strong>Price:</strong> ${item.price}
            </div>
            <div className="detail">
                <strong>Units:</strong> {item.units || 'Not specified'}
            </div>
            <div className="detail">
                <strong>Minimum Stock:</strong> {item.minimum_stock}
            </div>
            <div className="detail">
                <strong>Desired Stock:</strong> {item.desired_stock}
            </div>
            <div className="detail">
                <strong>Status:</strong>
                <ul>
                    <li>Assembly Required: {item.is_assembly ? 'Yes' : 'No'}</li>
                    <li>Component: {item.is_component ? 'Yes' : 'No'}</li>
                    <li>Purchaseable: {item.is_purchaseable ? 'Yes' : 'No'}</li>
                    <li>Salable: {item.is_salable ? 'Yes' : 'No'}</li>
                    <li>Bundle: {item.is_bundle ? 'Yes' : 'No'}</li>
                    <li>Trackable: {item.is_trackable ? 'Yes' : 'No'}</li>
                    <li>Template: {item.is_template ? 'Yes' : 'No'}</li>
                    <li>Active: {item.is_active ? 'Yes' : 'No'}</li>
                </ul>
            </div>
            <div className="detail">
                <strong>Stock Information:</strong>
                <ul>
                    <li>In Stock: {item.in_stock}</li>
                    <li>Available Stock: {item.available_stock}</li>
                    <li>Total Allocated: {item.total_allocated}</li>
                    <li>Allocated to Builds: {item.allocated_to_builds}</li>
                    <li>Allocated to Sales: {item.allocated_to_sales}</li>
                    <li>Incoming Stock: {item.incoming_stock}</li>
                    <li>On Build Order: {item.on_build_order}</li>
                    <li>Net Stock: {item.net_stock}</li>
                </ul>
            </div>
            <div className="detail">
                <strong>External Link:</strong> {item.external_link || 'No link provided'}
            </div>
            <div className="detail">
                <strong>Default Location:</strong> {item.default_location || 'Not specified'}
            </div>
            <div className="detail">
                <strong>Variant Of:</strong> {item.variant_of ? `ID: ${item.variant_of.id}` : 'This item is not a variant'}
            </div>
        </div>
    );
};

export default ItemDetailPage;
