import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PreLoader from '../component/PreLoader';

function UserLogin() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const saveUserToMongoDB = async (user) => {
        try {
            const response = await axios.post('http://localhost:3000/user/createUser', {
                firebaseuid: user.uid,
                name: user.displayName,
                email: user.email,
                imageUrl: user.photoURL
            });

            if (response.data.message === "User already exists.") {
                navigate('/landing'); // Navigate if user already exists
            } else {
                navigate('/landing'); // Navigate for new user creation
            }

        } catch (error) {
            console.error('Error saving user to MongoDB:', error.message);
            toast.error('Failed to save user');
        }
    };

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                await saveUserToMongoDB(user);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div>
            <PreLoader />
            <Toaster />
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
}

export default UserLogin;
