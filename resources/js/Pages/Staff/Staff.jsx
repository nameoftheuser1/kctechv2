import { lazy, Suspense, useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";
import AuthSidebar from "../../Components/Layouts/AuthSidebar";

const EntityActions = lazy(() => import("@/Components/Shared/EntityActions"));
const Pagination = lazy(() => import("@/Components/Shared/Pagination"));
const StaffCard = lazy(() => import("./StaffCard"));
const Spinner = lazy(() => import("@/Components/Shared/Spinner"));

function Staff({ staff, search, flash }) {
    const route = useRoute();

    const { success } = flash || {};
    const [showSuccess, setShowSuccess] = useState(false);

    const [filteredStaff, setFilteredStaff] = useState(staff.data);
    const [currentPage, setCurrentPage] = useState(staff.currentPage);

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

        const filtered = staff.data.filter(
            (staffMember) =>
                staffMember.name.toLowerCase().includes(searchValue) ||
                staffMember.salary.toLowerCase().includes(searchValue) ||
                staffMember.payout_date.toLowerCase().includes(searchValue)
        );

        setFilteredStaff(filtered);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        post(route("staff.index"), { search: data.search, page: page });
    };

    const columns = ["Name", "Salary", "Payout Date"];

    return (
        <>
            <Suspense fallback={<Spinner />}>
                <Head title="Staff List" />

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
                        href={route("staff.create")}
                        className="text-sm bg-slate-600 text-white p-2 rounded-lg flex items-center w-full"
                    >
                        Add Staff
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
                            Staff List
                            <p className="mt-1 text-sm font-normal text-gray-500">
                                Browse a list of staff members in our
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
                            {filteredStaff.map((member) => (
                                <tr
                                    key={member.id}
                                    className="bg-white border-b hover:bg-gray-100 cursor-pointer"
                                >
                                    <td className="px-6 py-4" colSpan="3">
                                        <Link
                                            href={route("staff.show", {
                                                id: member.id,
                                            })}
                                            className="block w-full h-full"
                                        >
                                            <div className="flex justify-between">
                                                <span>{member.name}</span>
                                                <span>
                                                    ₱{member.salary.toFixed(2)}
                                                </span>
                                                <span>
                                                    {new Date(
                                                        member.payout_date
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <EntityActions
                                            entity={member}
                                            entityName="staff"
                                            editRoute={(id) =>
                                                route("staff.edit", {
                                                    staff: id,
                                                })
                                            }
                                            onDelete={(id) =>
                                                confirmDelete(
                                                    `delete-form-${id}`,
                                                    "staff member"
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
                    lastPage={staff.last_page}
                    onPageChange={handlePageChange}
                />

                <StaffCard
                    staff={filteredStaff}
                    confirmDelete={confirmDelete}
                />
            </Suspense>
        </>
    );
}

Staff.layout = (page) => <AuthSidebar children={page} />;

export default Staff;
