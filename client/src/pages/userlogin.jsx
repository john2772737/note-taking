import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
//import './spinner.css';
import Logo from "../assets/Logo.png";
import {motion} from 'framer-motion';

function UserLogin() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 3 seconds delay
        return () => clearTimeout(timer);
    }, []);

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const Data = {
                firebaseuid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                imageUrl: result.user.photoURL,
            };
            const registered = await axios.get(`http://localhost:3000/user/getUser/${Data.firebaseuid}`);

            if (registered.data.exists) {
                navigate('/landing');
            } else {
                await axios.post('http://localhost:3000/user/createUser', Data);
                navigate('/landing');
            }
        } catch (error) {
            console.error('Sign-in error', error);
            toast.error('Sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen w-full bg-[#201C1C]'>
            <Toaster />
            <div className='flex justify-center items-center'>
                <motion.img 
                    className='flex-item mt-[200px] -ml-[150px]'
                    src={Logo}
                    initial={{ opacity: 0, x: -100 }} // Start from the left (-100px)
                    animate={{ opacity: 1, x: 0 }}     // Move to the center (0px)
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                    }}
                />
                <motion.h1 
                    className='font-bold text-6xl mt-[150px] text-white'
                    initial={{ opacity: 0, y: 50 }} // Start from below (50px below its original position)
                    animate={{ opacity: 1, y: 0 }}  // Move to its original position (no offset vertically)
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                    }}
                    animateChildren
                >
                    SwiftNotes
                </motion.h1>
                <motion.h2 
                    className='font-bold text-3xl mt-[250px] -ml-[220px] text-white'
                    initial={{ opacity: 0, y: 50 }} // Start from below (50px below its original position)
                    animate={{ opacity: 1, y: 0 }}  // Move to its original position (no offset vertically)
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                        delay: 0.5
                    }}
                >
                    Join Today.
                </motion.h2>
                <motion.button 
                    className='absolute bg-white rounded-xl h-[40px] w-[300px] mt-[600px] ml-[100px]' 
                    onClick={handleGoogleSignIn} disabled={loading}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                        delay: 1
                    }}
                    >
                    Sign in with Google
                </motion.button>
            </div>
        </div>
    );
    
    
}

export default UserLogin;
