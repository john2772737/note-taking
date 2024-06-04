import React from 'react';
import logo from '../assets/Logo.png';
import mikha from '../assets/mikha.jpg'
import maloi from '../assets/maloi.jpg'

function Navbar() {
  return (
    <div className="fixed h-20 w-full flex flex-row text-center items-center font-bold bg-[#181616] text-white border-b-2 border-[#808080] top-0 left-0 z-50">
        <img src={logo} alt="Logo" className="ml-5 h-15"></img>
        <h1 className="ml-2 text-lg">SwiftNotes</h1>
        <div className='absolute right-20 mx-50 h-8 w-10 mx-4 gap-2  flex flex-row'>
            <img className='rounded-[50%]' src={mikha} alt=""></img>
            <img className='rounded-[50%]' src={maloi} alt=""></img>
        </div>
        <div className='absolute flex gap-10 right-10'>
            <button className='bg-[#209CF4] w-20 h-7 rounded-xl'>Save</button>
        </div>
    </div>
  );
}

export default Navbar;
