/*import {create} from 'zustand';
import axios from 'axios';
import {toast} from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        console.log(credentials);
        set({isSigningUp: true});
        try{
            const response = await axios.post("https://cineflix-0bd3.onrender.com/api/v1/auth/signup", credentials, {withCredentials: true});
            set({user: response.data.user, isSigningUp: false});
            toast.success("Account created successfully");
        }catch(error){
            toast.error(error.response.data.message || "Sign Up failed");
            set({isSigningUp: false, user: null});
        }
    },
    login: async (credentials) => {
        console.log(credentials);
        set({isLoggingIn: true});
        try{
            const response = await axios.post("https://cineflix-0bd3.onrender.com/api/v1/auth/login", credentials, {withCredentials: true});
            set({user: response.data.user, isLoggingIn: false});
            toast.success("Logged in successfully");
        }catch(error){
            toast.error(error.response.data.message || "Log in failed");
            set({isLoggingIn: false, user: null});
        }
    },
    logout: async () => {
        set({isLoggingOut: true});
        try{
            const response = await axios.post("https://cineflix-0bd3.onrender.com/api/v1/auth/logout");
            set({user: null, isLoggingOut: false});
            toast.success("Logged out successfully");
        }catch(err){
            set({isLoggingOut: false});
            toast.error(error.response.data.message || "Log out failed");
        }
    },
    authCheck: async () => {
        set({isCheckingAuth: true});
        try{
            const response = await axios.get("https://cineflix-0bd3.onrender.com/api/v1/auth/authCheck", {withCredentials: true});
            set({user: response.data.user, isCheckingAuth: false});
        }catch(err){
            set({isCheckingAuth: false, user: null});
        }
    }
}));
*/
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    //token: null, // Add a token state to store the JWT

    signup: async (credentials) => {
        console.log(credentials);
        set({ isSigningUp: true });
        try {
            const response = await axios.post(
                "https://cineflix-0bd3.onrender.com/api/v1/auth/signup", 
                credentials, 
                { withCredentials: true }
            );
            // Store the token in localStorage and in the state
            //localStorage.setItem('jwtToken', response.data.token);
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Sign Up failed");
            set({ isSigningUp: false, user: null });
        }
    },

    login: async (credentials) => {
        console.log(credentials);
        set({ isLoggingIn: true });
        try {
            const response = await axios.post(
                "https://cineflix-0bd3.onrender.com/api/v1/auth/login", 
                credentials, 
                { withCredentials: true }
            );
            // Store the token in localStorage and in the state
            //localStorage.setItem('jwtToken', response.data.token);
            set({ user: response.data.user, isLoggingIn: false });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Log in failed");
            set({ isLoggingIn: false, user: null });
        }
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
            const response = await axios.post("https://cineflix-0bd3.onrender.com/api/v1/auth/logout", {}, { withCredentials: true });
            // Remove the token from localStorage
            //localStorage.removeItem('jwtToken');
            set({ user: null, isLoggingOut: false });
            toast.success("Logged out successfully");
        } catch (err) {
            set({ isLoggingOut: false });
            toast.error(err.response.data.message || "Log out failed");
        }
    },

    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            // Get the token from localStorage
            /*
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error('No token found');
            }
            */
            const response = await axios.get(
                "https://cineflix-0bd3.onrender.com/api/v1/auth/authCheck", 
                /*
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Send token in the Authorization header
                    },
                    withCredentials: true,
                }*/
                { withCredentials: true }
            );
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (err) {
            set({ isCheckingAuth: false, user: null });
            toast.error("Failed to authenticate");
        }
    }
}));
