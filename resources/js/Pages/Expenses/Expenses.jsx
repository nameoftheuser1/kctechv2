import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthSidebar from "../../Components/Layouts/AuthSidebar";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";
import EntityActions from "../../Components/Shared/EntityActions";
import Pagination from "../../Components/Shared/Pagination";

function Expenses({ expenses, search, flash }) {
    const route = useRoute();

    const { success } = flash || {};
    const [showSuccess, setShowSuccess] = useState(false);

    const [filteredExpenses, setFilteredExpenses] = useState(expenses.data);
    const [currentPage, setCurrentPage] = useState(expenses.current_page);

    useEffect(() => {
        if (success) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const { data, setData, post } = useForm({
        search: search || "",
    });

    const confirmDelete = (formId) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            document.getElementById(formId).submit();
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = data.search.toLowerCase();

        const filtered = expenses.data.filter(
            (expense) =>
                expense.expense_description
                    .toLowerCase()
                    .includes(searchValue) ||
                expense.amount.toString().includes(searchValue) ||
                new Date(expense.date)
                    .toLocaleDateString()
                    .toLowerCase()
                    .includes(searchValue)
        );

        setFilteredExpenses(filtered);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        post(route("expenses.index"), { search: data.search, page: page });
    };

    const columns = ["Description", "Amount", "Date"];

    return (
        <>
            <Head title="Expenses List" />

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
                    href={route("expenses.create")}
                    className="text-sm bg-slate-600 text-white p-2 rounded-lg flex items-center w-full"
                >
                    Add Expense
                </Link>
            </div>

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
                        Expenses List
                        <p className="mt-1 text-sm font-normal text-gray-500">
                            Browse a list of expenses in our system.
                        </p>
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
                        {filteredExpenses.map((expense) => (
                            <tr
                                key={expense.id}
                                className="bg-white border-b hover:bg-gray-100 cursor-pointer"
                            >
                                <td className="px-6 py-4" colSpan="3">
                                    <Link
                                        href={route("expenses.show", {
                                            id: expense.id,
                                        })}
                                        className="block w-full h-full"
                                    >
                                        <div className="flex justify-between">
                                            <span>
                                                {expense.expense_description}
                                            </span>
                                            <span>
                                                ₱
                                                {parseFloat(
                                                    expense.amount
                                                ).toFixed(2)}
                                            </span>
                                            <span>
                                                {new Date(
                                                    expense.date
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <EntityActions
                                        entity={expense}
                                        entityName="expenses"
                                        editRoute={(id) =>
                                            route("expenses.edit", {
                                                expense: id,
                                            })
                                        }
                                        onDelete={(id) =>
                                            confirmDelete(`delete-form-${id}`)
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
                lastPage={expenses.last_page}
                onPageChange={handlePageChange}
            />

            <div className="md:hidden">
                {filteredExpenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="bg-white shadow-md rounded-lg mb-4 p-4"
                    >
                        <h3 className="text-lg font-semibold mb-2">
                            {expense.expense_description}
                        </h3>
                        <p className="text-gray-600 mb-2">
                            Amount: ₱{parseFloat(expense.amount).toFixed(2)}
                        </p>
                        <p className="text-gray-600 mb-2">
                            Date:{" "}
                            {new Date(expense.date).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>
                        <div className="flex justify-end mt-2">
                            <Link
                                href={route("expenses.edit", {
                                    expense: expense.id,
                                })}
                                className="text-blue-500 hover:underline mr-2"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() =>
                                    confirmDelete(`delete-form-${expense.id}`)
                                }
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

Expenses.layout = (page) => <AuthSidebar children={page} />;

export default Expenses;
