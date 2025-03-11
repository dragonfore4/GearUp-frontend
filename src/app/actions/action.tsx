"use server";
import { cookies } from 'next/headers'

// Define the server action for form submission
export const signinAction = async (prevState: unknown, formData: FormData): Promise<any> => {

    const username = formData.get("username");
    const password = formData.get("password");
    console.log("Extracted values:", { username, password });
    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    })

    const data = await response.json();
    if (!response.ok) {
        return { message: data.message };
    }
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, { path: "/" });

    return { message: data.message, token: data.token, username: data.username };
};

export const signupAction = async (prevState: unknown, formData: FormData): Promise<any> => {

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Extracted values:", { name, email, password });

    return { message: "ok" };
};

