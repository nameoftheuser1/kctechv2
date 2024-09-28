import React, { lazy, Suspense, useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import AuthSidebar from "@/Components/Layouts/AuthSidebar";
import Spinner from "@/Components/Shared/Spinner";

const RoomCard = lazy(() => import("./RoomCard"));
const CategoryModal = lazy(() => import("./CategoryModal"));
const Pagination = lazy(() => import("@/Components/Shared/Pagination"));
const EntityActions = lazy(() =>import("@/Components/Shared/EntityActions"));

function Rooms({ rooms, search, flash }) {
    const route = useRoute();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { success } = flash || {};
    const [showSuccess, setShowSuccess] = useState(false);

    const [filteredRooms, setFilteredRooms] = useState(rooms.data);
    const [currentPage, setCurrentPage] = useState(rooms.current_page);

    useEffect(() => {
        if (success) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const { data, setData, post, errors, processing } = useForm({
        name: "",
        search: "",
    });

    const confirmDelete = (formId, type) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            document.getElementById(formId).submit();
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = data.search.toLowerCase();

        const filtered = rooms.data.filter(
            (room) =>
                room.room_number.toLowerCase().includes(searchValue) ||
                room.stay_type.toLowerCase().includes(searchValue) ||
                room.room_type_name.toLowerCase().includes(searchValue)
        );

        setFilteredRooms(filtered);
    };

    const handleRoomTypeSubmit = (e) => {
        e.preventDefault();
        post(route("roomtypes.store"), {
            name: data.name,
        });
        setIsModalOpen(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        post(route("rooms.index"), { search: data.search, page: page });
    };

    const columns = ["Room Number", "Room Type", "Price", "Pax", "Stay Type"];

    return (
        <>
            <Suspense fallback={<Spinner />}>
                <Head title="Room List" />

                {showSuccess && (
                    <div
                        className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                        role="alert"
                    >
                        {success}
                    </div>
                )}

                <div className="mb-4 flex justify-center gap-4">
                    <Link
                        href={route("rooms.create")}
                        className="text-sm bg-slate-600 text-white p-2 rounded-lg flex items-center w-full"
                    >
                        Add Room
                    </Link>
                    <button
                        className="text-sm bg-pink-600 text-white p-2 rounded-lg flex items-center w-full"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Room Type
                    </button>
                </div>

                <CategoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleRoomTypeSubmit}
                    data={data}
                    setData={setData}
                    processing={processing}
                    errors={errors}
                />

                <form onSubmit={handleSearch} className="mb-4">
                    <input
                        type="text"
                        name="search"
                        id="search-input"
                        placeholder="Search..."
                        className="p-2 border text-sm rounded w-full focus:ring-pink-600 mb-1 mt-2"
                        onChange={(e) => setData("search", e.target.value)}
                        value={data.search}
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded w-full text-sm hover:bg-blue-700"
                    >
                        Search
                    </button>
                </form>

                <div className="hidden md:block">
                    <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
                        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white w-full">
                            Rooms
                            <p className="mt-1 text-sm font-normal text-gray-500">
                                Browse a list of available rooms in our
                                reservation system.
                            </p>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        scope="col"
                                        className="px-6 py-3"
                                        key={col}
                                    >
                                        {col}
                                    </th>
                                ))}
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            {filteredRooms.map((room) => (
                                <tr className="bg-white border-b" key={room.id}>
                                    <td className="px-6 py-4">
                                        {room.room_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        {room.room_type_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        ₱{room.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">{room.pax}</td>
                                    <td className="px-6 py-4">
                                        {room.stay_type}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <EntityActions
                                            entity={room}
                                            entityName="rooms"
                                            editRoute={(id) =>
                                                route("rooms.edit", {
                                                    room: id,
                                                })
                                            }
                                            onDelete={(id) =>
                                                confirmDelete(
                                                    `delete-form-${id}`,
                                                    "room"
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    lastPage={rooms.last_page}
                    onPageChange={handlePageChange}
                />

                <RoomCard rooms={filteredRooms} confirmDelete={confirmDelete} />
            </Suspense>
        </>
    );
}

Rooms.layout = (page) => <AuthSidebar children={page} />;
export default Rooms;
