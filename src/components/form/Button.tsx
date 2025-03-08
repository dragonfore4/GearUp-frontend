"use client";
import { useFormStatus } from "react-dom";
import { IoReload } from "react-icons/io5";

export const SubmitButton = ({ name, text }: { name: string, text: string }) => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${pending ? "bg-gray-300 hover:bg-gray-400" : "cursor-pointer"}`}
            name={name}
            disabled={pending}
        >
            {pending ? (
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
}
