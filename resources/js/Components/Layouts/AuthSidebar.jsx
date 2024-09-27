import React, { useState, useEffect, useRef } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function AuthSidebar({ children }) {
    const { post } = useForm();
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        post("/logout");
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const navLinks = [
        {
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
            ),
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
            ),
            label: "Room Management",
            href: "/rooms",
        },
        {
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
            ),
            label: "Staff Management",
            href: "/staff",
        },
    ];

    return (
        <div className="flex">
            <div
                className="lg:hidden fixed top-0 left-0 p-4 cursor-pointer bg-white w-full z-50"
                onClick={toggleSidebar}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
            <nav
                ref={sidebarRef}
                className={`lg:block w-64 p-4 bg-white h-[100svh] fixed transition-transform duration-300 ease-in-out z-40 ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <h1 className="mb-9 cursor-default">Kandahar Resort</h1>
                <p className="text-gray-500 text-sm text-center mb-3 cursor-default">
                    MAIN MENU
                </p>
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.label} className="mb-2">
                            <Link
                                href={link.href}
                                className={`flex items-center space-x-2 text-gray-500 ${
                                    url.startsWith(link.href)
                                        ? "bg-indigo-800 !text-white p-2 rounded-lg ps-5"
                                        : ""
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-7 mr-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {link.icon}
                                </svg>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleLogout} className="mt-auto">
                    <button
                        type="submit"
                        className="flex items-center font-semibold text-xs text-white justify-center uppercase tracking-widest bg-slate-700 w-full rounded-lg p-3 mt-10"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                            />
                        </svg>
                        <span>Logout</span>
                    </button>
                </form>
            </nav>
            <main className="flex-1 p-4 mt-14 lg:mt-0 ms-0 lg:ms-64 bg-gray-100 min-h-screen">
                {children}
            </main>
        </div>
    );
}
