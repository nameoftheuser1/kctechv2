import React from "react";

const ChangePasswordModal = ({
    isOpen,
    closeModal,
    data,
    setData,
    handleSubmit,
    processing,
    errors,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="current_password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="current_password"
                            name="current_password"
                            value={data.current_password}
                            onChange={(e) => setData("current_password", e.target.value)}
                            className="mt-1 p-2 border w-full rounded-lg focus:ring-indigo-600"
                            required
                        />
                        {errors.current_password && (
                            <p className="text-red-600 text-sm mt-2">
                                {errors.current_password}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="new_password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new_password"
                            name="new_password"
                            value={data.new_password}
                            onChange={(e) => setData("new_password", e.target.value)}
                            className="mt-1 p-2 border w-full rounded-lg focus:ring-indigo-600"
                            required
                        />
                        {errors.new_password && (
                            <p className="text-red-600 text-sm mt-2">
                                {errors.new_password}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="new_password_confirmation"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="new_password_confirmation"
                            name="new_password_confirmation"
                            value={data.new_password_confirmation}
                            onChange={(e) => setData("new_password_confirmation", e.target.value)}
                            className="mt-1 p-2 border w-full rounded-lg focus:ring-indigo-600"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="bg-gray-500 text-white p-2 rounded-lg"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white p-2 rounded-lg"
                            disabled={processing}
                        >
                            {processing ? "Changing..." : "Change Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
