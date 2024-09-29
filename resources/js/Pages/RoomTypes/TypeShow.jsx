import React, { useState, useEffect } from "react";
import AuthSidebar from "../../Components/Layouts/AuthSidebar";

function TypeShow({ roomType }) {
    useEffect(() => {
        console.log("roomType prop:", roomType);
    }, [roomType]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const hasImages = roomType?.room_images && roomType.room_images.length > 0;

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            hasImages && prevIndex === roomType.room_images.length - 1
                ? 0
                : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            hasImages && prevIndex === 0
                ? roomType.room_images.length - 1
                : prevIndex - 1
        );
    };

    const handleDelete = () => {
        console.log("Delete room type:", roomType?.name);
    };

    const handleAddImage = () => {
        console.log("Add image for room type:", roomType?.name);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                {roomType?.name || "Room Type Name Not Available"}
            </h1>
            <div className="relative min-h-[300px] h-full">
                {hasImages ? (
                    <img
                        src={roomType.room_images[currentIndex].image_path}
                        alt={`Image of ${roomType.name}`}
                        className="w-full h-auto mb-4"
                    />
                ) : (
                    <p className="flex items-center justify-center w-full h-full bg-gray-100 absolute inset-0">
                        No images available for this room type.
                    </p>
                )}
                <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 rounded-full p-2"
                    disabled={!hasImages}
                >
                    &#10094;
                </button>
                <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 rounded-full p-2"
                    disabled={!hasImages}
                >
                    &#10095;
                </button>
                <div className="flex justify-center mt-2">
                    {hasImages &&
                        roomType.room_images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 w-2 rounded-full mx-1 ${
                                    index === currentIndex
                                        ? "bg-gray-800"
                                        : "bg-gray-300"
                                }`}
                            />
                        ))}
                </div>
            </div>
            <div className="mt-4 p-4 bg-white shadow-md rounded-md flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                    {roomType?.name || "Room Type Name Not Available"}
                </h2>
                <div>
                    <button
                        onClick={handleAddImage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Add Image
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

TypeShow.layout = (page) => <AuthSidebar children={page} />;
export default TypeShow;
