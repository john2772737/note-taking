import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from './context';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useFirebase();
  const navigate= useNavigate()
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)' }}>
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">You are not logged in</h1>
          <p className="mb-4">Please log in to continue</p>
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
