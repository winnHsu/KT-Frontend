import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Context for authentication data and methods
const AuthContext = createContext(null);

// Custom hook to access authentication context
export function useAuth() {
    return useContext(AuthContext);
}

// Provider component managing authentication state and logic
export const AuthProvider = ({ children }) => {
    // State to store authentication status and tokens
    const [auth, setAuth] = useState({ isLoggedIn: false, token: null, refreshToken: null });

    // Function to refresh authentication token using a refreshToken
    const refreshAuthToken = useCallback(async (refreshToken) => {
        try {
            // Request to refresh token
            const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken })
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access);
                setAuth(prev => ({ ...prev, token: data.access }));
            } else {
                // Handling failed token refresh attempts
                console.error('Failed to refresh token', await response.text());
                logout(); // Log out if token refresh fails
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    }, []); // Empty dependency array ensures this function is memoized until unmount

    // Sets up interval to periodically refresh token
    const refreshTokenAtInterval = useCallback((refreshToken) => {
        const fiveMinutes = 300000; // Interval in milliseconds
        const intervalId = setInterval(() => {
            refreshAuthToken(refreshToken);
        }, fiveMinutes);

        // Cleanup function to clear interval
        return () => clearInterval(intervalId);
    }, [refreshAuthToken]);

    // Initial effect to setup authentication state and refresh logic
    useEffect(() => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const isLoggedIn = !!token && !!refreshToken;
        if (isLoggedIn) {
            setAuth({ isLoggedIn, token, refreshToken });
            const cleanupInterval = refreshTokenAtInterval(refreshToken);
            return () => cleanupInterval(); // Cleanup on component unmount
        }
    }, [refreshTokenAtInterval]);

    // Function to handle login
    const login = (token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        setAuth({ isLoggedIn: true, token, refreshToken });
        refreshTokenAtInterval(refreshToken);
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setAuth({ isLoggedIn: false, token: null, refreshToken: null });
    };

    // Context provider passing authentication state and actions
    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
