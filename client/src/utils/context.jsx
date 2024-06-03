// FirebaseContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/firebase'; // Ensure this path is correct
import { onAuthStateChanged } from 'firebase/auth';

const FirebaseContext = createContext();

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ currentUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};
