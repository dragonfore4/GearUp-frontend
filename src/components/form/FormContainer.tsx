"use client";
import { useAuth } from '@/context/AuthContext';
import React, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

interface FormContainerProps {
    children: React.ReactNode;
    action: (prevState: unknown, formData: FormData) => Promise<any>;
    className?: string;
}

const FormContainer = ({ children, action, className = "" }: FormContainerProps) => {

    const initialState: any = {
        "message": ""
    };

    const [state, formAction] = useActionState(action, initialState);

    const { token, setToken, username, setUsername } = useAuth();


    useEffect(() => {
        console.log("in state", state.message);
        if (state.token !== null || undefined) {
            setToken(state.token);
            setUsername(state.username);
        }
        console.log("in state", state.message);
        if (!state.isError && state.message !== "") {
            toast.success(state.message);
        }
        if (state.isError ) {
            toast.error(state.message);
        }
    }, [state])
    return (
        <form action={formAction} className={className}>
            {children}
        </form>
    )
}

export default FormContainer