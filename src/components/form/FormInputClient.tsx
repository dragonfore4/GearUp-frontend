import React from 'react'

type FormInputClientProps = {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    whenChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInputClient = ({ label , name,  type, placeholder, whenChange} : FormInputClientProps) => {
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
                onChange={whenChange}
            />
        </>
    )
}

export default FormInputClient