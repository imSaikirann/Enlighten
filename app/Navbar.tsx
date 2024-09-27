'use client';
import React, { useState } from 'react';
import classNames from 'classnames';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const currentPath = usePathname()
    const navItems = [
        { name: "  Question Cube", href: "/questions" },
        { name: "  Signin", href: "/signin" },
        { name: "Get Started", href: "/signup" },
    ]
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
                    {navItems && navItems.map(items => (
                        <li className={classNames({
                            'text-gray-50': items.href === currentPath,
                            'text-gray-500': items.href !== currentPath,
                            'hover:text-gray-100 transition-colors':true
                        })}>

                           <Link href={items.href}>{items.name}</Link> 
                        </li>
                    ))}

                </ul>
            </div>

            <div className={`md:hidden fixed top-0 left-0 h-screen w-full bg-black z-50 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between px-5 py-5">
                    <h1 className="text-2xl font-bold text-white">Enlighten</h1>
                    <XMarkIcon className="h-8 w-8 text-white cursor-pointer" onClick={toggleMenu} />
                </div>

                {/* Sidebar Menu Items */}
                <div className="flex flex-col justify-center h-full">
                    <ul className="flex flex-col items-center space-y-8 text-lg">
                    {navItems && navItems.map(items => (
                        <li className={classNames({
                            'text-gray-50': items.href === currentPath,
                            'text-gray-500': items.href !== currentPath,
                            'hover:text-gray-100 transition-colors':true
                        })}>

                           <Link href={items.href}>{items.name}</Link> 
                        </li>
                    ))}

                    </ul>
                </div>
            </div>
        </nav>
    );
};
