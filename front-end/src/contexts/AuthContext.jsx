import React, { useContext, createContext, useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosConfig";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the current user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/user");
                setUser(response.data.user); // Now correctly accessing 'user'
               
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Login function
    const login = async (credentials) => {
        try {
            const response = await axiosInstance.post('/login', credentials);
            setUser(response.data.user);
            console.log("User state updated:", response.data.user);
            return response.data.user;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await axiosInstance.post('/logout');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
    };



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;