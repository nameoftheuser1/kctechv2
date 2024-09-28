import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";
import { lazy, Suspense } from "react";
import Spinner from "@/Components/Shared/Spinner";
import AuthSidebar from "@/Components/Layouts/AuthSidebar";

const InputLabel = lazy(() => import("@/Components/Forms/InputLabel"));
const TextInput = lazy(() => import("@/Components/Forms/TextInput"));
const InputError = lazy(() => import("@/Components/Forms/InputError"));

function ExpenseCreate() {
    const route = useRoute();
    const { data, setData, post, processing, errors } = useForm({
        expense_description: "",
        amount: 0,
        date_time: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("expenses.store"), {
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                console.error("Error creating expense:", errors);
            },
        });
    }

    return (
        <>
            <Suspense fallback={<Spinner />}>
                <div className="container mx-auto px-4 py-8 w-full sm:w-1/2 border rounded-lg bg-white mt-0 sm:mt-10">
                    <Link
                        href="/expenses"
                        className="text-blue-500 text-sm underline"
                    >
                        &larr; back to expenses list
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-700 mt-4">
                        Add an Expense
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Add expense details
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full justify-center"
                    >
                        <div className="mb-4 w-full">
                            <InputLabel
                                htmlFor="expense_description"
                                value="Expense Description"
                            />
                            <TextInput
                                name="expense_description"
                                id="expense_description"
                                value={data.expense_description}
                                onChange={(e) =>
                                    setData(
                                        "expense_description",
                                        e.target.value
                                    )
                                }
                                className="w-full text-gray-600 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Ex. Office Supplies"
                                required
                            />
                            <InputError
                                message={errors.expense_description}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <InputLabel htmlFor="amount" value="Amount" />
                            <TextInput
                                type="number"
                                name="amount"
                                id="amount"
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                                className="w-full text-gray-600 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Ex. 500.00"
                                required
                            />
                            <InputError
                                message={errors.amount}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <InputLabel htmlFor="date_time" value="Date" />
                            <TextInput
                                type="date"
                                name="date_time"
                                id="date_time"
                                value={data.date_time}
                                onChange={(e) =>
                                    setData("date_time", e.target.value)
                                }
                                className="w-full text-gray-600 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                required
                            />
                            <InputError
                                message={errors.date_time}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                disabled={processing}
                            >
                                Create Expense
                            </button>
                        </div>
                    </form>
                </div>
            </Suspense>
        </>
    );
}

ExpenseCreate.layout = (page) => <AuthSidebar children={page} />;

export default ExpenseCreate;
