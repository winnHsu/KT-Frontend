import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import sidebar styles
import icon_home from '../../assets/icons/icon_home.png'; // Import icons used in the sidebar
import icon_build from '../../assets/icons/icon_build.png';
import icon_document from '../../assets/icons/icon_document.png';
import icon_group from '../../assets/icons/icon_group.png';
import icon_help from '../../assets/icons/icon_help.png';
import icon_integration from '../../assets/icons/icon_integration.png';
import icon_item from '../../assets/icons/icon_item.png';
import icon_supply from '../../assets/icons/icon_supply.png';
import icon_sale from '../../assets/icons/icon_sale.png';
import icon_report from '../../assets/icons/icon_report.png';
import icon_profile from '../../assets/icons/icon_profile.png';
import icon_manufact from '../../assets/icons/icon_manufact.png';
import icon_logout from '../../assets/icons/icon_logout.png';
import icon_location from '../../assets/icons/icon_location.png';

function Sidebar() {
    // Define main navigation items with paths, labels, and icons
    const sidebarItems = [
        { path: "/", label: "Home", icon: icon_home },
        { path: "/items", label: "Items", icon: icon_item },
        { path: "/stock", label: "Stock", icon: icon_location },
        { path: "/build", label: "Build", icon: icon_build },
        { path: "/customers", label: "Customers", icon: icon_group },
        { path: "/sales-orders", label: "Sales Orders", icon: icon_sale },
        { path: "/suppliers", label: "Suppliers", icon: icon_supply },
        { path: "/manufacturers", label: "Manufacturers", icon: icon_manufact },
        { path: "/purchase-orders", label: "Purchase Orders", icon: icon_document },
        { path: "/reports", label: "Reports", icon: icon_report },
    ];

    // Define user-specific navigation items with paths, labels, and icons
    const sidebarUserItems = [
        { path: "/help", label: "Help!", icon: icon_help },
        { path: "/integrations", label: "Integrations", icon: icon_integration },
        { path: "/logout", label: "Logout", icon: icon_logout },
        { path: "/my-profile", label: "My Profile", icon: icon_profile }
    ]

    // Render the sidebar with two lists of navigation items
    return (
        <div className="sidebar">
            <ul>
                {sidebarItems.map(item => (
                    <li key={item.label}>
                        <NavLink to={item.path} activeClassName="active">
                            <img src={item.icon} alt={item.label} />
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <ul>
                {sidebarUserItems.map(item => (
                    <li key={item.label}>
                        <NavLink to={item.path} activeClassName="active">
                            <img src={item.icon} alt={item.label} />
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar; // Export the Sidebar component for use in other parts of the app
