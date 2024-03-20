import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase-config'; // Ensure consistent import for firebase authentication
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    // Function to sign out the user
    const handleSignOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const value = {
        currentUser,
        signUp,
        signOut: handleSignOut // Expose signOut function
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
