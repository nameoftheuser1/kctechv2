import React from "react";
import { Link } from "@inertiajs/react";

const DataTable = ({
    captionTitle,
    captionSubtitle,
    searchValue,
    handleSearch,
    handleInputChange,
    columns,
    data,
    renderActions,
}) => {
    return (
        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white w-full">
                {captionTitle}
                <p className="mt-1 text-sm font-normal text-gray-500">
                    {captionSubtitle}
                </p>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="search"
                        id="search-input"
                        placeholder="Search..."
                        className="p-2 border text-sm rounded w-full focus:ring-pink-600 mb-1 mt-2"
                        onChange={handleInputChange}
                        value={searchValue}
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded w-full text-sm hover:bg-blue-700"
                    >
                        Search
                    </button>
                </form>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    {columns.map((col) => (
                        <th scope="col" className="px-6 py-3" key={col}>
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody id="table-body">
                {data.map((row) => (
                    <tr className="bg-white border-b" key={row.id}>
                        {Object.keys(row).map((key) => (
                            <td
                                className="px-6 py-4"
                                key={key}
                                scope={key === "id" ? "row" : undefined}
                            >
                                {row[key]}
                            </td>
                        ))}
                        <td className="px-6 py-4 text-right">
                            {renderActions(row)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
