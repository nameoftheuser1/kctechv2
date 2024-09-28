import React, { lazy, Suspense } from "react";
import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import AuthSidebar from "@/Components/Layouts/AuthSidebar";
import Spinner from "@/Components/Shared/Spinner";

const InputLabel = lazy(() => import("@/Components/Forms/InputLabel"));
const TextInput = lazy(() => import("@/Components/Forms/TextInput"));
const InputError = lazy(() => import("@/Components/Forms/InputError"));

function RoomCreate({ room_types }) {
    const route = useRoute();
    const { data, setData, post, processing, errors } = useForm({
        room_number: "",
        room_type_id: "",
        price: 0,
        pax: 0,
        stay_type: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("rooms.store"), {
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                console.error("Error creating room:", errors);
            },
        });
    }

    return (
        <>
            <Suspense fallback={<Spinner />}>
                <div className="container mx-auto px-4 py-8 w-full sm:w-1/2 border rounded-lg bg-white mt-0 sm:mt-10">
                    <Link
                        href={route("rooms.index")}
                        className="text-blue-500 text-sm underline"
                    >
                        &larr; back to room list
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-700 mt-4">
                        Create New Room
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Add room details
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full justify-center"
                    >
                        <div className="mb-4 w-full">
                            <InputLabel
                                htmlFor="room_number"
                                value="Room Number"
                            />
                            <TextInput
                                name="room_number"
                                id="room_number"
                                value={data.room_number}
                                onChange={(e) =>
                                    setData("room_number", e.target.value)
                                }
                                className="w-full text-gray-600 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Room - 1"
                                required
                            />
                            <InputError
                                message={errors.room_number}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel
                                htmlFor="room_type_id"
                                value="Room Type"
                            />
                            <select
                                name="room_type_id"
                                id="room_type_id"
                                value={data.room_type_id}
                                onChange={(e) =>
                                    setData("room_type_id", e.target.value)
                                }
                                className="w-full text-gray-600 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                            >
                                <option value="">Select Room Type</option>
                                {room_types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.room_type_id}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="price" value="Price" />
                            <TextInput
                                type="number"
                                name="price"
                                id="price"
                                step="0.01"
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                className="w-full text-gray-600 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="0.0"
                                required
                            />
                            <InputError
                                message={errors.price}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel
                                htmlFor="pax"
                                value="Pax (Number of People)"
                            />
                            <TextInput
                                type="number"
                                name="pax"
                                id="pax"
                                value={data.pax}
                                onChange={(e) => setData("pax", e.target.value)}
                                className="w-full text-gray-600 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="5"
                                required
                            />
                            <InputError message={errors.pax} className="mt-2" />
                        </div>

                        <div className="mb-6">
                            <InputLabel htmlFor="stay_type" value="Stay Type" />
                            <select
                                name="stay_type"
                                id="stay_type"
                                value={data.stay_type}
                                onChange={(e) =>
                                    setData("stay_type", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                                required
                            >
                                <option value="">Select Stay Type</option>
                                <option value="day tour">Day Tour</option>
                                <option value="overnight">Overnight</option>
                            </select>
                            <InputError
                                message={errors.stay_type}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                disabled={processing}
                            >
                                Create Room
                            </button>
                        </div>
                    </form>
                </div>
            </Suspense>
        </>
    );
}

RoomCreate.layout = (page) => <AuthSidebar children={page} />;

export default RoomCreate;
