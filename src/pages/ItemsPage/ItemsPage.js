import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import TextButton from '../../components/buttons/TextButton';
import DataListWindow from '../../components/windows/DataListWindow';
import CountCard from '../../components/cards/CountCard';
import icon_architecture from '../../assets/icons/icon_architecture.png';
import icon_tool from '../../assets/icons/icon_tool.png';
import Separator from '../../components/uis/Separator';
import { fetchItems } from '../../api/itemsApi';
import { fetchCategories } from '../../api/categoriesApi';
import CategoryForm from '../../components/forms/CategoryForm';
import ItemForm from '../../components/forms/ItemForm';
import './ItemsPage.css'

export default function ItemsPage() {
    const { token } = useAuth();
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isCategoryFormVisible, setIsCategoryFormVisible] = useState(false);
    const [isItemFormVisible, setIsItemFormVisible] = useState(false);

    useEffect(() => {
        if (token) {
            fetchItems(token).then(setItems).catch(console.error);
            fetchCategories(token).then(setCategories).catch(console.error);
        }
    }, [token]);

    return (
        <div className="itemsContainer page-enter">
            <div className="page-topbar">
                <div className='page-topbar-titles'>
                    <p className="page-title">Item Dashboard</p>
                    <p className="page-subtitle">All items</p>
                    <TextButton onClick={() => setIsCategoryFormVisible(true)} text='NEW ITEM CATEGORY' backgroundColor='#5D9E52' color='#FFFFFF' />
                </div>
                <div className='page-topbar-counts'>
                    <CountCard src={icon_architecture} alt={'total-categories'} text={'Total Categories'} count={categories.length.toString()} />
                    <Separator />
                    <CountCard src={icon_tool} alt={'total-items'} text={'Total Items'} count={items.length.toString()} />
                </div>
            </div>
            <DataListWindow
                title={`${categories.length} Subcategories`}
                data={items}
                greenButton={'NEW ITEM'}
                greenClick={() => setIsItemFormVisible(true)}
                blueButton={null}
                blueClick={null}
                selectButton={'OPTIONS'}
                token={token} />
            {isCategoryFormVisible && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <CategoryForm onClose={() => setIsCategoryFormVisible(false)} />
                    </div>
                </div>
            )}
            {isItemFormVisible && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <ItemForm onClose={() => setIsItemFormVisible(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
