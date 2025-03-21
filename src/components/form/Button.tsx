"use client";
import { IoReload } from "react-icons/io5";

export const SubmitButton = ({ name, text, loading }: { name: string, text: string, loading: boolean }) => {
    return (
        <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${loading ? "bg-gray-300 hover:bg-gray-400" : "cursor-pointer"}`}
            name={name}
            disabled={loading}
        >
            {loading ? (
                <div className="h-6 flex justify-center items-center">
                    <IoReload className="animate-spin" />
                </div>
            ) : (
                <div className="h-6">
                    {text}
                </div>
            )}
        </button>
    );
};
