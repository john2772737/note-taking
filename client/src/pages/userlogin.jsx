import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const saveUserToMongoDB = async (user) => {
        try {
            const response = await axios.post('http://localhost:3000/user/createUser', {
                firebaseuid: user.uid,
                name: user.displayName,
                email: user.email,
                imageUrl: user.photoURL // Fixed to use correct property
            });

            if (response.status === 201) {
                toast.success('User saved to MongoDB');
            } else {
                toast.error(response.statusText);
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
                navigate('/landing');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div>
            <Toaster />
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
}

export default UserLogin;
