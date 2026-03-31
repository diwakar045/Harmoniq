import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
    signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Map Firebase user object to our app's defined shape
                setUser({
                    id: currentUser.uid,
                    username: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
                    email: currentUser.email
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signup = async (username, password) => {
        try {
            // Because UI originally used "username", we synthesize an email to keep it compatible
            const email = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@harmoniq.app`;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            
            setUser({
                id: userCredential.user.uid,
                username: username,
                email: email
            });
            return { success: true };
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                return { success: false, message: 'Username already exists' };
            }
            return { success: false, message: error.message };
        }
    };

    const login = async (username, password) => {
        try {
            const email = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@harmoniq.app`;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            setUser({
                id: userCredential.user.uid,
                username: userCredential.user.displayName || username,
                email: email
            });
            return { success: true };
        } catch (error) {
            return { success: false, message: 'Invalid username or password' };
        }
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
