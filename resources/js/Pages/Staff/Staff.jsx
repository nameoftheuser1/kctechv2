import { lazy, Suspense, useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";
import AuthSidebar from "../../Components/Layouts/AuthSidebar";

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


    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = data.search.toLowerCase();

        const filtered = staff.data.filter(
            (staffMember) =>
                staffMember.name.toLowerCase().includes(searchValue) ||
                staffMember.salary
                    .toString()
                    .toLowerCase()
                    .includes(searchValue) ||
                new Date(staffMember.payout_date)
                    .toLocaleDateString()
                    .toLowerCase()
                    .includes(searchValue)
        );

        setFilteredStaff(filtered);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        post(route("staff.index"), { search: data.search, page });
    };

    const columns = ["Name", "Salary", "Payout Date", "Actions"];

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
                    <table className="min-w-full text-sm text-left text-gray-500">
                        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white w-full">
                            Staff List
                            <p className="mt-1 text-sm font-normal text-gray-500">
                                Browse a list of staff members in our reservation system.
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
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            {filteredStaff.map((member) => (
                                <tr
                                    key={member.id}
                                    className="bg-white border-b"
                                >
                                    <td className="px-6 py-4">{member.name}</td>
                                    <td className="px-6 py-4">₱{member.salary.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        {new Date(member.payout_date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={route("staff.show", { id: member.id })}
                                            className="text-blue-500 hover:underline"
                                        >
                                            View
                                        </Link>
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
                />
            </Suspense>
        </>
    );
}

Staff.layout = (page) => <AuthSidebar children={page} />;

export default Staff;
