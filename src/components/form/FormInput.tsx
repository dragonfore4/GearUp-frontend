import React from 'react'

type FormInputProps = {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    className?: string;
    icon?: React.ReactNode;
}

const FormInput = ({ name, label, type, placeholder, className, icon }: FormInputProps) => {
    return (
        <>
            <label className="block text-sm font-medium mb-2 capitalize" htmlFor={name}>
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    name={name}
                    id={name}
                    type={type}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${icon ? 'pl-10' : ''} ${className || ''}`}
                    placeholder={`${placeholder || ''}`}
                />
            </div>
        </>
    )
}

export default FormInput