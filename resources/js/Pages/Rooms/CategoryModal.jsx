import React from "react";

function CategoryModal({ isOpen, onClose, onSubmit, data, setData, processing, errors }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Add Category</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 p-2 border w-full rounded-lg focus:ring-pink-600"
                            required
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm mt-2">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="bg-gray-500 text-white p-2 rounded-lg"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-pink-600 text-white p-2 rounded-lg"
                            disabled={processing}
                        >
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryModal;
