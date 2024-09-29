import AuthSidebar from "../../Components/Layouts/AuthSidebar";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

function StaffShow({ staff, advanceSalaries }) {
    const [currentAdvanceSalaries, setCurrentAdvanceSalaries] =
        useState(advanceSalaries);
    const { data, setData, post, processing, reset } = useForm({
        amount: "",
        date: "",
    });

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    const handleAddAdvanceSalary = (e) => {
        e.preventDefault();

        post(`/staff/salaries/${staff.id}`, {
            preserveState: true,
            onSuccess: () => {
                setCurrentAdvanceSalaries([
                    ...currentAdvanceSalaries,
                    { amount: data.amount, date: data.date },
                ]);
                reset("amount", "date");
            },
        });
    };

    return (
        <>
            <h1>Salary Details for {staff.name}</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-bold">Salary: ${staff.salary}</h2>
                <p className="text-gray-600">
                    Payout Date: {formatDate(staff.payout_date)}
                </p>

                <h3 className="mt-4 font-semibold">
                    Advance Salaries This Month
                </h3>
                {currentAdvanceSalaries.length > 0 ? (
                    <ul className="mt-2">
                        {currentAdvanceSalaries.map((advance, index) => (
                            <li
                                key={index}
                                className="flex justify-between p-2 border-b"
                            >
                                <span>Amount: ${advance.amount}</span>
                                <span>
                                    Date:{" "}
                                    {formatDate(
                                        advance.created_at || advance.date
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No advance salaries for this month.</p>
                )}

                <div className="mt-6">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() =>
                            document
                                .getElementById("addSalaryForm")
                                .classList.toggle("hidden")
                        }
                    >
                        Add Advance Salary
                    </button>
                </div>

                <form
                    id="addSalaryForm"
                    className="mt-4 hidden"
                    onSubmit={handleAddAdvanceSalary}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium"
                        >
                            Amount:
                        </label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium"
                        >
                            Date:
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={data.date}
                            onChange={(e) => setData("date", e.target.value)}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        disabled={processing}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

StaffShow.layout = (page) => <AuthSidebar children={page} />;

export default StaffShow;
