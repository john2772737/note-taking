import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function UserLogin() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        try {
             const result = await signInWithPopup(auth, provider);
            const Data= {
                firebaseuid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                imageUrl: result.user.photoURL,
               
            }
            const registered= await axios.get(`http://localhost:3000/user/getUser/${Data.firebaseuid}`)

            if (registered.data.exists) {
               navigate('/landing')
            } else {
                await axios.post('http://localhost:3000/user/createUser',Data )
                navigate('/landing')
            }
          
        } catch (error) {
            console.error('Sign-in error', error);
            toast.error('Sign-in failed. Please try again.');
        } finally {
            setLoading(false);
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
