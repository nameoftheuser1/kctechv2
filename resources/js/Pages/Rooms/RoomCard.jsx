import React from "react";
import { Link, useForm, router } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";

export default function RoomCard({ rooms }) {
    const route = useRoute();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:p-6 mt-2 lg:hidden">
            {rooms.map((room) => (
                <div
                    className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105"
                    key={room.id}
                >
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        Room {room.room_number}
                    </h3>
                    <p className="text-lg text-gray-600 mb-2">
                        <strong>Price: </strong>₱{room.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>Pax:</strong> {room.pax}
                    </p>
                    <p className="text-gray-600 mb-4">
                        <strong>Stay Type:</strong>{" "}
                        {room.stay_type.charAt(0).toUpperCase() +
                            room.stay_type.slice(1)}
                    </p>

                    <div className="flex justify-between items-center">
                        <Link
                            href={route("rooms.edit", { room: room.id })}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Edit
                        </Link>
                        <Link
                            href={route("rooms.show", {
                                id: room.id,
                            })}
                            className="text-blue-500 hover:underline"
                        >
                            View
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
