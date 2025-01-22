"use client"
import Link from 'next/link';
import { useState } from 'react';

const Nav2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-tel-500 py-4 mb-4 navigation">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1 overflow-x-auto hide-scroll-bar">
          <div className="hidden md:flex justify-center">
            <Link href="/" className="white_btn text-lg text-black hover:text-orange-700 mx-4">
              Home
            </Link>
            <Link href="/how-to" className="black_btn text-lg text-black hover:text-blue-700 mx-4">
              How To
            </Link>
            <Link href="/about-us" className="black_btn text-lg text-black hover:text-pink-700 mx-4">
              About us
            </Link>
            <Link href="/contact" className="black_btn text-lg text-black hover:text-purple-700 mx-4">
              Contact
            </Link>
          </div>
        </div>
        <div className="md:hidden flex">
  <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none ml-auto">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  </button>
</div>

      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50" onClick={handleClose}>
          <div className="bg-white p-4 absolute top-0 left-0 w-1/2 z-50" onClick={(e) => e.stopPropagation()}>
            <Link href="/" className="block text-lg text-black hover:text-orange-700 mx-4 mb-4">
              Home
            </Link>
            <Link href="/how-to" className="block text-lg text-black hover:text-blue-700 mx-4 mb-4">
              How To
            </Link>
            <Link href="/about-us" className="block text-lg text-black hover:text-pink-700 mx-4 mb-4">
              About us
            </Link>
            <Link href="/contact" className="block text-lg text-black hover:text-purple-700 mx-4 mb-4">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav2;

