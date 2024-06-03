import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../utils/firebase';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

function UserLogin() {
    const [user, setUser] = useState(null);

    const saveUserToMongoDB = async (user) => {
        try {
            const response = await axios.post('http://localhost:3000/user/createUser', {
                firebaseuid: user.uid,
                name: user.displayName,
                email: user.email,
                imageUrl: user.imageUrl
            });

            if (response.status === 201) {
                toast.success('Successfully saved');
            } else {
                toast.error(response.statusText);
            }
        } catch (error) {
            console.error('Error saving user to MongoDB:', error.message);
            toast.error('Failed to save user');
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithRedirect(auth, provider);
            setUser(result.user);
            saveUserToMongoDB(result.user);
        } catch (error) {
            console.error('Google sign-in failed. Error:', error);
            toast.error('Google sign-in failed');
        }
    };

    return (
        <div>
            <Toaster />
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
}

export default UserLogin;
