import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import app from "../firebase/firebase.config";
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app) 

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [referLinkUser, setReferLinkUser] = useState("");


    const signUpWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginWithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const logOut = () => {
        return signOut(auth)
    };
    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    };

    const saveUser = (data) => {
        return axios.post("http://localhost:5000/app/user", data)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false); // Set loading to false when user data is available
              } else {
                setUser(null);
                setLoading(false);
                }
        })
                return () => {
                    unsubscribe();
                };
    },[]);


    const values = {
        signUpWithEmail,
        updateUser,
        loginWithEmail,
        user,
        saveUser,
        logOut,
        loading,
        referLinkUser,
        setReferLinkUser,
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;  