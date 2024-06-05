import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from './context';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useFirebase();
  const navigate= useNavigate()
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#181616' }}>
        <div className="p-8 rounded-lg shadow-lg text-center" style={{ backgroundColor: '#201C1C', opacity: 0.75 }}>
          <h1 className="text-2xl font-bold mb-4 text-white">You are not logged in.</h1>
          <p className="mb-4 text-white">Please log in to continue.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
