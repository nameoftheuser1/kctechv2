import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import AuthSidebar from "../../Components/Layouts/AuthSidebar";

function Rooms({ rooms, search }) {
    const route = useRoute();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        name: "",
        search: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        post(route("rooms.index"), { search: data.search });
    };

    const handleRoomTypeSubmit = (e) => {
        e.preventDefault();
        post(route("roomtypes.store"), {
            name: data.name,
        });
        setIsModalOpen(false);
    };

    const columns = ["Room Number", "Price", "Pax", "Stay Type"];

    const renderActions = (room) => {
        if (!room || !room.id) {
            console.error("Room object is missing or has no id:", room);
            return null;
        }

        return (
            <>
                <Link
                    href={route("rooms.edit", { room: room.id })}
                    className="font-medium text-blue-600 hover:underline"
                >
                    Edit
                </Link>
                <button
                    className="text-red-600 hover:underline ml-2"
                    onClick={() =>
                        confirmDelete(`delete-form-${room.id}`, "room")
                    }
                >
                    Delete
                </button>
                <form
                    id={`delete-form-${room.id}`}
                    action={route("rooms.destroy", { room: room.id })}
                    method="POST"
                    style={{ display: "none" }}
                >
                    @csrf @method('DELETE')
                </form>
            </>
        );
    };

    return (
        <>
            <Head title="Room List" />

            <div className="mb-4 flex justify-center gap-4">
                <Link
                    href={route("rooms.create")}
                    className="text-sm bg-slate-600 text-white p-2 rounded-lg flex items-center w-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    Add Room
                </Link>
                <button
                    className="text-sm bg-pink-600 text-white p-2 rounded-lg flex items-center w-full"
                    onClick={() => setIsModalOpen(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    Add Room Type
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Add Category</h2>
                        <form onSubmit={handleRoomTypeSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 p-2 border w-full rounded-lg focus:ring-pink-600"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-sm mt-2">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white p-2 rounded-lg"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-pink-600 text-white p-2 rounded-lg"
                                    disabled={processing}
                                >
                                    {processing ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="hidden md:block">
                <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white w-full">
                        Rooms
                        <p className="mt-1 text-sm font-normal text-gray-500">
                            Browse a list of available rooms in our reservation
                            system.
                        </p>
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                name="search"
                                id="search-input"
                                placeholder="Search..."
                                className="p-2 border text-sm rounded w-full focus:ring-pink-600 mb-1 mt-2"
                                onChange={(e) =>
                                    setData("search", e.target.value)
                                }
                                value={data.search}
                            />
                            <button
                                type="submit"
                                className="p-2 bg-blue-500 text-white rounded w-full text-sm hover:bg-blue-700"
                            >
                                Search
                            </button>
                        </form>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th scope="col" className="px-6 py-3" key={col}>
                                    {col}
                                </th>
                            ))}
                            <th scope="col" className="px-6 py-3 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {rooms.data.map((room) => (
                            <tr className="bg-white border-b" key={room.id}>
                                <td className="px-6 py-4">
                                    {room.room_number}
                                </td>
                                <td className="px-6 py-4">
                                    ₱{room.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4">{room.pax}</td>
                                <td className="px-6 py-4">
                                    {room.stay_type.charAt(0).toUpperCase() +
                                        room.stay_type.slice(1)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {renderActions(room)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                {rooms.data.map((room) => (
                    <div
                        className="bg-white border rounded-lg p-4 shadow-md"
                        key={room.id}
                    >
                        <h3 className="text-lg font-semibold">
                            Room Number: {room.room_number}
                        </h3>
                        <p>Price: ₱{room.price.toFixed(2)}</p>
                        <p>
                            <strong>Pax:</strong> {room.pax}
                        </p>
                        <p>
                            <strong>Stay Type:</strong>{" "}
                            {room.stay_type.charAt(0).toUpperCase() +
                                room.stay_type.slice(1)}
                        </p>
                        <div className="mt-2">
                            <button
                                className="text-red-600 hover:underline ml-2"
                                onClick={() =>
                                    confirmDelete(
                                        `delete-form-${room.id}`,
                                        "room"
                                    )
                                }
                            >
                                Delete
                            </button>
                            <form
                                id={`delete-form-${room.id}`}
                                action={route("rooms.destroy", {
                                    room: room.id,
                                })}
                                method="POST"
                                style={{ display: "none" }}
                            >
                                @csrf @method('DELETE')
                            </form>
                            <Link
                                href={route("rooms.edit", { room: room.id })}
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

Rooms.layout = (page) => <AuthSidebar children={page} />;
export default Rooms;
