// "use client";
"use server";

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
        return { message: data.message, isError: true};
    }

    return { message: data.message, token: data.token, username: data.username, isError: false};
};

export const signupAction = async (prevState: unknown, formData: FormData): Promise<any> => {

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Extracted values:", { username, password, email });
    const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include"
    })

    const data = await response.json();
    console.log(data.message);
    if (!response.ok) {
        return { message: data.message, isError: true};
    }

    return { message: data.message, isError: false};
};

