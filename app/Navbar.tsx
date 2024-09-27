'use client'; 

import React, { useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserIcon, ArrowRightOnRectangleIcon, BoltIcon } from '@heroicons/react/24/solid'; 

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex h-[100px] items-center justify-between px-5 md:px-14 bg-black shadow-lg text-white">
            <h1 className="text-2xl font-bold">Enlighten</h1>

            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                {isOpen ? <XMarkIcon className="h-8 w-8 text-white" /> : <Bars3Icon className="h-8 w-8 text-white" />}
            </div>

            {/* Menu for larger screens */}
            <div className="hidden md:flex">
                <ul className="flex flex-row space-x-10">
                    <li className="hover:text-gray-400 transition-all duration-300 cursor-pointer flex items-center">
                        <BoltIcon className="h-5 w-5 mr-1" />
                        Question Cube
                    </li>
                    <li className="hover:text-gray-400 transition-all duration-300 cursor-pointer flex items-center">
                        <UserIcon className="h-5 w-5 mr-1" />
                        Signin
                    </li>
                    <li className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded-full transition-all duration-300 cursor-pointer flex items-center">
                        Get Started
                    </li>
                </ul>
            </div>

            {/* Mobile Menu - Fullscreen Sidebar */}
            <div className={`md:hidden fixed top-0 left-0 h-screen w-full bg-black z-50 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between px-5 py-5">
                    <h1 className="text-2xl font-bold">Enlighten</h1>
                    <XMarkIcon className="h-8 w-8 text-white cursor-pointer" onClick={toggleMenu} />
                </div>
                <ul className="flex flex-col items-center space-y-10 mt-20">
                    <li className="hover:text-gray-400 transition-all duration-300 cursor-pointer flex items-center">
                        <BoltIcon className="h-5 w-5 mr-2" />
                        Question Cube
                    </li>
                    <li className="hover:text-gray-400 transition-all duration-300 cursor-pointer flex items-center">
                        <UserIcon className="h-5 w-5 mr-2" />
                        Signin
                    </li>
                    <li className="bg-white hover:bg-gray-200 text-black py-2 px-4 rounded-full transition-all duration-300 cursor-pointer flex items-center">
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                        Get Started
                    </li>
                </ul>
            </div>
        </nav>
    );
};
