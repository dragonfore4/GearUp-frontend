"use client";
import { useFormStatus } from "react-dom";
import { IoReload } from "react-icons/io5";

export const SubmitButton = ({ name, text, className, icon }: { name: string, text: string, className: string, icon: React.ReactNode }) => {
    const { pending } = useFormStatus();
    return (


        <button
            type="submit"
            className={className}
            name={name}
            disabled={pending}
        >
            {pending ? (
                <div className="h-6 flex justify-center items-center">
                    <IoReload className="animate-spin" />
                </div>
            ) : (
                <div className="relative flex items-center justify-center">
                    {text}
                    {icon && (
                        <div className="  flex items-center pointer-events-none">
                            {icon}
                        </div>
                    )}
                </div>
            )}
        </button>
    );
};



export const SubmitButtonClient = ({ name, text, loading }: { name: string, text: string, loading: boolean }) => {
    return (
        <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 ${loading ? "bg-gray-300 hover:bg-gray-400" : "cursor-pointer"}`}
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

