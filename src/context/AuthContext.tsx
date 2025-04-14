"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Define the AuthContext type
interface AuthContextType {
    token: string | null;
    username: string | null;
    setToken: (token: string | null) => void;
    setUsername: (username: string | null) => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
    token: null,
    username: null,
    setToken: () => { },
    setUsername: () => { },
});

export const useAuth = () => useContext(AuthContext);


// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    // console.log("From context ", token, username);

    // Fetch token from API on first load
    useEffect(() => {
        const fetchAuthData = async () => {
            try {
                // ✅ Fetch Token จาก Cookie
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/getToken`, {
                    method: "GET",
                    credentials: "include"
                });
    
                const data = await response.json();
                // console.log("this is data: ", data);
    
                if (!response.ok || !data.token) {
                    // console.error("No valid token found!");
                    setToken(null);
                    setUsername(null);
                    return;
                }
    
                // ✅ กำหนด Token ใน State
                setToken(data.token);
                // console.log("the Token", data.token);
    
                // ✅ Fetch Claims โดยใช้ data.token แทน token (เพราะ token ยังไม่อัปเดตใน State)
                const claimsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/getAllClaims`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${data.token}`  // ✅ ใช้ data.token แทน token
                    },
                    credentials: "include"
                });
    
                const claimsData = await claimsResponse.json();
                // console.log("Claims data: ", claimsData);
                setUsername(claimsData.sub);
            } catch (error) {
                // console.error("Failed to fetch authentication data:", error);
                return;
            }
        };
    

        fetchAuthData();
    }, [token, username]);

    // console.log(token, username);
    return (
        <AuthContext.Provider value={{ token, username, setToken, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
}
