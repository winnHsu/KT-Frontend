import React, { useState, useEffect } from 'react';
import { createItem, fetchItems } from '../../api/itemsApi'; // Ensure fetchItems is implemented
import { useAuth } from '../../context/AuthContext';
import { fetchCategories } from '../../api/categoriesApi';
import './ItemForm.css';
import TextButton from '../buttons/TextButton';

const ItemForm = ({ onClose }) => {
    const { token } = useAuth();
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [units, setUnits] = useState('');
    const [minimumStock, setMinimumStock] = useState(0);
    const [desiredStock, setDesiredStock] = useState(0);
    const [isAssembly, setIsAssembly] = useState(false);
    const [isComponent, setIsComponent] = useState(false);
    const [isPurchaseable, setIsPurchaseable] = useState(true);
    const [isSalable, setIsSalable] = useState(true);
    const [isBundle, setIsBundle] = useState(false);
    const [isTrackable, setIsTrackable] = useState(true);
    const [isTemplate, setIsTemplate] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [SKU, setSKU] = useState('');
    const [variantOf, setVariantOf] = useState('');
    const [keywords, setKeywords] = useState('');
    const [externalLink, setExternalLink] = useState('');
    const [defaultLocation, setDefaultLocation] = useState('');
    const [items, setItems] = useState([]); // For the variant_of dropdown
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (token) {
            fetchCategories(token).then(setCategories).catch(console.error);
            fetchItems(token).then(setItems).catch(console.error);
        }
    }, [token]);

    const onItemCreate = async () => {
        const itemData = {
            name: itemName,
            description,
            category,
            price: price,
            units,
            minimum_stock: minimumStock,
            desired_stock: desiredStock,
            is_assembly: isAssembly,
            is_component: isComponent,
            is_purchaseable: isPurchaseable,
            is_salable: isSalable,
            is_bundle: isBundle,
            is_trackable: isTrackable,
            is_template: isTemplate,
            is_active: isActive,
            SKU,
            variant_of: variantOf,
            keywords,
            external_link: externalLink,
            default_location: defaultLocation
        };

        try {
            await createItem(token, itemData);
            onClose(); // Assuming you pass an onClose prop for closing the form modal
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const toggleAdvanced = () => setShowAdvanced(!showAdvanced);

    return (
        <div className="itemFormContainer">
            <div className="itemFormTitle">
                <h2>Create New Item</h2>
                <TextButton onClick={onClose} text='X' backgroundColor='#E0E0E0' color='#111111' />
            </div>
            <form className="itemForm">
                <div className="itemFormLeft">
                    <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Item Name" required />
                    {showAdvanced && <input type="text" value={SKU} onChange={e => setSKU(e.target.value)} placeholder="SKU" />}
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
                    {showAdvanced && <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="Keywords" />}
                    {showAdvanced && (
                        <select value={variantOf} onChange={e => setVariantOf(e.target.value)}>
                            <option value="">Select variant of</option>
                            {items.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    )}
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    {showAdvanced && <input type="text" value={externalLink} onChange={e => setExternalLink(e.target.value)} placeholder="External Link" />}
                    {showAdvanced && <input type="text" value={defaultLocation} onChange={e => setDefaultLocation(e.target.value)} placeholder="Default Location" />}
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
                    <input type="text" value={units} onChange={e => setUnits(e.target.value)} placeholder="Units" />
                    <input type="number" value={minimumStock} onChange={e => setMinimumStock(parseInt(e.target.value))} placeholder="Minimum Stock" />
                    <input type="number" value={desiredStock} onChange={e => setDesiredStock(parseInt(e.target.value))} placeholder="Desired Stock" />
                </div>
                <div className="itemFormRight">
                    <label><input type="checkbox" checked={isAssembly} onChange={e => setIsAssembly(e.target.checked)} /> Assembly</label>
                    <label><input type="checkbox" checked={isComponent} onChange={e => setIsComponent(e.target.checked)} /> Component</label>
                    <label><input type="checkbox" checked={isPurchaseable} onChange={e => setIsPurchaseable(e.target.checked)} /> Purchaseable</label>
                    <label><input type="checkbox" checked={isSalable} onChange={e => setIsSalable(e.target.checked)} /> Salable</label>
                    <label><input type="checkbox" checked={isBundle} onChange={e => setIsBundle(e.target.checked)} /> Bundle</label>
                    <label><input type="checkbox" checked={isTrackable} onChange={e => setIsTrackable(e.target.checked)} /> Trackable</label>
                    {showAdvanced && <label><input type="checkbox" checked={isTemplate} onChange={e => setIsTemplate(e.target.checked)} /> Template</label>}
                    {showAdvanced && <label><input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} /> Active</label>}
                    <div className="formButtons">
                        <TextButton onClick={toggleAdvanced} text={showAdvanced ? 'SIMPLE' : 'ADVANCED'} backgroundColor='#E0E0E0' color='#111111' />
                        <TextButton onClick={onItemCreate} text='CREATE' backgroundColor='#E0E0E0' color='#111111' />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ItemForm;
