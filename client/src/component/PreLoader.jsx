import React, { useEffect } from 'react';
import './preLoader.css';
import { preLoaderAnim } from '../animations';
import logo from '../assets/Logo.png';

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);

  return (
    <div className="preloader">
        <img className='logo' src={logo}></img>
        <div className="texts-container">
        <span>SwiftNotes</span>
        </div>
        
      
    </div>
  );
};

export default PreLoader;
