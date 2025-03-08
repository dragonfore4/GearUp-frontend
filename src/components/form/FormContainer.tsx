"use client";
import { useAuth } from '@/app/context/AuthContext';
import React, { useActionState, useEffect } from 'react'


interface FormContainerProps {
    children: React.ReactNode;
    action: (prevState : unknown, formData: FormData) => Promise<any>;
    className?: string;
}

const FormContainer = ({ children, action, className = "" }: FormContainerProps) => {

    const initialState: any = {
        "message": ""
    };

    const [state, formAction] = useActionState(action, initialState);

    const { token, setToken, username, setUsername } = useAuth();


    useEffect(() => {
        console.log("in state",state.message);
        if (state.token !== null || undefined) {
            setToken(state.token);
            setUsername(state.username);
        }
    }, [state])
    return (
        <form action={formAction} className={className}>
            {children}
        </form>
    )
}

export default FormContainer