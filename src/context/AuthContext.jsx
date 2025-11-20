import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // Set default header for all requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // In a real app, you might validate the token with the backend here
            // For now, we'll assume it's valid if present and decode username if stored
            const storedUser = localStorage.getItem('username');
            if (storedUser) {
                setUser({ username: storedUser });
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        }
        setLoading(false);
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5160/api/auth/login', {
                username,
                password
            });

            const { token: newToken, username: newUsername } = response.data;

            localStorage.setItem('token', newToken);
            localStorage.setItem('username', newUsername);
            setToken(newToken);
            setUser({ username: newUsername });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Login failed'
            };
        }
    };

    const register = async (username, password) => {
        try {
            await axios.post('http://localhost:5160/api/auth/register', {
                username,
                password
            });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
