import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (fullName, username, email, password, confirmPassword, gender) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                fullName, username, email, password, confirmPassword, gender,
            });
            set({ user: response.data, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.error || "Error signing up", isLoading: false });
            throw error;
        }
    },
    login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });
            set({
                isAuthenticated: true,
                user: response.data,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            set({ error: error.response?.data?.error || "Error logging in", isLoading: false });
            throw error;
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/verify-email`, { params: { code } });
            set({ user: response.data, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.error || "Error verifying email", isLoading: false });
            throw error;
        }
    },
    getProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/profile`);
            set({ user: response.data, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: "Error fetching profile", isLoading: false });
        }
    },
    updateProfile: async (updates) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(`${API_URL}/updateProfile`, updates);
            set({ user: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.error || "Error updating profile", isLoading: false });
            throw error;
        }
    },
    deleteUser: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${API_URL}/deleteUser`);
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
            set({ error: "Error deleting user", isLoading: false });
            throw error;
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/profile`);
            set({ user: response.data, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    }
}));
