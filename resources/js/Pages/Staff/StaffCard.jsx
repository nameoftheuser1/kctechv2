import React from "react";
import { Link } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";

export default function StaffCard({ staff }) {
    const route = useRoute();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 lg:hidden">
            {staff.map((staffMember) => (
                <div
                    className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105"
                    key={staffMember.id}
                >
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {staffMember.name}
                    </h3>
                    <p className="text-lg text-gray-600 mb-2">
                        <strong>Salary: </strong>₱
                        {staffMember.salary.toFixed(2)}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <strong>Payout Date:</strong>{" "}
                        {new Date(staffMember.payout_date).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </p>

                    <div className="flex justify-between items-center">
                        <Link
                            href={route("staff.show", {
                                staff: staffMember.id,
                            })}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            View
                        </Link>
                        <Link
                            href={route("staff.edit", {
                                staff: staffMember.id,
                            })}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Edit
                        </Link>
                    </div>

                    <form
                        id={`delete-form-${staffMember.id}`}
                        action={route("staff.destroy", {
                            staff: staffMember.id,
                        })}
                        method="POST"
                        style={{ display: "none" }}
                    >
                        @csrf @method('DELETE')
                    </form>
                </div>
            ))}
        </div>
    );
}
