import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/widgets/Sidebar';
import HomePage from '../pages/HomePage/HomePage';
import ItemsPage from '../pages/ItemsPage/ItemsPage';
import StockPage from '../pages/StockPage/StockPage';
import BuildPage from '../pages/BuildPage/BuildPage';
import CustomerPage from '../pages/CustomerPage/CustomerPage';
import SalesOrdersPage from '../pages/SalesOrdersPage/SalesOrdersPage';
import SuppliersPage from '../pages/SuppliersPage/SuppliersPage';
import ManufacturersPage from '../pages/ManufacturersPage/ManufacturersPage';
import PurchaseOrdersPage from '../pages/PurchaseOrdersPage/PurchaseOrdersPage';
import ReportsPage from '../pages/ReportsPage/ReportsPage';
import HelpPage from '../pages/HelpPage/HelpPage';
import IntegrationsPage from '../pages/IntegrationsPage/IntegrationsPage';
import LogoutPage from '../pages/LogoutPage/LogoutPage';
import MyProfilePage from '../pages/MyProfilePage/MyProfilePage';
import RegistrationForm from '../pages/UserAuthentication/RegistrationForm';
import LoginPage from '../pages/UserAuthentication/LoginPage';
import NewPasswordPage from '../pages/UserAuthentication/NewPasswordPage';
import { AuthProvider, useAuth } from '../context/AuthContext';
import ItemDetailPage from '../pages/ItemsPage/ItemDetailPage';
import CategoryDetailPage from '../pages/ItemsPage/CategoryDetailPage';

function App() {
    return (
        <Router>
            <AuthProvider>
                <RoutingComponent />
            </AuthProvider>
        </Router>
    );
}

function RoutingComponent() {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '220px' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/items" element={<ItemsPage />} />
                    <Route path="/stock" element={<StockPage />} />
                    <Route path="/build" element={<BuildPage />} />
                    <Route path="/customers" element={<CustomerPage />} />
                    <Route path="/sales-orders" element={<SalesOrdersPage />} />
                    <Route path="/suppliers" element={<SuppliersPage />} />
                    <Route path="/manufacturers" element={<ManufacturersPage />} />
                    <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/integrations" element={<IntegrationsPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/my-profile" element={<MyProfilePage />} />
                    <Route path="/items/:itemId/detail" element={<ItemDetailPage />} />
                    <Route path="/categories/:categoryId/detail" element={<CategoryDetailPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    ) : (
        <Routes>
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<NewPasswordPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;