import { Link, useForm } from "@inertiajs/react";
import AuthSidebar from "../../Components/Layouts/AuthSidebar";
import InputLabel from "../../Components/Forms/InputLabel";
import TextInput from "../../Components/Forms/TextInput";
import InputError from "../../Components/Forms/InputError";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";

function StaffCreate() {
    const route = useRoute();
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        salary: 0,
        payout_date: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("staff.store"), {
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                console.log(data);
                console.error("Error creating staff:", errors);
            },
        });
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8 w-full sm:w-1/2 border rounded-lg bg-white mt-0 sm:mt-10">
                <Link href="/staff" className="text-blue-500 text-sm underline">
                    &larr; back to staff list
                </Link>
                <h1 className="text-3xl font-bold text-slate-700 mt-4">
                    Add a Staff
                </h1>
                <p className="text-sm text-slate-500 mb-6">Add staff details</p>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-full justify-center"
                >
                    <div className="mb-4 w-full">
                        <InputLabel htmlFor="name" value="Name of the staff" />
                        <TextInput
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full text-gray-600 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Ex. Juan Dela Cruz"
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mb-4 w-full">
                        <InputLabel htmlFor="salary" value="Salary" />
                        <TextInput
                            type="number"
                            name="salary"
                            id="salary"
                            value={data.salary}
                            onChange={(e) => setData("salary", e.target.value)}
                            className="w-full text-gray-600 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Ex. 50000"
                            required
                        />
                        <InputError message={errors.salary} className="mt-2" />
                    </div>

                    <div className="mb-4 w-full">
                        <InputLabel htmlFor="payout_date" value="Payout Date" />
                        <TextInput
                            type="date"
                            name="payout_date"
                            id="payout_date"
                            value={data.payout_date}
                            onChange={(e) =>
                                setData("payout_date", e.target.value)
                            }
                            className="w-full text-gray-600 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                        <InputError
                            message={errors.payout_date}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={processing}
                        >
                            Create Staff
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

StaffCreate.layout = (page) => <AuthSidebar children={page} />;

export default StaffCreate;
