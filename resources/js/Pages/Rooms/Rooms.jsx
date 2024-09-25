import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import AuthSidebar from "../../Components/Layouts/AuthSidebar";
import DataTable from "../../Components/Forms/DataTable";

function Rooms({ rooms, search }) {
    const route = useRoute();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        name: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        post(route("rooms.index"), { search: data.search });
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        post(route("categories.store"), {
            name: data.name,
        });
        setIsModalOpen(false);
    };

    const columns = ["Room Number", "Price", "Pax", "Stay Type"];

    const renderActions = (room) => (
        <>
            <Link
                href={route("rooms.edit", room)}
                className="font-medium text-blue-600 hover:underline"
            >
                Edit
            </Link>
            <button
                className="text-red-600 hover:underline ml-2"
                onClick={() => confirmDelete(`delete-form-${room.id}`, "room")}
            >
                Delete
            </button>
            <form
                id={`delete-form-${room.id}`}
                action={route("rooms.destroy", room)}
                method="POST"
                style={{ display: "none" }}
            >
                @csrf @method('DELETE')
            </form>
        </>
    );

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
                    Add Category
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Add Category</h2>
                        <form onSubmit={handleCategorySubmit}>
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
                <DataTable
                    captionTitle="Rooms"
                    captionSubtitle="Browse a list of available rooms in our reservation system."
                    searchValue={data.search}
                    handleSearch={handleSearch}
                    handleInputChange={(e) => setData("search", e.target.value)}
                    columns={columns}
                    data={rooms.data.map((room) => ({
                        room_number: room.room_number,
                        price: `₱${room.price.toFixed(2)}`,
                        pax: room.pax,
                        stay_type:
                            room.stay_type.charAt(0).toUpperCase() +
                            room.stay_type.slice(1),
                    }))}
                    renderActions={renderActions}
                />
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
                                action={route("rooms.destroy", room)}
                                method="POST"
                                style={{ display: "none" }}
                            >
                                @csrf @method('DELETE')
                            </form>
                            <Link
                                href={route("rooms.edit", room)}
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
