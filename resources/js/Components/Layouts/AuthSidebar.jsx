import { Link } from "@inertiajs/react";
import { useState } from "react";

const AuthSidebar = ({ isOpen }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(isOpen);

    const menuItems = [
        {
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
            ),
            label: "Dashboard",
            route: "",
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
            route: "",
        },
        {
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
            ),
            label: "Salary Management",
            route: "#",
        },
    ];

    return (
        <div className="flex h-screen">
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 sm:z-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b mt-14 md:mt-0">
                    <h2 className="text-2xl font-bold">Kandahar</h2>
                </div>
                <nav className="p-4">
                    <ul>
                        {menuItems.map((item) => (
                            <li
                                key={item.route}
                                className={`mb-4 hover:bg-slate-300 rounded-lg p-1 ${
                                    window.location.pathname ===
                                    route(item.route)
                                        ? "bg-gray-300 text-slate-700"
                                        : ""
                                }`}
                            >
                                <Link
                                    href={route(item.route)}
                                    className="flex items-center space-x-2 text-slate-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {item.icon}
                                    </svg>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white md:hidden">
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="w-10 h-10"
                    aria-label="Toggle Sidebar"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
                <div className="flex justify-center flex-1">
                    <img src="/path/to/logo.png" alt="Logo" className="h-8" />
                </div>
                <div className="w-10 h-10"></div>
            </nav>

            <main className="flex-1 p-4 mt-14 md:mt-0 ms-0 md:ms-64 bg-gray-100">
                {children}
            </main>
        </div>
    );
};

export default AuthSidebar;
