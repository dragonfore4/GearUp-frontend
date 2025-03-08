import React from 'react'
type FormInputProps = {
    name: string;
    type: string;
    label: string;
    // defaultValue?: string;
    placeholder?: string;
}
const FormInput = ({ name, label, type, placeholder }: FormInputProps) => {
    return (
        <>

            <label className="block text-sm font-medium mb-2 capitalize" htmlFor="password">
                {label}
            </label>
            <input
                name={name}
                id={name}
                type={type}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`${placeholder}`}
            />
        </>
    )
}

export default FormInput