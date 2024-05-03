import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isLoggedIn: false, token: null, refreshToken: null });

    const refreshAuthToken = useCallback(async (refreshToken) => {
        try {
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
                console.error('Failed to refresh token', await response.text()); // Log the error response
                console.log('refreshToken', refreshToken);
                logout(); // Optionally logout user or handle retry logic
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    }, []); // Dependencies can be added if needed


    const refreshTokenAtInterval = useCallback((refreshToken) => {
        const fiveMinutes = 300000; // 300,000 milliseconds
        const intervalId = setInterval(() => {
            refreshAuthToken(refreshToken);
        }, fiveMinutes);

        return () => clearInterval(intervalId);
    }, [refreshAuthToken]); // Including refreshAuthToken to handle updates

    useEffect(() => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const isLoggedIn = !!token && !!refreshToken;
        if (isLoggedIn) {
            setAuth({ isLoggedIn, token, refreshToken });
            const clearInterval = refreshTokenAtInterval(refreshToken);
            return () => clearInterval(clearInterval); // Cleanup on component unmount
        }
    }, [refreshTokenAtInterval]);

    const login = (token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        setAuth({ isLoggedIn: true, token, refreshToken });
        refreshTokenAtInterval(refreshToken);
        console.log(token, refreshToken)
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setAuth({ isLoggedIn: false, token: null, refreshToken: null });
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
