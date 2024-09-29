import React from "react";
import { Link } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";

const ExpenseCard = ({ expense }) => {
    const route = useRoute();

    return (
        <div className="bg-white shadow-lg rounded-lg mb-6 p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                    {expense.expense_description}
                </h3>
                <p className="text-sm font-medium text-gray-500">
                    {new Date(expense.date_time).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>
            <p className="text-gray-700 mb-4">
                <span className="font-semibold">Amount:</span> ₱
                {parseFloat(expense.amount).toFixed(2)}
            </p>
            <div className="flex justify-end mt-2">
                <Link
                    href={route("expenses.edit", { expense: expense.id })}
                    className="text-blue-500 hover:underline mr-2"
                >
                    Edit
                </Link>
                <Link
                    href={route("expenses.show", { id: expense.id })}
                    className="text-blue-500 hover:underline"
                >
                    View
                </Link>
            </div>
        </div>
    );
};

export default ExpenseCard;
