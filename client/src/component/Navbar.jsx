import React from 'react';
import logo from '../assets/Logo.png';

function Navbar() {
  return (
    <div className="fixed h-20 w-full flex flex-row text-center items-center font-bold bg-[#181616] text-white border-b-2 border-[#808080] top-0 left-0 z-50">
      <img src={logo} alt="Logo" className="ml-5 h-15"></img>
      <h1 className="ml-2 text-lg">SwiftNotes</h1>
    </div>
  );
}

export default Navbar;
