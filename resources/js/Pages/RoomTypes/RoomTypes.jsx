import React, { lazy, Suspense, useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";
import AuthSidebar from "@/Components/Layouts/AuthSidebar";
import Spinner from "@/Components/Shared/Spinner";

const Pagination = lazy(() => import("@/Components/Shared/Pagination"));
const TypeModal = lazy(() => import("@/Pages/Rooms/TypeModal"));

function RoomType({ roomTypes, flash }) {
    const route = useRoute();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredRoomTypes, setFilteredRoomTypes] = useState(roomTypes.data);
    const [currentPage, setCurrentPage] = useState(roomTypes.current_page);
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, errors, processing} = useForm({
        name: "",
        search: "",
    });

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = data.search.toLowerCase();
        const filtered = roomTypes.data.filter((roomType) =>
            roomType.name.toLowerCase().includes(searchValue)
        );
        setFilteredRoomTypes(filtered);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        post(route("roomtypes.index"), { search: data.search, page: page });
    };

    const handleRoomTypeSubmit = (e) => {
        e.preventDefault();
        post(route("roomtypes.store"), {
            name: data.name,
            onSuccess: (response) => {
                setFilteredRoomTypes((prev) => [...prev, response.roomType]);
                setData({ ...data, name: "" });
            },
        });
        setIsModalOpen(false);
    };


    return (
        <Suspense fallback={<Spinner />}>
            <Head title="Room Types" />

            {showSuccess && (
                <div
                    className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                    role="alert"
                >
                    {flash.success}
                </div>
            )}

            <div className="mb-4 flex justify-center">
                <button
                    className="text-sm bg-slate-600 text-white p-2 rounded-lg flex items-center w-full"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Room Type
                </button>
            </div>

            <TypeModal
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
                    placeholder="Search room types..."
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRoomTypes.map((roomType) => (
                    <div
                        key={roomType.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="relative h-48">
                            {roomType.room_images.length > 0 ? (
                                <img
                                    src={roomType.room_images[0].path_url}
                                    alt={`Room type ${roomType.name}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-slate-400">
                                    No image available
                                </div>
                            )}
                            {roomType.room_images.length > 1 && (
                                <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                                    +{roomType.room_images.length - 1} more
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2 text-slate-700">
                                {roomType.name}
                            </h2>
                            <div className="flex justify-between items-center">
                                <Link
                                    href={route("roomtypes.edit", {
                                        roomtype: roomType.id,
                                    })}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route("roomtypes.show", {
                                        roomtype: roomType.id,
                                    })}
                                    className="text-blue-500 hover:underline"
                                >
                                    View
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                lastPage={roomTypes.last_page}
                onPageChange={handlePageChange}
            />
        </Suspense>
    );
}

RoomType.layout = (page) => <AuthSidebar children={page} />;
export default RoomType;
