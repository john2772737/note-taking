import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PreLoader from '../component/PreLoader';
import swift from '../assets/swift.png';

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
        <div style={{ backgroundColor: '#181616', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <PreLoader />
            <Toaster />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px', transition: 'margin-top 0.5s' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', transition: 'margin-top 0.5s' }}>
                    <img src={swift} alt="SwiftNotes Logo" style={{ height: '350px', marginRight: '20px', zIndex: '555', maxWidth: '100%', marginLeft: '20px', marginTop: '6px'}} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'margin-top 0.5s' }}>
                        <p className="text-white font-serif font-bold" style={{ width: '100%', maxWidth: '300px', height: '80px', fontSize: '4vw', fontWeight: '800', margin: '0', textAlign: 'center', transition: 'margin-top 0.5s' }}>SwiftNotes</p>
                        <p className="text-white text-2xl md:text-3xl font-bold m-0" style={{ marginTop: '10px', textAlign: 'center', fontSize: '2vw', transition: 'margin-top 0.5s' }}>Join Today.</p>
                    </div>
                </div>
                <button
                    onClick={handleGoogleSignIn}
                    className="py-2 px-4 max-w-md flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    type="button"
                    style={{ marginTop: '10px', fontSize: '1.5vw', transition: 'margin-top 0.5s' }} // Adjust the font size here
                >
                    <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="mr-2"
                        viewBox="0 0 1790 1790"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                    </svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    );    
    
}

export default UserLogin;
