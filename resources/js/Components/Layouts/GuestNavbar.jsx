import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function GuestNavbar({ children }) {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Room', href: '#' },
        { name: 'Services', href: '#' },
        { name: 'Reservation', href: '#' },
        { name: 'About', href: '#' },
    ];

    return (
        <div className="relative">
            <div className="w-full bg-white fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-4 sm:px-10">
                    <div className="flex justify-between items-center h-[100px]">
                        <p className="font-bold font-mono text-[20px] text-gray-800 sm:text-[30px]">
                            Kandahar Resort
                        </p>
                        <button
                            onClick={toggleMenu}
                            className="sm:hidden p-2 z-20"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-menu"
                            >
                                <line x1="4" x2="20" y1="12" y2="12" />
                                <line x1="4" x2="20" y1="6" y2="6" />
                                <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                        </button>
                        <div className="hidden sm:flex sm:gap-5 sm:h-[25px]">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="hover:border-b-[1px] border-black"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {open && (
                <div
                    className="sm:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-md z-40"
                    style={{ paddingTop: "100px" }}
                    onClick={() => setOpen(false)}
                >
                    <div className="container mx-auto px-4 sm:px-10 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block py-2 hover:bg-gray-100"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <div className="mt-[100px] overflow-x-hidden">{children}</div>
        </div>
    );
}
