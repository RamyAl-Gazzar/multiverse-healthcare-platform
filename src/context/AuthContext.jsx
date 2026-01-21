import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setUser(data);
                localStorage.setItem('userInfo', JSON.stringify(data));
                return { success: true };
            } else {
                return { success: false, error: data.message };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (name, email, password) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setUser(data);
                localStorage.setItem('userInfo', JSON.stringify(data));
                return { success: true };
            } else {
                return { success: false, error: data.message };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
