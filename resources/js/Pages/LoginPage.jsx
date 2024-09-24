import { useForm } from "@inertiajs/react";
import React from "react";
import InputLabel from "../Components/Forms/InputLabel";
import InputError from "../Components/Forms/InputError";
import TextInput from "../Components/Forms/TextInput";
import PrimaryButton from "../Components/Forms/PrimaryButton";

function LoginPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post('/login', data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-slate-700">
                    Admin login page
                </h2>
                {errors.login && (
                    <p className="text-red-500 text-sm mb-4">{errors.login}</p>
                )}
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="username" value="Username" />
                        <TextInput
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            className="text-sm w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            isFocused={true}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.username}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="text-sm w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <PrimaryButton className="w-full" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
