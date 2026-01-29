import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch user details
    const fetchUserDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USER.GET_USER_DATA);
            if (response.data && response.data.success) {
                setUser(response.data.userData);
            }
        } catch (error) {
            console.error("Failed to fetch user details", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Check for existing session on mount
    useEffect(() => {
        fetchUserDetails();
    }, []);

    const login = async (email, password) => {
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
        if (response.data.success) {
            // After successful login, fetch user details
            await fetchUserDetails();
        }
        return response;
    };

    const logout = async () => {
        try {
            await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, fetchUserDetails, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
